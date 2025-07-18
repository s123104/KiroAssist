/**
 * 📦 模組：KiroTestScript v1.0.0 - Kiro 按鈕檢測測試腳本
 * 🕒 最後更新：2025-07-18T11:30:00+08:00
 * 🧑‍💻 作者：threads:azlife_1224
 * 🔢 版本：v1.0.0
 * 📝 摘要：參考 cursor.js 程式邏輯，專門測試 Kiro 頁面的 Retry 和 Run 按鈕檢測功能
 *
 * 🎯 測試功能：
 * ✅ 自動檢測 Retry 按鈕 (data-variant="secondary" data-purpose="default")
 * ✅ 自動檢測 Run 按鈕 (data-variant="primary" data-purpose="alert")
 * ✅ MutationObserver 監控 DOM 變化
 * ✅ 彈性選擇器配置 (多重備選策略)
 * ✅ 語義化按鈕識別
 * ✅ 防重複點擊機制
 * ✅ 詳細日誌記錄
 * ✅ 統計資料追蹤
 */

(function () {
    "use strict";
    
    // 避免重複載入
    if (window.KiroTestScript) {
        console.log("[KiroTestScript] 已載入，跳過重複初始化");
        return;
    }

    /**
     * 🎯 Kiro 專用選擇器配置 - 參考 cursor.js 的彈性選擇器策略
     */
    const KIRO_SELECTORS = {
        // Retry 按鈕容器 (參考範例頁面)
        retryContainers: [
            'div.kiro-chat-message-body',
            '.kiro-chat-message',
            '.kiro-chat-message-markdown',
            '[class*="chat-message"]',
            '[class*="message-body"]',
            '.message-content'
        ],
        
        // Run 按鈕容器 (參考範例頁面)
        runContainers: [
            'div.kiro-snackbar',
            'div.kiro-snackbar-container',
            '.kiro-snackbar-header',
            '.kiro-snackbar-actions',
            '[class*="snackbar"]',
            '[class*="notification"]'
        ],
        
        // 通用按鈕選擇器 (參考 cursor.js 的語義化選擇器)
        buttons: [
            'button.kiro-button',
            'button[class*="kiro"]',
            'button[data-variant]',
            'button[data-purpose]',
            'button[data-active]',
            'button[data-loading]',
            'button[data-size]',
            '[role="button"]',
            'button'
        ]
    };

    /**
     * 🎯 按鈕模式配置 - 參考 cursor.js 的 BUTTON_PATTERNS
     */
    const KIRO_BUTTON_PATTERNS = {
        retry: {
            keywords: ['retry', 'Retry', 'RETRY', '重試', '再試一次'],
            containers: 'retryContainers',
            selectors: [
                // 範例頁面精確匹配
                'button.kiro-button[data-variant="secondary"][data-purpose="default"][data-active="false"][data-loading="false"]',
                'button.kiro-button[data-variant="secondary"][data-purpose="default"]',
                'button[data-variant="secondary"][data-purpose="default"]',
                'button.kiro-button[data-variant="secondary"]',
                'button[data-variant="secondary"]',
                'button.kiro-button[data-purpose="default"]',
                'button[class*="secondary"]'
            ],
            priority: 1,
            extraTime: 300
        },
        run: {
            keywords: ['run', 'Run', 'RUN', '執行', '運行'],
            containers: 'runContainers',
            selectors: [
                // 範例頁面精確匹配
                'button.kiro-button[data-size="small"][data-variant="primary"][data-purpose="alert"][data-active="false"][data-loading="false"]',
                'button.kiro-button[data-size="small"][data-variant="primary"][data-purpose="alert"]',
                'button.kiro-button[data-variant="primary"][data-purpose="alert"]',
                'button[data-variant="primary"][data-purpose="alert"]',
                'button.kiro-button[data-variant="primary"]',
                'button[data-variant="primary"]',
                'button.kiro-button[data-purpose="alert"]',
                'button[class*="primary"]'
            ],
            priority: 2,
            extraTime: 500
        }
    };

    /**
     * 🎪 事件管理器 - 參考 cursor.js 的 EventManager
     */
    class EventManager extends EventTarget {
        emit(eventName, data) {
            this.dispatchEvent(new CustomEvent(eventName, { detail: data }));
        }

        on(eventName, handler) {
            this.addEventListener(eventName, handler);
        }

        off(eventName, handler) {
            this.removeEventListener(eventName, handler);
        }
    }

    /**
     * 🔬 DOM 監視器 - 參考 cursor.js 的 DOMWatcher
     */
    class DOMWatcher {
        constructor(eventManager) {
            this.eventManager = eventManager;
            this.observer = null;
            this.isWatching = false;
            this.debounceTimer = null;
            this.debounceDelay = 300; // 300ms 防抖
        }

        start() {
            if (this.isWatching) return;

            this.observer = new MutationObserver((mutations) => {
                this.handleMutations(mutations);
            });

            const config = {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: [
                    "class", "style", "data-variant", "data-purpose", 
                    "data-active", "data-loading", "data-size", "disabled"
                ]
            };

            this.observer.observe(document.body, config);
            this.isWatching = true;
            console.log("[DOMWatcher] 開始監視 DOM 變化");
        }

        stop() {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = null;
            }
            this.isWatching = false;
            console.log("[DOMWatcher] 停止監視 DOM 變化");
        }

        handleMutations(mutations) {
            let hasRelevantChanges = false;

            for (const mutation of mutations) {
                if (this.isRelevantMutation(mutation)) {
                    hasRelevantChanges = true;
                    break;
                }
            }

            if (hasRelevantChanges) {
                if (this.debounceTimer) {
                    clearTimeout(this.debounceTimer);
                }
                this.debounceTimer = setTimeout(() => {
                    this.eventManager.emit("dom-changed", { mutations });
                }, this.debounceDelay);
            }
        }

        isRelevantMutation(mutation) {
            if (mutation.type === "childList") {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const className = node.className?.toLowerCase() || "";
                        if (className.includes("kiro") || className.includes("button")) {
                            return true;
                        }
                    }
                }
            }
            
            if (mutation.type === "attributes") {
                const target = mutation.target;
                if (target.nodeType === Node.ELEMENT_NODE) {
                    const className = target.className?.toLowerCase() || "";
                    return className.includes("kiro") || className.includes("button");
                }
            }

            return false;
        }
    }

    /**
     * 🔍 元素查找器 - 參考 cursor.js 的 ElementFinder
     */
    class ElementFinder {
        constructor() {
            this.cache = new Map();
        }

        /**
         * 彈性元素查找 - 參考 cursor.js 的多重備選策略
         */
        findElementsWithFallback(selectors, context = document) {
            for (const selector of selectors) {
                try {
                    const elements = context.querySelectorAll(selector);
                    if (elements.length > 0) {
                        return Array.from(elements);
                    }
                } catch (e) {
                    console.warn(`[ElementFinder] 選擇器失效: ${selector}`, e);
                }
            }
            return [];
        }

        /**
         * 在容器中查找按鈕 - 參考 cursor.js 的容器檢測策略
         */
        findButtonsInContainers(buttonPattern) {
            const foundButtons = [];
            
            // 1. 在指定容器中查找
            if (buttonPattern.containers && KIRO_SELECTORS[buttonPattern.containers]) {
                const containers = this.findElementsWithFallback(KIRO_SELECTORS[buttonPattern.containers]);
                for (const container of containers) {
                    for (const selector of buttonPattern.selectors) {
                        const buttons = container.querySelectorAll(selector);
                        foundButtons.push(...Array.from(buttons));
                    }
                }
            }
            
            // 2. 全域查找作為備案
            if (foundButtons.length === 0) {
                foundButtons.push(...this.findElementsWithFallback(buttonPattern.selectors));
            }
            
            return foundButtons;
        }

        /**
         * 語義化按鈕識別 - 參考 cursor.js 的語義化識別
         */
        identifyButtonType(element) {
            const text = element.textContent?.toLowerCase().trim() || "";
            const ariaLabel = element.getAttribute("aria-label")?.toLowerCase() || "";
            const title = element.getAttribute("title")?.toLowerCase() || "";
            const className = element.className?.toLowerCase() || "";
            const searchText = `${text} ${ariaLabel} ${title} ${className}`;

            for (const [type, config] of Object.entries(KIRO_BUTTON_PATTERNS)) {
                for (const keyword of config.keywords) {
                    if (searchText.includes(keyword.toLowerCase())) {
                        return type;
                    }
                }
            }

            return null;
        }

        /**
         * 檢查元素可見性 - 參考 cursor.js 的可見性檢測
         */
        isElementVisible(element) {
            if (!element) return false;
            
            const style = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            
            return (
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                parseFloat(style.opacity) > 0.1 &&
                rect.width > 0 &&
                rect.height > 0
            );
        }

        /**
         * 檢查元素可點擊性 - 參考 cursor.js 的可點擊性檢測
         */
        isElementClickable(element) {
            if (!element) return false;
            
            const style = window.getComputedStyle(element);
            return (
                style.pointerEvents !== "none" &&
                !element.disabled &&
                !element.hasAttribute("disabled")
            );
        }

        /**
         * 檢查元素是否準備好 - 綜合檢查
         */
        isElementReady(element) {
            return element && 
                   element.isConnected && 
                   document.contains(element) && 
                   this.isElementVisible(element) && 
                   this.isElementClickable(element);
        }
    }

    /**
     * 🎪 主控制器 - 參考 cursor.js 的主控制器架構
     */
    class KiroTestController {
        constructor() {
            this.version = "1.0.0";
            this.isRunning = false;
            this.totalClicks = 0;
            this.stats = {
                retryClicks: 0,
                runClicks: 0,
                detectionCount: 0,
                failedClicks: 0
            };

            // 防重複點擊機制 - 參考 cursor.js
            this.recentClicks = new Map();
            this.lastClickTime = 0;
            this.minClickInterval = 1000; // 1秒
            this.clickCooldownPeriod = 3000; // 3秒
            this.processedElements = new WeakSet();

            // 初始化模組
            this.eventManager = new EventManager();
            this.domWatcher = new DOMWatcher(this.eventManager);
            this.elementFinder = new ElementFinder();

            this.setupEventHandlers();
            this.log("KiroTestScript v1.0.0 已初始化");
        }

        /**
         * 設置事件處理器
         */
        setupEventHandlers() {
            this.eventManager.on("dom-changed", () => {
                if (this.isRunning) {
                    this.checkAndClick();
                }
            });
        }

        /**
         * 開始測試
         */
        start() {
            if (this.isRunning) return;
            
            this.isRunning = true;
            this.domWatcher.start();
            this.log("開始 Kiro 按鈕檢測測試...");
            this.checkAndClick(); // 立即檢查一次
        }

        /**
         * 停止測試
         */
        stop() {
            if (!this.isRunning) return;
            
            this.isRunning = false;
            this.domWatcher.stop();
            this.log("停止 Kiro 按鈕檢測測試");
        }

        /**
         * 主檢測邏輯 - 參考 cursor.js 的檢測邏輯
         */
        checkAndClick() {
            this.stats.detectionCount++;
            
            // 按優先級排序
            const sortedPatterns = Object.entries(KIRO_BUTTON_PATTERNS)
                .sort(([,a], [,b]) => a.priority - b.priority);

            for (const [patternName, pattern] of sortedPatterns) {
                const foundButtons = this.elementFinder.findButtonsInContainers(pattern);
                
                for (const button of foundButtons) {
                    if (this.shouldClickButton(button, patternName, pattern)) {
                        this.performClick(button, patternName);
                        return; // 一次只點擊一個按鈕
                    }
                }
            }
        }

        /**
         * 判斷是否應該點擊按鈕 - 參考 cursor.js 的判斷邏輯
         */
        shouldClickButton(button, patternName, pattern) {
            // 檢查元素是否準備好
            if (!this.elementFinder.isElementReady(button)) {
                return false;
            }

            // 檢查是否已處理過
            if (this.processedElements.has(button)) {
                return false;
            }

            // 檢查防重複點擊機制
            if (this.isRecentClick(button)) {
                return false;
            }

            // 語義化驗證
            const buttonText = button.textContent.trim().toLowerCase();
            const isValidButton = pattern.keywords.some(keyword => 
                buttonText.includes(keyword.toLowerCase())
            );

            if (!isValidButton) {
                return false;
            }

            return true;
        }

        /**
         * 執行點擊 - 參考 cursor.js 的點擊執行邏輯
         */
        performClick(button, patternName) {
            try {
                const buttonText = button.textContent.trim();
                const currentTime = Date.now();

                // 記錄到防重複點擊機制
                this.recordClick(button, currentTime);
                this.processedElements.add(button);

                // 執行點擊
                button.click();

                // 更新統計
                this.totalClicks++;
                this.stats[patternName + 'Clicks']++;
                this.lastClickTime = currentTime;

                this.log(`✅ 成功點擊 ${patternName} 按鈕: "${buttonText}"`);
                this.logButtonDetails(button, patternName);

            } catch (error) {
                this.stats.failedClicks++;
                this.log(`❌ 點擊失敗 ${patternName} 按鈕: ${error.message}`);
            }
        }

        /**
         * 記錄點擊 - 參考 cursor.js 的點擊記錄機制
         */
        recordClick(button, timestamp) {
            const buttonKey = this.getButtonKey(button);
            this.recentClicks.set(buttonKey, timestamp);
        }

        /**
         * 檢查是否為最近點擊 - 參考 cursor.js 的重複檢查邏輯
         */
        isRecentClick(button) {
            const currentTime = Date.now();
            const buttonKey = this.getButtonKey(button);
            const lastClickTime = this.recentClicks.get(buttonKey);

            if (lastClickTime && (currentTime - lastClickTime) < this.clickCooldownPeriod) {
                return true;
            }

            // 清理過期記錄
            this.cleanupOldClicks(currentTime);
            return false;
        }

        /**
         * 生成按鈕唯一鍵
         */
        getButtonKey(button) {
            return `${button.tagName}-${button.className}-${button.textContent.trim()}`;
        }

        /**
         * 清理過期點擊記錄
         */
        cleanupOldClicks(currentTime) {
            for (const [key, timestamp] of this.recentClicks.entries()) {
                if (currentTime - timestamp > this.clickCooldownPeriod) {
                    this.recentClicks.delete(key);
                }
            }
        }

        /**
         * 詳細日誌記錄
         */
        logButtonDetails(button, patternName) {
            const details = {
                type: patternName,
                text: button.textContent.trim(),
                className: button.className,
                attributes: {
                    'data-variant': button.getAttribute('data-variant'),
                    'data-purpose': button.getAttribute('data-purpose'),
                    'data-active': button.getAttribute('data-active'),
                    'data-loading': button.getAttribute('data-loading'),
                    'data-size': button.getAttribute('data-size')
                },
                position: button.getBoundingClientRect()
            };
            
            console.log(`[KiroTestScript] 按鈕詳細資訊:`, details);
        }

        /**
         * 日誌記錄
         */
        log(message) {
            const timestamp = new Date().toLocaleTimeString();
            console.log(`[KiroTestScript ${timestamp}] ${message}`);
        }

        /**
         * 獲取統計資料
         */
        getStats() {
            return {
                ...this.stats,
                totalClicks: this.totalClicks,
                version: this.version,
                isRunning: this.isRunning,
                uptime: Date.now() - this.startTime
            };
        }

        /**
         * 除錯搜尋
         */
        debugSearch() {
            this.log("開始除錯搜尋...");
            
            for (const [patternName, pattern] of Object.entries(KIRO_BUTTON_PATTERNS)) {
                this.log(`\n=== 搜尋 ${patternName} 按鈕 ===`);
                
                const foundButtons = this.elementFinder.findButtonsInContainers(pattern);
                this.log(`找到 ${foundButtons.length} 個候選按鈕`);
                
                foundButtons.forEach((button, index) => {
                    const isReady = this.elementFinder.isElementReady(button);
                    const buttonText = button.textContent.trim();
                    const isValidText = pattern.keywords.some(keyword => 
                        buttonText.toLowerCase().includes(keyword.toLowerCase())
                    );
                    
                    console.log(`按鈕 ${index + 1}:`, {
                        text: buttonText,
                        className: button.className,
                        isReady,
                        isValidText,
                        attributes: {
                            'data-variant': button.getAttribute('data-variant'),
                            'data-purpose': button.getAttribute('data-purpose'),
                            'data-active': button.getAttribute('data-active'),
                            'data-loading': button.getAttribute('data-loading')
                        }
                    });
                });
            }
        }
    }

    // 創建全域實例
    const kiroTestScript = new KiroTestController();
    
    // 設定全域 API
    window.KiroTestScript = kiroTestScript;
    window.startKiroTest = () => kiroTestScript.start();
    window.stopKiroTest = () => kiroTestScript.stop();
    window.kiroTestStats = () => kiroTestScript.getStats();
    window.kiroTestDebug = () => kiroTestScript.debugSearch();

    // 自動啟動
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            kiroTestScript.start();
        });
    } else {
        kiroTestScript.start();
    }

    console.log("✨ KiroTestScript v1.0.0 已載入！");
    console.log("🎛️ API: startKiroTest(), stopKiroTest(), kiroTestStats(), kiroTestDebug()");
    console.log("👨‍💻 作者: threads:azlife_1224");
    console.log("🎯 功能: 專門測試 Kiro 頁面的 Retry 和 Run 按鈕檢測");
    console.log("🚀 特色: 參考 cursor.js 架構 + 彈性選擇器 + 語義化識別");

})();