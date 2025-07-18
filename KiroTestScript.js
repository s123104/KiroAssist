// ==UserScript==
// @name        KiroAuto – Run / Retry Only (v3.2.0) - Modular Architecture
// @namespace   https://github.com/azlife1224/KiroAssist
// @version     3.2.0
// @description Auto‑click "Run" & "Retry" on Kiro with modular architecture and best practices
// @match       *://*/*
// @grant       none
// ==/UserScript==

(function() {
    "use strict";
    
    // 避免重複載入
    if (window.KiroAuto?.v >= 3.2) return;
    
    /**
     * 🔧 Configuration Management Module
     * 運行時可修改的配置系統
     */
    const ConfigManager = {
        // 預設配置
        defaults: {
            poll: 1000,        // fallback 輪詢間隔
            debounce: 120,     // MutationObserver 防抖時間
            debug: true,       // 除錯模式
            maxDelay: 100,     // 等待按鈕可點擊的延遲時間
            retryAttempts: 3,  // 重試次數
            enabled: true      // 總開關
        },
        
        // 當前配置
        config: {},
        
        // 配置變更監聽器
        listeners: new Set(),
        
        // 初始化配置
        init() {
            this.config = { ...this.defaults };
            
            // 從 localStorage 載入配置
            const saved = localStorage.getItem('kiroAuto.config');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    this.config = { ...this.defaults, ...parsed };
                } catch (e) {
                    Logger.error('配置載入失敗:', e);
                }
            }
            
            return this;
        },
        
        // 獲取配置值
        get(key) {
            return this.config[key];
        },
        
        // 設置配置值
        set(key, value) {
            const oldValue = this.config[key];
            this.config[key] = value;
            
            // 保存到 localStorage
            localStorage.setItem('kiroAuto.config', JSON.stringify(this.config));
            
            // 通知監聽器
            this.listeners.forEach(listener => {
                try {
                    listener(key, value, oldValue);
                } catch (e) {
                    Logger.error('配置監聽器執行失敗:', e);
                }
            });
            
            Logger.info(`配置已更新: ${key} = ${value}`);
        },
        
        // 批量設置配置
        update(updates) {
            Object.entries(updates).forEach(([key, value]) => {
                this.set(key, value);
            });
        },
        
        // 監聽配置變更
        onChange(callback) {
            this.listeners.add(callback);
            return () => this.listeners.delete(callback);
        },
        
        // 重置配置
        reset() {
            this.config = { ...this.defaults };
            localStorage.removeItem('kiroAuto.config');
            Logger.info('配置已重置');
        }
    };
    
    /**
     * 📝 Logging Module
     * 統一的日誌管理系統
     */
    const Logger = {
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        },
        
        log(level, ...args) {
            if (!ConfigManager.get('debug')) return;
            
            const timestamp = new Date().toISOString().substr(11, 8);
            const prefix = `[KiroAuto ${timestamp}]`;
            
            switch (level) {
                case 'error':
                    console.error(prefix, ...args);
                    break;
                case 'warn':
                    console.warn(prefix, ...args);
                    break;
                case 'info':
                    console.info(prefix, ...args);
                    break;
                case 'debug':
                    console.debug(prefix, ...args);
                    break;
                default:
                    console.log(prefix, ...args);
            }
        },
        
        error(...args) { this.log('error', ...args); },
        warn(...args) { this.log('warn', ...args); },
        info(...args) { this.log('info', ...args); },
        debug(...args) { this.log('debug', ...args); }
    };
    
    /**
     * 🔍 Button Detection Module
     * 按鈕檢測和分類系統
     */
    const ButtonDetector = {
        // 關鍵字配置
        keywords: {
            run: ["run", "trust", "accept", "執行", "play"],
            retry: ["retry", "again", "重試"],
            ignore: [/follow/i]
        },
        
        // 文字清理函數
        cleanText(text) {
            return text
                .replace(/\u00a0/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();
        },
        
        // 提取按鈕文字
        extractButtonText(btn) {
            const sources = [
                btn.innerText,
                btn.getAttribute("aria-label"),
                btn.getAttribute("title"),
                btn.getAttribute("data-tooltip-content")
            ].filter(Boolean);
            
            return this.cleanText(sources.join(" "));
        },
        
        // 關鍵字匹配
        hasKeyword(text, keywords) {
            return keywords.some(keyword => 
                (keyword instanceof RegExp) ? keyword.test(text) : text.includes(keyword)
            );
        },
        
        // 檢查按鈕可見性
        isVisible(element) {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            
            return rect.width > 0 && 
                   rect.height > 0 && 
                   style.display !== "none" &&
                   style.visibility !== "hidden" && 
                   parseFloat(style.opacity) > 0.15;
        },
        
        // 檢查按鈕可點擊性
        isClickable(element) {
            return !element.disabled && 
                   !element.hasAttribute("disabled") &&
                   getComputedStyle(element).pointerEvents !== "none";
        },
        
        // 按鈕分類
        classify(btn) {
            const text = this.extractButtonText(btn);
            
            // 檢查忽略清單
            if (this.hasKeyword(text, this.keywords.ignore)) {
                return "ignore";
            }
            
            // 優先檢查屬性
            const variant = (btn.dataset.variant || "").toLowerCase();
            const purpose = (btn.dataset.purpose || "").toLowerCase();
            
            if (variant === "primary" && purpose === "alert") return "run";
            if (variant === "secondary" && purpose === "default") return "retry";
            
            // 檢查文字關鍵字
            if (this.hasKeyword(text, this.keywords.run)) return "run";
            if (this.hasKeyword(text, this.keywords.retry)) return "retry";
            
            return null;
        },
        
        // 更新關鍵字
        updateKeywords(type, keywords) {
            if (this.keywords[type]) {
                this.keywords[type] = keywords;
                Logger.info(`關鍵字已更新: ${type}`, keywords);
            }
        }
    };
    
    /**
     * 🎯 Click Engine Module
     * 點擊執行引擎
     */
    const ClickEngine = {
        // 防重複點擊記錄
        clickedElements: new WeakSet(),
        
        // 統計數據
        stats: {
            run: 0,
            retry: 0,
            ignore: 0,
            total: 0
        },
        
        // 安全執行點擊
        safeClick(element) {
            try {
                element.click();
                return true;
            } catch (error) {
                Logger.warn('直接點擊失敗，嘗試事件派發:', error);
                
                // 備援方案：派發 MouseEvent
                try {
                    ["mousedown", "mouseup", "click"].forEach(eventType => {
                        element.dispatchEvent(new MouseEvent(eventType, {
                            bubbles: true,
                            cancelable: true
                        }));
                    });
                    return true;
                } catch (fallbackError) {
                    Logger.error('事件派發也失敗:', fallbackError);
                    return false;
                }
            }
        },
        
        // 執行點擊操作
        executeClick(element, source, delay = 0) {
            if (this.clickedElements.has(element)) {
                Logger.debug('按鈕已被點擊，跳過:', element);
                return false;
            }
            
            const performClick = () => {
                // 檢查按鈕可見性
                if (!ButtonDetector.isVisible(element)) {
                    Logger.debug('按鈕不可見，跳過點擊');
                    return false;
                }
                
                // 分類按鈕
                const buttonType = ButtonDetector.classify(element);
                if (!buttonType) {
                    Logger.debug('按鈕類型未識別，跳過');
                    return false;
                }
                
                // 處理忽略按鈕
                if (buttonType === "ignore") {
                    this.stats.ignore++;
                    Logger.debug(`🚫 忽略按鈕 | 來源: ${source} | 文字: "${ButtonDetector.extractButtonText(element)}"`);
                    return false;
                }
                
                // 執行點擊
                if (this.safeClick(element)) {
                    this.clickedElements.add(element);
                    this.stats[buttonType]++;
                    this.stats.total++;
                    
                    Logger.info(`🔘 點擊 ${buttonType.toUpperCase()} | 來源: ${source} | 文字: "${ButtonDetector.extractButtonText(element)}"`);
                    
                    // 觸發點擊事件
                    EventBus.emit('buttonClicked', {
                        element,
                        type: buttonType,
                        source,
                        stats: { ...this.stats }
                    });
                    
                    return true;
                }
                
                return false;
            };
            
            // 如果有延遲，使用 requestAnimationFrame 和 setTimeout
            if (delay > 0) {
                requestAnimationFrame(() => setTimeout(performClick, delay));
            } else {
                return performClick();
            }
        },
        
        // 獲取統計資料
        getStats() {
            return { ...this.stats };
        },
        
        // 重置統計
        resetStats() {
            Object.keys(this.stats).forEach(key => {
                this.stats[key] = 0;
            });
            Logger.info('統計已重置');
        }
    };
    
    /**
     * 🔄 DOM Monitor Module
     * DOM 變化監控系統
     */
    const DOMMonitor = {
        // MutationObserver 實例
        observers: new Map(),
        
        // 防抖計時器
        debounceTimers: new Map(),
        
        // 初始化監控
        init() {
            this.setupBodyObserver();
            this.setupSnackbarObserver();
            Logger.info('DOM 監控已初始化');
        },
        
        // 設置 body 監控
        setupBodyObserver() {
            const observer = new MutationObserver((mutations) => {
                this.debounceCallback('body', () => {
                    Scanner.scanAll('mutation');
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class', 'disabled', 'data-variant', 'data-purpose']
            });
            
            this.observers.set('body', observer);
        },
        
        // 設置 snackbar 專用監控
        setupSnackbarObserver() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.tagName === "BUTTON") {
                            ClickEngine.executeClick(node, "snackbar");
                        }
                    });
                });
            });
            
            // 監控現有的 snackbar 容器
            this.watchSnackbarContainers();
            
            this.observers.set('snackbar', observer);
        },
        
        // 監控 snackbar 容器
        watchSnackbarContainers() {
            const containers = document.querySelectorAll('.kiro-snackbar-actions');
            containers.forEach(container => {
                const observer = this.observers.get('snackbar');
                if (observer) {
                    observer.observe(container, { childList: true });
                }
            });
        },
        
        // 防抖回調
        debounceCallback(key, callback) {
            const timer = this.debounceTimers.get(key);
            if (timer) {
                clearTimeout(timer);
            }
            
            const newTimer = setTimeout(() => {
                callback();
                this.debounceTimers.delete(key);
            }, ConfigManager.get('debounce'));
            
            this.debounceTimers.set(key, newTimer);
        },
        
        // 停止監控
        stopAll() {
            this.observers.forEach(observer => observer.disconnect());
            this.debounceTimers.forEach(timer => clearTimeout(timer));
            this.observers.clear();
            this.debounceTimers.clear();
            Logger.info('DOM 監控已停止');
        }
    };
    
    /**
     * 🔍 Scanner Module
     * 按鈕掃描系統
     */
    const Scanner = {
        // 掃描所有按鈕
        scanAll(source = "manual") {
            if (!ConfigManager.get('enabled')) {
                Logger.debug('掃描被禁用，跳過');
                return;
            }
            
            const selectors = [
                'button.kiro-button',
                'button[data-variant]',
                'button[data-purpose]'
            ];
            
            let scanned = 0;
            let clicked = 0;
            
            selectors.forEach(selector => {
                try {
                    const buttons = document.querySelectorAll(selector);
                    buttons.forEach(button => {
                        scanned++;
                        
                        if (!ButtonDetector.isClickable(button)) {
                            // 延遲重試不可點擊的按鈕
                            ClickEngine.executeClick(button, source, ConfigManager.get('maxDelay'));
                        } else {
                            if (ClickEngine.executeClick(button, source)) {
                                clicked++;
                            }
                        }
                    });
                } catch (error) {
                    Logger.error(`選擇器 ${selector} 掃描失敗:`, error);
                }
            });
            
            Logger.debug(`掃描完成 (${source}): 掃描 ${scanned} 個按鈕，點擊 ${clicked} 個`);
        },
        
        // 掃描特定容器
        scanContainer(container, source = "container") {
            if (!container || !ConfigManager.get('enabled')) return;
            
            const buttons = container.querySelectorAll('button');
            buttons.forEach(button => {
                ClickEngine.executeClick(button, source);
            });
        }
    };
    
    /**
     * 📡 Event Bus Module
     * 事件通訊系統
     */
    const EventBus = {
        listeners: new Map(),
        
        // 監聽事件
        on(event, callback) {
            if (!this.listeners.has(event)) {
                this.listeners.set(event, new Set());
            }
            this.listeners.get(event).add(callback);
            
            // 返回取消監聽的函數
            return () => {
                const callbacks = this.listeners.get(event);
                if (callbacks) {
                    callbacks.delete(callback);
                }
            };
        },
        
        // 觸發事件
        emit(event, data) {
            const callbacks = this.listeners.get(event);
            if (callbacks) {
                callbacks.forEach(callback => {
                    try {
                        callback(data);
                    } catch (error) {
                        Logger.error(`事件 ${event} 回調執行失敗:`, error);
                    }
                });
            }
        },
        
        // 移除所有監聽器
        clear() {
            this.listeners.clear();
        }
    };
    
    /**
     * 🎮 Main Controller
     * 主控制器
     */
    const KiroAutoController = {
        // 版本
        version: "3.2.0",
        
        // 運行狀態
        isRunning: false,
        
        // 輪詢計時器
        pollTimer: null,
        
        // 初始化
        init() {
            ConfigManager.init();
            Logger.info(`KiroAuto v${this.version} 正在初始化...`);
            
            // 設置事件監聽
            this.setupEventListeners();
            
            // 啟動監控
            this.start();
            
            Logger.info('KiroAuto 初始化完成');
        },
        
        // 設置事件監聽
        setupEventListeners() {
            // 監聽配置變更
            ConfigManager.onChange((key, value) => {
                if (key === 'enabled') {
                    value ? this.start() : this.stop();
                }
            });
            
            // 監聽按鈕點擊事件
            EventBus.on('buttonClicked', (data) => {
                Logger.debug('按鈕點擊事件:', data);
            });
        },
        
        // 啟動
        start() {
            if (this.isRunning) {
                Logger.warn('KiroAuto 已在運行中');
                return;
            }
            
            this.isRunning = true;
            
            // 初始化 DOM 監控
            DOMMonitor.init();
            
            // 執行初始掃描
            Scanner.scanAll("start");
            
            // 設置輪詢備援
            this.pollTimer = setInterval(() => {
                Scanner.scanAll("poll");
            }, ConfigManager.get('poll'));
            
            Logger.info('KiroAuto 已啟動');
        },
        
        // 停止
        stop() {
            if (!this.isRunning) {
                Logger.warn('KiroAuto 未在運行');
                return;
            }
            
            this.isRunning = false;
            
            // 停止 DOM 監控
            DOMMonitor.stopAll();
            
            // 清除輪詢計時器
            if (this.pollTimer) {
                clearInterval(this.pollTimer);
                this.pollTimer = null;
            }
            
            Logger.info('KiroAuto 已停止');
        },
        
        // 獲取狀態
        getStatus() {
            return {
                version: this.version,
                isRunning: this.isRunning,
                config: ConfigManager.config,
                stats: ClickEngine.getStats()
            };
        }
    };
    
    // 初始化並啟動
    KiroAutoController.init();
    
    // 全域 API
    window.KiroAuto = {
        version: KiroAutoController.version,
        
        // 基本控制
        start: () => KiroAutoController.start(),
        stop: () => KiroAutoController.stop(),
        getStatus: () => KiroAutoController.getStatus(),
        
        // 配置管理
        config: {
            get: (key) => ConfigManager.get(key),
            set: (key, value) => ConfigManager.set(key, value),
            update: (updates) => ConfigManager.update(updates),
            reset: () => ConfigManager.reset()
        },
        
        // 統計資料
        stats: {
            get: () => ClickEngine.getStats(),
            reset: () => ClickEngine.resetStats()
        },
        
        // 手動掃描
        scan: () => Scanner.scanAll("manual"),
        
        // 事件監聽
        on: (event, callback) => EventBus.on(event, callback),
        
        // 關鍵字管理
        keywords: {
            get: () => ButtonDetector.keywords,
            update: (type, keywords) => ButtonDetector.updateKeywords(type, keywords)
        },
        
        // 向後兼容
        v: 3.2,
        cfg: ConfigManager.config,
        stats: ClickEngine.stats
    };
    
    Logger.info(`✨ KiroAuto v${KiroAutoController.version} 已載入！`);
    Logger.info('🎛️  API: window.KiroAuto');
    Logger.info('📊 統計: window.KiroAuto.stats.get()');
    Logger.info('⚙️  配置: window.KiroAuto.config.set("key", value)');
    Logger.info('🔧 除錯: window.KiroAuto.config.set("debug", true)');
    
})();
  