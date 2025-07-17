/**
 * 📦 模組：KiroAssist v3.1.2 - 智能助手專業版
 * 🕒 最後更新：2025-07-17T17:00:00+08:00
 * 🧑‍💻 作者：threads:azlife_1224
 * 🔢 版本：v3.1.2
 * 📝 摘要：智能檢測並自動點擊各種按鈕，提供完整的模組化功能
 *
 * 🎯 功能特色：
 * ✅ 自動檢測Retry按鈕
 * ✅ 自動檢測Kiro Snackbar並點擊Run
 * ✅ MutationObserver監控DOM變化
 * ✅ 防重複點擊機制
 * ✅ 模組化功能設定
 * ✅ 專業App風格控制面板
 * ✅ SVG圖標系統 (純DOM API)
 * ✅ 點擊統計記錄
 * ✅ 可拖拽面板
 * ✅ 流暢動畫效果
 * ✅ 現代化設計語言
 * ✅ TrustedHTML相容性
 */

(function () {
  "use strict";

  // 避免重複載入
  if (window.KiroAssist) {
    console.log("[KiroAssist] 已載入，跳過重複初始化");
    return;
  }

  /**
   * 🎨 SVG圖標庫 - 專業App風格 (DOM結構定義)
   */
  const SVGIconsDOM = {
    // 刷新/重試圖標
    refresh: {
      elements: [
        { tag: 'polyline', attrs: { points: '23 4 23 10 17 10' } },
        { tag: 'polyline', attrs: { points: '1 20 1 14 7 14' } },
        { tag: 'path', attrs: { d: 'm3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' } }
      ]
    },
    
    // 播放圖標
    play: {
      elements: [
        { tag: 'polygon', attrs: { points: '5 3 19 12 5 21 5 3' } }
      ]
    },
    
    // 停止圖標
    stop: {
      elements: [
        { tag: 'rect', attrs: { x: '6', y: '6', width: '12', height: '12', rx: '2' } }
      ]
    },
    
    // 暫停圖標
    pause: {
      elements: [
        { tag: 'rect', attrs: { x: '6', y: '4', width: '4', height: '16' } },
        { tag: 'rect', attrs: { x: '14', y: '4', width: '4', height: '16' } }
      ]
    },
    
    // 最小化圖標
    minimize: {
      elements: [
        { tag: 'path', attrs: { d: 'M4 14h6v6' } },
        { tag: 'path', attrs: { d: 'm20 10-6 6 6 6' } }
      ]
    },
    
    // 關閉圖標
    close: {
      elements: [
        { tag: 'line', attrs: { x1: '18', y1: '6', x2: '6', y2: '18' } },
        { tag: 'line', attrs: { x1: '6', y1: '6', x2: '18', y2: '18' } }
      ]
    },
    
    // 活動圖標（運行狀態）
    activity: {
      elements: [
        { tag: 'polyline', attrs: { points: '22 12 18 12 15 21 9 3 6 12 2 12' } }
      ]
    },
    
    // 時鐘圖標（等待狀態）
    clock: {
      elements: [
        { tag: 'circle', attrs: { cx: '12', cy: '12', r: '10' } },
        { tag: 'polyline', attrs: { points: '12 6 12 12 16 14' } }
      ]
    },
    
    // 日誌圖標
    fileText: {
      elements: [
        { tag: 'path', attrs: { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' } },
        { tag: 'polyline', attrs: { points: '14 2 14 8 20 8' } },
        { tag: 'line', attrs: { x1: '16', y1: '13', x2: '8', y2: '13' } },
        { tag: 'line', attrs: { x1: '16', y1: '17', x2: '8', y2: '17' } },
        { tag: 'polyline', attrs: { points: '10 9 9 9 8 9' } }
      ]
    },
    
    // 用戶圖標
    user: {
      elements: [
        { tag: 'path', attrs: { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' } },
        { tag: 'circle', attrs: { cx: '12', cy: '7', r: '4' } }
      ]
    },
    
    // 外部鏈接圖標
    externalLink: {
      elements: [
        { tag: 'path', attrs: { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' } },
        { tag: 'polyline', attrs: { points: '15 3 21 3 21 9' } },
        { tag: 'line', attrs: { x1: '10', y1: '14', x2: '21', y2: '3' } }
      ]
    },
    
    // 成功圖標
    checkCircle: {
      elements: [
        { tag: 'path', attrs: { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' } },
        { tag: 'polyline', attrs: { points: '22 4 12 14.01 9 11.01' } }
      ]
    },
    
    // 警告圖標
    alertTriangle: {
      elements: [
        { tag: 'path', attrs: { d: 'm21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' } },
        { tag: 'line', attrs: { x1: '12', y1: '9', x2: '12', y2: '13' } },
        { tag: 'line', attrs: { x1: '12', y1: '17', x2: '12.01', y2: '17' } }
      ]
    },
    
    // 錯誤圖標
    xCircle: {
      elements: [
        { tag: 'circle', attrs: { cx: '12', cy: '12', r: '10' } },
        { tag: 'line', attrs: { x1: '15', y1: '9', x2: '9', y2: '15' } },
        { tag: 'line', attrs: { x1: '9', y1: '9', x2: '15', y2: '15' } }
      ]
    },
    
    // 信息圖標
    info: {
      elements: [
        { tag: 'circle', attrs: { cx: '12', cy: '12', r: '10' } },
        { tag: 'line', attrs: { x1: '12', y1: '16', x2: '12', y2: '12' } },
        { tag: 'line', attrs: { x1: '12', y1: '8', x2: '12.01', y2: '8' } }
      ]
    },
    
    // 統計圖標
    barChart: {
      elements: [
        { tag: 'line', attrs: { x1: '12', y1: '20', x2: '12', y2: '10' } },
        { tag: 'line', attrs: { x1: '18', y1: '20', x2: '18', y2: '4' } },
        { tag: 'line', attrs: { x1: '6', y1: '20', x2: '6', y2: '16' } }
      ]
    },
    
    // 設定圖標
    settings: {
      elements: [
        { tag: 'circle', attrs: { cx: '12', cy: '12', r: '3' } },
        { tag: 'path', attrs: { d: 'm12 1 1.47 2.93L16.4 4.4l-.47 1.93 2.93 1.47-.47 1.93-2.93 1.47.47 1.93L12 13.07l-1.47-2.93L7.6 9.67l.47-1.93L5.14 6.27l.47-1.93 2.93-1.47L8.07 1 12 1z' } }
      ]
    },
    
    // 模組圖標
    package: {
      elements: [
        { tag: 'line', attrs: { x1: '16.5', y1: '9.4', x2: '7.5', y2: '4.21' } },
        { tag: 'path', attrs: { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' } },
        { tag: 'polyline', attrs: { points: '3.27 6.96 12 12.01 20.73 6.96' } },
        { tag: 'line', attrs: { x1: '12', y1: '22.08', x2: '12', y2: '12' } }
      ]
    },
    
    // 眼睛圖標（用於檢測狀態）
    eye: {
      elements: [
        { tag: 'path', attrs: { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' } },
        { tag: 'circle', attrs: { cx: '12', cy: '12', r: '3' } }
      ]
    },
    
    // 雷電圖標（用於自動執行）
    zap: {
      elements: [
        { tag: 'polygon', attrs: { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' } }
      ]
    }
  };

  /**
   * 🎨 創建SVG圖標元素 - 使用DOM API避免TrustedHTML問題
   */
  function createSVGIcon(iconName, className = '') {
    const iconDef = SVGIconsDOM[iconName];
    if (!iconDef) return null;

    const container = document.createElement('span');
    container.className = `crc-icon ${className}`;

    // 創建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    // 根據圖標類型添加對應的元素
    iconDef.elements.forEach(elementDef => {
      const element = document.createElementNS('http://www.w3.org/2000/svg', elementDef.tag);
      Object.entries(elementDef.attrs).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
      if (elementDef.content) {
        element.textContent = elementDef.content;
      }
      svg.appendChild(element);
    });

    container.appendChild(svg);
    return container;
  }

  /**
   * 🎯 彈性選擇器配置 - 降低頁面結構耦合 (Enhanced with CursorAutoAccept strategies)
   */
  const SELECTORS = {
    // 按鈕容器選擇器 - 擴展支援更多變體
    buttonContainers: [
      '.kiro-snackbar',
      '.kiro-snackbar-container',
      '.kiro-snackbar-actions',
      '.kiro-snackbar-header',
      'div[class*="kiro-snackbar"]',
      'div[class*="kiro-button"]',
    ],

    // Retry按鈕選擇器 - 針對具體HTML結構優化
    retryButtons: [
      // 精確匹配用戶提供的結構
      'button.kiro-button[data-variant="secondary"][data-purpose="default"]',
      'button.kiro-button[data-variant="secondary"]',
      // 通用備選方案
      'button.kiro-button',
      'button[data-variant="secondary"]',
      'button[data-purpose="default"]',
      'button',
      '[role="button"]',
      '[class*="button"]',
      '[class*="kiro-button"]',
      '[onclick]',
      '.retry-button',
      '.btn-retry',
    ],

    // Kiro Snackbar Run按鈕選擇器 - 針對具體HTML結構優化
    kiroSnackbarRun: [
      // 精確匹配用戶提供的結構 - Run按鈕特徵
      '.kiro-snackbar-actions button.kiro-button[data-variant="primary"][data-purpose="alert"]',
      '.kiro-snackbar-actions button.kiro-button[data-variant="primary"]',
      '.kiro-snackbar-actions button[data-variant="primary"][data-purpose="alert"]',
      '.kiro-snackbar-actions button[data-variant="primary"]',
      // 容器內搜尋
      '.kiro-snackbar .kiro-button[data-variant="primary"]',
      '.kiro-snackbar-actions button.kiro-button',
      '.kiro-snackbar-actions button',
      '.kiro-snackbar button[data-purpose="alert"]',
      '.kiro-snackbar button.kiro-button',
      // 通用備選方案
      'button.kiro-button[data-variant="primary"]',
      'button[data-variant="primary"]',
    ],

    // Kiro Snackbar容器選擇器 - 增強檢測能力
    kiroSnackbarContainer: [
      '.kiro-snackbar',
      '.kiro-snackbar-container',
      '.kiro-snackbar-container.needs-attention',
      'div.kiro-snackbar',
      'div[class*="kiro-snackbar"]',
      '[class*="snackbar"]',
    ],

    // 點擊驗證選擇器 - 更精確的等待文字檢測
    waitingText: [
      '.thinking-text[data-is-thinking="true"]',
      '.kiro-snackbar-title .thinking-text[data-is-thinking="true"]',
      '.thinking-text',
      '.kiro-snackbar-title',
      '[data-is-thinking="true"]',
      '[data-is-thinking]',
    ],

    // 需要注意的容器選擇器
    needsAttentionContainer: [
      '.kiro-snackbar-container.needs-attention',
      '.needs-attention',
      '[class*="needs-attention"]',
    ]
  };

  /**
   * 🎯 按鈕模式配置 - 支援語義化識別 (Enhanced with precise patterns)
   */
  const BUTTON_PATTERNS = {
    retry: {
      keywords: ['retry', 'retry button', '重試', '重新嘗試', '再試一次', '重新執行'],
      priority: 1,
      extraTime: 2000,
      // 精確屬性匹配
      attributes: {
        'data-variant': 'secondary',
        'data-purpose': 'default'
      }
    },
    kiroSnackbarRun: {
      keywords: ['run', 'run button', '執行', '運行', '執行按鈕'],
      priority: 2,
      extraTime: 1000,
      // 精確屬性匹配
      attributes: {
        'data-variant': 'primary',
        'data-purpose': 'alert'
      }
    },
    trust: {
      keywords: ['trust', 'trust button', '信任', '信任按鈕'],
      priority: 3,
      extraTime: 500,
      attributes: {
        'data-variant': 'secondary',
        'data-purpose': 'alert'
      }
    },
    reject: {
      keywords: ['reject', 'reject button', '拒絕', '拒絕按鈕'],
      priority: 4,
      extraTime: 500,
      attributes: {
        'data-variant': 'tertiary',
        'data-purpose': 'alert'
      }
    },
  };

  /**
   * 🔍 彈性元素查找器 - 解決頁面結構耦合問題
   */
  class ElementFinder {
    constructor() {
      this.cache = new Map();
      this.cacheTimeout = 5000; // 5秒快取
    }

    /**
     * 使用多重選擇器策略查找元素
     */
    findElement(selectors, context = document) {
      const cacheKey = selectors.join('|') + (context !== document ? context.className : '');
      const cached = this.cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        // 檢查快取元素是否仍然有效
        if (this.isElementValid(cached.element)) {
          return cached.element;
        } else {
          // 移除無效快取
          this.cache.delete(cacheKey);
        }
      }

      for (const selector of selectors) {
        try {
          const element = context.querySelector(selector);
          if (element && this.isElementVisible(element)) {
            this.cache.set(cacheKey, { element, timestamp: Date.now() });
            return element;
          }
        } catch (error) {
          console.warn(`[ElementFinder] 選擇器失效: ${selector}`, error);
        }
      }

      return null;
    }

    /**
     * 查找所有匹配元素
     */
    findElements(selectors, context = document) {
      const elements = [];

      for (const selector of selectors) {
        try {
          const found = context.querySelectorAll(selector);
          elements.push(...Array.from(found).filter(el => this.isElementVisible(el)));
        } catch (error) {
          console.warn(`[ElementFinder] 選擇器失效: ${selector}`, error);
        }
      }

      return elements;
    }

    /**
     * 語義化按鈕識別 (Enhanced with broader element detection)
     */
    findButtonsBySemantics(context = document) {
      const buttons = [];
      const processedElements = new Set(); // 防止重複處理

      // 使用多種策略查找可點擊元素 - 擴展支援更多變體
      const clickableSelectors = [
        // 標準按鈕元素
        'button',
        'div[role="button"]',
        'span[role="button"]',
        'a[role="button"]',
        // 事件監聽器元素
        'div[onclick]',
        'span[onclick]',
        '[onclick]',
        // 樣式指示器
        'div[style*="cursor: pointer"]',
        'div[style*="cursor:pointer"]',
        'span[style*="cursor: pointer"]',
        'span[style*="cursor:pointer"]',
        // CSS類別匹配
        '[class*="button"]',
        '[class*="btn"]',
        '[class*="kiro-button"]',
        // 數據屬性
        '[data-variant]',
        '[data-purpose]',
        '[data-testid*="button"]',
        // Kiro特定選擇器
        '.kiro-button',
        '.kiro-snackbar-actions > *',
      ];

      const clickableElements = this.findElements(clickableSelectors, context);

      for (const element of clickableElements) {
        // 使用元素的唯一標識防止重複處理
        const elementKey = this.getElementKey(element);
        if (processedElements.has(elementKey)) {
          continue;
        }
        processedElements.add(elementKey);

        const buttonType = this.identifyButtonType(element);
        if (buttonType) {
          buttons.push({ element, type: buttonType });
        }
      }

      return buttons;
    }

    /**
     * 獲取元素的唯一標識符
     */
    getElementKey(element) {
      if (!element) return null;
      
      const text = element.textContent?.trim() || '';
      const className = this.getElementClassName(element);
      const tagName = element.tagName || '';
      const dataVariant = element.getAttribute('data-variant') || '';
      const dataPurpose = element.getAttribute('data-purpose') || '';
      
      try {
        const rect = element.getBoundingClientRect();
        const position = { x: Math.round(rect.x), y: Math.round(rect.y) };
        return `${tagName}-${className}-${dataVariant}-${dataPurpose}-${text.substring(0, 20)}-${position.x}-${position.y}`;
      } catch {
        return `${tagName}-${className}-${dataVariant}-${dataPurpose}-${text.substring(0, 20)}-0-0`;
      }
    }

    /**
     * 識別按鈕類型 (Enhanced with precise attribute matching)
     */
    identifyButtonType(element) {
      const text = element.textContent?.toLowerCase().trim() || '';
      const ariaLabel = element.getAttribute('aria-label')?.toLowerCase() || '';
      const title = element.getAttribute('title')?.toLowerCase() || '';
      const className = this.getElementClassName(element).toLowerCase();
      const dataVariant = element.getAttribute('data-variant')?.toLowerCase() || '';
      const dataPurpose = element.getAttribute('data-purpose')?.toLowerCase() || '';
      const dataActive = element.getAttribute('data-active')?.toLowerCase() || '';
      const dataLoading = element.getAttribute('data-loading')?.toLowerCase() || '';
      const searchText = `${text} ${ariaLabel} ${title} ${className} ${dataVariant} ${dataPurpose}`;

      // 按優先級排序處理
      const sortedPatterns = Object.entries(BUTTON_PATTERNS).sort((a, b) => a[1].priority - b[1].priority);
      
      for (const [type, config] of sortedPatterns) {
        // 首先檢查屬性匹配（更精確）
        if (config.attributes) {
          let attributeMatches = true;
          for (const [attrName, expectedValue] of Object.entries(config.attributes)) {
            const actualValue = element.getAttribute(attrName)?.toLowerCase() || '';
            if (actualValue !== expectedValue.toLowerCase()) {
              attributeMatches = false;
              break;
            }
          }
          
          // 如果屬性匹配，再檢查關鍵字
          if (attributeMatches) {
            for (const keyword of config.keywords) {
              if (searchText.includes(keyword.toLowerCase())) {
                // 進一步檢查按鈕狀態（不應該正在加載或不可用）
                if (dataLoading === 'true' || dataActive === 'false' && type === 'retry') {
                  continue; // 跳過加載中或非活動的按鈕
                }
                return type;
              }
            }
          }
        } else {
          // 如果沒有屬性定義，使用原始的關鍵字匹配
          for (const keyword of config.keywords) {
            if (searchText.includes(keyword.toLowerCase())) {
              return type;
            }
          }
        }
      }

      return null;
    }

    /**
     * 檢查元素可見性 (參考極簡腳本的 isElementReady 邏輯)
     */
    isElementVisible(element) {
      if (!element) return false;

      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        parseFloat(style.opacity) > 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    }

    /**
     * 檢查元素可點擊性 (參考極簡腳本的 isElementReady 邏輯)
     */
    isElementClickable(element) {
      if (!element) return false;

      const style = window.getComputedStyle(element);
      return (
        style.pointerEvents !== 'none' &&
        !element.disabled &&
        !element.hasAttribute('disabled') &&
        element.getAttribute('aria-disabled') !== 'true'
      );
    }

    /**
     * 檢查元素是否準備就緒 (參考極簡腳本的完整檢查邏輯)
     */
    isElementReady(element) {
      if (!element) return false;

      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity > 0 &&
        rect.width > 0 &&
        rect.height > 0 &&
        !element.disabled &&
        !element.hasAttribute('disabled')
      );
    }

    /**
     * 檢查元素是否仍然有效
     */
    isElementValid(element) {
      return (
        element &&
        element.isConnected &&
        document.contains(element) &&
        this.isElementVisible(element)
      );
    }

    /**
     * 清除快取
     */
    clearCache() {
      this.cache.clear();
    }

    /**
     * 安全地獲取元素的類名字符串
     */
    getElementClassName(element) {
      if (!element) return "";
      
      try {
        // 處理不同類型的 className 屬性
        if (typeof element.className === 'string') {
          return element.className;
        } else if (element.className && element.className.toString) {
          // 處理 DOMTokenList 或其他對象
          return element.className.toString();
        } else if (element.classList) {
          // 使用 classList 作為備選方案
          return Array.from(element.classList).join(' ');
        } else {
          // 最後的備選方案
          return element.getAttribute('class') || "";
        }
      } catch (error) {
        console.warn('[ElementFinder] Error getting className:', error);
        return "";
      }
    }
  }

  /**
   * 🔬 DOM 監視器 (Enhanced with improved relevance detection)
   */
  class DOMWatcher {
    constructor(callback) {
      this.callback = callback;
      this.observer = null;
      this.isWatching = false;
      this.debounceTimer = null;
      this.debounceDelay = 250; // 250ms 防抖 (參考極簡腳本優化響應速度)
      this.lastRelevantChange = Date.now();
      this.changeHistory = new Map(); // 追蹤變化歷史
    }

    start() {
      if (this.isWatching) return;

      this.observer = new MutationObserver((mutations) => {
        this.handleMutations(mutations);
      });

      // 擴展監視屬性，增加更多關鍵屬性
      const config = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: [
          "class", 
          "style", 
          "data-active", 
          "data-loading", 
          "data-variant",
          "data-purpose",
          "data-is-thinking",
          "disabled",
          "aria-disabled",
          "hidden",
          "aria-hidden"
        ],
        characterData: true, // 監視文字內容變化
      };

      this.observer.observe(document.body, config);
      this.isWatching = true;
      console.log("[DOMWatcher] 🔍 開始監視DOM變化 (Enhanced)");
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
      console.log("[DOMWatcher] ⏹️ 停止監視DOM變化");
    }

    handleMutations(mutations) {
      let hasRelevantChanges = false;
      let changeReason = '';

      for (const mutation of mutations) {
        const relevantResult = this.isRelevantMutation(mutation);
        if (relevantResult.isRelevant) {
          hasRelevantChanges = true;
          changeReason = relevantResult.reason;
          break;
        }
      }

      if (hasRelevantChanges) {
        this.lastRelevantChange = Date.now();
        
        // 記錄變化歷史
        const changeKey = `${changeReason}-${Date.now()}`;
        this.changeHistory.set(changeKey, {
          timestamp: Date.now(),
          reason: changeReason,
          mutationCount: mutations.length
        });
        
        // 清理過期的變化歷史（5秒）
        this.cleanupChangeHistory();

        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = setTimeout(() => {
          this.callback(changeReason);
        }, this.debounceDelay); // 使用 250ms 防抖延遲，參考極簡腳本
      }
    }

    /**
     * 清理過期的變化歷史
     */
    cleanupChangeHistory() {
      const now = Date.now();
      const expireTime = 5000; // 5秒
      
      for (const [key, change] of this.changeHistory.entries()) {
        if (now - change.timestamp > expireTime) {
          this.changeHistory.delete(key);
        }
      }
    }

    isRelevantMutation(mutation) {
      const result = { isRelevant: false, reason: '' };
      
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const contentResult = this.hasRelevantContent(node);
            if (contentResult.isRelevant) {
              result.isRelevant = true;
              result.reason = `childList-${contentResult.type}`;
              return result;
            }
          }
        }
      }

      if (mutation.type === "attributes") {
        const target = mutation.target;
        if (target.nodeType === Node.ELEMENT_NODE) {
          const contentResult = this.hasRelevantContent(target);
          if (contentResult.isRelevant) {
            result.isRelevant = true;
            result.reason = `attributes-${contentResult.type}-${mutation.attributeName}`;
            return result;
          }
        }
      }

      if (mutation.type === "characterData") {
        const target = mutation.target;
        const parentElement = target.parentElement;
        if (parentElement) {
          const contentResult = this.hasRelevantContent(parentElement);
          if (contentResult.isRelevant) {
            result.isRelevant = true;
            result.reason = `characterData-${contentResult.type}`;
            return result;
          }
        }
      }

      return result;
    }

    hasRelevantContent(element) {
      const result = { isRelevant: false, type: '' };
      
      if (!element) return result;
      
      const text = element.textContent?.toLowerCase() || "";
      const className = this.getElementClassName(element);
      
      // 檢查是否為 Retry 按鈕 - 更精確的檢測
      const isRetryButton = (
        text.includes("retry") ||
        text.includes("重試") ||
        text.includes("重新嘗試") ||
        text.includes("再試一次") ||
        className.includes("retry")
      ) && (
        className.includes("kiro-button") ||
        element.hasAttribute("data-variant") ||
        element.tagName === 'BUTTON'
      );
      
      if (isRetryButton) {
        result.isRelevant = true;
        result.type = 'retry';
        return result;
      }
      
      // 檢查是否為 Kiro Snackbar 相關元素 - 更精確的檢測
      const isKiroSnackbar = (
        className.includes("kiro-snackbar") ||
        className.includes("needs-attention") ||
        className.includes("thinking-text") ||
        element.hasAttribute("data-is-thinking")
      );
      
      if (isKiroSnackbar) {
        result.isRelevant = true;
        result.type = 'snackbar';
        return result;
      }
      
      // 檢查 Snackbar 內的按鈕（Run/Trust/Reject）
      const isSnackbarButton = (
        className.includes("kiro-button") ||
        element.hasAttribute("data-variant")
      ) && (
        text.includes("run") ||
        text.includes("trust") ||
        text.includes("reject") ||
        text.includes("執行") ||
        text.includes("信任") ||
        text.includes("拒絕")
      );
      
      if (isSnackbarButton) {
        result.isRelevant = true;
        result.type = 'snackbar-button';
        return result;
      }
      
      // 檢查等待輸入文字
      const hasWaitingText = (
        text.includes("waiting on your input") ||
        text.includes("等待您的輸入") ||
        element.hasAttribute("data-is-thinking")
      );
      
      if (hasWaitingText) {
        result.isRelevant = true;
        result.type = 'waiting-text';
        return result;
      }
      
      // 檢查關鍵數據屬性
      const hasRelevantAttributes = element.hasAttribute && (
        element.hasAttribute("data-variant") ||
        element.hasAttribute("data-purpose") ||
        element.hasAttribute("data-active") ||
        element.hasAttribute("data-loading") ||
        element.hasAttribute("data-is-thinking")
      );
      
      if (hasRelevantAttributes) {
        result.isRelevant = true;
        result.type = 'data-attributes';
        return result;
      }
      
      return result;
    }

    /**
     * 安全地獲取元素的類名字符串
     */
    getElementClassName(element) {
      if (!element) return "";
      
      try {
        // 處理不同類型的 className 屬性
        if (typeof element.className === 'string') {
          return element.className;
        } else if (element.className && element.className.toString) {
          // 處理 DOMTokenList 或其他對象
          return element.className.toString();
        } else if (element.classList) {
          // 使用 classList 作為備選方案
          return Array.from(element.classList).join(' ');
        } else {
          // 最後的備選方案
          return element.getAttribute('class') || "";
        }
      } catch (error) {
        console.warn('[DOMWatcher] Error getting className:', error);
        return "";
      }
    }
  }

  /**
   * 🎪 主控制器類別 - KiroAssist智能助手
   */
  class KiroAssist {
    constructor() {
      this.version = "3.1.2";
      this.isRunning = false;
      this.totalClicks = 0;
      this.lastClickTime = 0;
      this.minClickInterval = 2000; // 最小點擊間隔 2 秒
      this.clickedButtons = new WeakSet(); // 追蹤已點擊的按鈕

      // 防重複點擊機制 (Enhanced with CursorAutoAccept patterns)
      this.recentClicks = new Map(); // 記錄最近點擊的按鈕
      this.clickCooldownPeriod = 3000; // 同一按鈕冷卻期 3 秒
      this.processedElements = new WeakSet(); // 追蹤已處理的元素
      this.isClickInProgress = false; // 點擊進行中標誌，防止並發點擊

      // 模組配置 - 可由用戶控制
      this.moduleConfig = {
        retryButton: {
          enabled: true,
          name: "Retry按鈕",
          description: "自動檢測並點擊Retry重試按鈕"
        },
        kiroSnackbar: {
          enabled: true,
          name: "Kiro Snackbar",
          description: "自動檢測Kiro通知欄並點擊Run按鈕"
        },
      };

      // 統計資料
      this.moduleStats = {
        retryButton: 0,
        kiroSnackbar: 0,
      };

      // 初始化模組
      this.elementFinder = new ElementFinder();
      this.domWatcher = new DOMWatcher(() => this.checkAndClickButtons());
      this.controlPanel = null;

      this.createControlPanel();
      this.log("🚀 KiroAssist v3.1.2 已初始化 (參考極簡腳本優化)", "success");
    }

    /**
     * 檢查並點擊各種按鈕 (Enhanced with CursorAutoAccept patterns)
     */
    checkAndClickButtons() {
      if (!this.isRunning) return;

      try {
        // 清理過期的點擊記錄和元素狀態
        this.cleanupExpiredClicks();
        this.cleanupExpiredElementStates();

        // 獲取所有可點擊按鈕並按優先級排序
        const allButtons = this.findAllClickableButtons();
        const sortedButtons = this.sortButtonsByPriority(allButtons);

        // 處理按鈕點擊 - 每次檢查只點擊一個最高優先級的按鈕
        for (const buttonInfo of sortedButtons) {
          const { button, type, priority } = buttonInfo;
          
          if (this.canClickElement(button, type)) {
            const success = this.clickElement(button, type);
            if (success) {
              console.log(`[KiroAssist] 成功點擊 ${type} 按鈕 (優先級: ${priority})`);
              break; // 成功點擊後停止，避免連續點擊
            }
          }
        }
      } catch (error) {
        this.log(`執行時出錯：${error.message}`, "error");
        console.error("[KiroAssist] 詳細錯誤:", error);
      }
    }

    /**
     * 尋找所有可點擊按鈕並整合到統一列表
     */
    findAllClickableButtons() {
      const allButtons = [];

      // 檢查Retry按鈕
      if (this.moduleConfig.retryButton.enabled) {
        const retryButtons = this.findRetryButtons();
        retryButtons.forEach(button => {
          allButtons.push({
            button,
            type: 'retry',
            priority: BUTTON_PATTERNS.retry.priority,
            moduleConfig: this.moduleConfig.retryButton
          });
        });
      }

      // 檢查Kiro Snackbar Run按鈕
      if (this.moduleConfig.kiroSnackbar.enabled) {
        const kiroRunButtons = this.findKiroSnackbarRunButtons();
        kiroRunButtons.forEach(button => {
          allButtons.push({
            button,
            type: 'kiroSnackbarRun',
            priority: BUTTON_PATTERNS.kiroSnackbarRun.priority,
            moduleConfig: this.moduleConfig.kiroSnackbar
          });
        });
      }

      return allButtons;
    }

    /**
     * 按優先級排序按鈕
     */
    sortButtonsByPriority(buttons) {
      return buttons.sort((a, b) => {
        // 首先按模組優先級排序
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        
        // 然後按元素可見性和位置排序（越上方越優先）
        try {
          const rectA = a.button.getBoundingClientRect();
          const rectB = b.button.getBoundingClientRect();
          return rectA.top - rectB.top;
        } catch {
          return 0;
        }
      });
    }

    /**
     * 清理過期的元素狀態記錄
     */
    cleanupExpiredElementStates() {
      // 這裡可以加入更多的清理邏輯，例如檢查元素是否仍然存在於DOM中
      const now = Date.now();
      
      // 清理長時間未使用的元素狀態
      for (const [elementKey, clickTime] of this.recentClicks.entries()) {
        if (now - clickTime > 30000) { // 30秒後清理
          this.recentClicks.delete(elementKey);
        }
      }
    }

    /**
     * 尋找Retry按鈕
     */
    findRetryButtons() {
      const buttons = this.elementFinder.findButtonsBySemantics();
      const retryButtons = buttons.filter(btn => btn.type === 'retry').map(btn => btn.element);
      
      // 如果語義化識別沒有找到，使用傳統方法
      if (retryButtons.length === 0) {
        const fallbackButtons = this.elementFinder.findElements(SELECTORS.retryButtons);
        return fallbackButtons.filter(btn => 
          btn.textContent?.toLowerCase().includes('retry') ||
          btn.textContent?.toLowerCase().includes('重試')
        );
      }
      
      return retryButtons;
    }

    /**
     * 尋找Kiro Snackbar Run按鈕 (參考極簡腳本的精確選擇器邏輯)
     */
    findKiroSnackbarRunButtons() {
      // 使用精確的選擇器找到目標按鈕 (參考極簡腳本)
      // - 在 'div.kiro-snackbar' 容器內
      // - 尋找 'button.kiro-button'
      // - 該按鈕的 data-variant 屬性為 'primary'
      const runButton = document.querySelector('div.kiro-snackbar button.kiro-button[data-variant="primary"]');
      
      // 檢查按鈕是否存在，文字是否為 "Run"，且是否準備就緒
      if (runButton && runButton.textContent.trim() === 'Run' && this.elementFinder.isElementReady(runButton)) {
        console.log("[KiroAssist] 偵測到精確的 'Run' 按鈕");
        return [runButton];
      }

      // 如果精確選擇器沒找到，回退到原有邏輯
      const snackbarContainer = this.elementFinder.findElement(SELECTORS.kiroSnackbarContainer);
      if (!snackbarContainer) {
        console.log("[KiroAssist] 未找到 Kiro Snackbar 容器");
        return [];
      }

      console.log("[KiroAssist] 找到 Kiro Snackbar 容器:", snackbarContainer);

      // 檢查容器是否包含"Waiting on your input"文字
      const waitingText = this.elementFinder.findElement(SELECTORS.waitingText, snackbarContainer);
      const hasWaitingText = waitingText && waitingText.textContent.includes("Waiting on your input");
      
      // 也檢查是否包含"needs-attention"類別
      const hasNeedsAttention = snackbarContainer.classList.contains('needs-attention') || 
                               snackbarContainer.querySelector('.needs-attention');
      
      console.log("[KiroAssist] 檢查狀態 - hasWaitingText:", hasWaitingText, "hasNeedsAttention:", hasNeedsAttention);
      
      // 如果沒有等待輸入的文字且不是需要注意的通知，就跳過
      if (!hasWaitingText && !hasNeedsAttention) {
        console.log("[KiroAssist] 條件不滿足，跳過處理");
        return [];
      }

      // 在容器內尋找Run按鈕
      const buttons = this.elementFinder.findButtonsBySemantics(snackbarContainer);
      const runButtons = buttons.filter(btn => btn.type === 'kiroSnackbarRun').map(btn => btn.element);
      
      console.log("[KiroAssist] 語義化識別找到按鈕:", runButtons.length);
      
      // 如果語義化識別沒有找到，使用傳統方法
      if (runButtons.length === 0) {
        console.log("[KiroAssist] 使用傳統方法搜尋按鈕");
        const fallbackButtons = this.elementFinder.findElements(SELECTORS.kiroSnackbarRun, snackbarContainer);
        const filteredButtons = fallbackButtons.filter(btn => 
          btn.textContent?.toLowerCase().includes('run') &&
          btn.getAttribute('data-variant') === 'primary'
        );
        console.log("[KiroAssist] 傳統方法找到按鈕:", filteredButtons.length);
        return filteredButtons;
      }
      
      return runButtons;
    }

    /**
     * 清理過期的點擊記錄
     */
    cleanupExpiredClicks() {
      const now = Date.now();
      for (const [elementKey, clickTime] of this.recentClicks.entries()) {
        if (now - clickTime > this.clickCooldownPeriod) {
          this.recentClicks.delete(elementKey);
        }
      }
    }

    /**
     * 產生元素的唯一標識符
     */
    getElementKey(element) {
      if (!element) return null;

      // 使用元素的多種屬性來創建唯一標識
      const text = element.textContent?.trim() || "";
      const className = element.className || "";
      const tagName = element.tagName || "";
      const position = this.getElementPosition(element);

      return `${tagName}-${className}-${text.substring(0, 20)}-${position.x}-${position.y}`;
    }

    /**
     * 取得元素的位置資訊
     */
    getElementPosition(element) {
      try {
        const rect = element.getBoundingClientRect();
        return { x: Math.round(rect.x), y: Math.round(rect.y) };
      } catch {
        return { x: 0, y: 0 };
      }
    }

    /**
     * 檢查元素是否可以點擊 (Enhanced with comprehensive validation)
     */
    canClickElement(element, buttonType) {
      if (!element || !buttonType) return false;

      // Phase 1: 基礎驗證
      if (!this.isBasicValidationPassed(element, buttonType)) {
        return false;
      }

      // Phase 2: 時間間隔驗證
      if (!this.isTimingValidationPassed(element, buttonType)) {
        return false;
      }

      // Phase 3: 元素狀態驗證
      if (!this.isElementStateValid(element, buttonType)) {
        return false;
      }

      // Phase 4: 按鈕特定驗證
      if (!this.isButtonSpecificValidationPassed(element, buttonType)) {
        return false;
      }

      // Phase 5: 環境上下文驗證
      if (!this.isContextualValidationPassed(element, buttonType)) {
        return false;
      }

      return true;
    }

    /**
     * 基礎驗證檢查
     */
    isBasicValidationPassed(element, buttonType) {
      // 檢查元素和類型是否有效
      if (!element || !buttonType) return false;

      // 檢查元素是否仍然連接到DOM
      if (!element.isConnected || !document.contains(element)) {
        return false;
      }

      // 檢查元素是否已被處理過
      if (this.processedElements.has(element)) {
        return false;
      }

      return true;
    }

    /**
     * 時間間隔驗證檢查
     */
    isTimingValidationPassed(element, buttonType) {
      const now = Date.now();
      const elementKey = this.getElementKey(element);

      // 檢查全域點擊間隔
      if (now - this.lastClickTime < this.minClickInterval) {
        return false;
      }

      // 檢查元素特定冷卻期
      if (elementKey && this.recentClicks.has(elementKey)) {
        const lastClickTime = this.recentClicks.get(elementKey);
        const cooldownTime = this.clickCooldownPeriod;
        
        // 根據按鈕類型調整冷卻期
        const pattern = BUTTON_PATTERNS[buttonType];
        const adjustedCooldown = pattern?.extraTime ? cooldownTime + pattern.extraTime : cooldownTime;
        
        if (now - lastClickTime < adjustedCooldown) {
          return false;
        }
      }

      return true;
    }

    /**
     * 元素狀態驗證檢查
     */
    isElementStateValid(element, buttonType) {
      // 檢查基礎可見性和可點擊性
      if (!this.elementFinder.isElementVisible(element) || 
          !this.elementFinder.isElementClickable(element)) {
        return false;
      }

      // 檢查元素是否被其他元素遮擋
      if (this.isElementObscured(element)) {
        return false;
      }

      // 檢查元素尺寸是否合理
      const rect = element.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) {
        return false; // 元素太小，可能不是真正的按鈕
      }

      return true;
    }

    /**
     * 按鈕特定驗證檢查
     */
    isButtonSpecificValidationPassed(element, buttonType) {
      const pattern = BUTTON_PATTERNS[buttonType];
      if (!pattern) return false;

      // 檢查按鈕屬性狀態
      const dataActive = element.getAttribute('data-active');
      const dataLoading = element.getAttribute('data-loading');
      const ariaDisabled = element.getAttribute('aria-disabled');

      // Retry按鈕特定檢查
      if (buttonType === 'retry') {
        // 如果明確標記為非活動狀態，跳過
        if (dataActive === 'false') return false;
        
        // 如果正在載入中，跳過
        if (dataLoading === 'true') return false;
      }

      // Kiro Snackbar Run按鈕特定檢查
      if (buttonType === 'kiroSnackbarRun') {
        // 檢查是否在正確的容器中
        const snackbarContainer = element.closest('.kiro-snackbar, .kiro-snackbar-container');
        if (!snackbarContainer) return false;

        // 檢查容器是否有需要注意的狀態
        const hasNeedsAttention = snackbarContainer.classList.contains('needs-attention') ||
                                  snackbarContainer.querySelector('.needs-attention');
        
        // 檢查是否有等待文字
        const hasWaitingText = snackbarContainer.textContent.includes('Waiting on your input');
        
        if (!hasNeedsAttention && !hasWaitingText) return false;
      }

      // 通用disabled檢查
      if (element.disabled || ariaDisabled === 'true') {
        return false;
      }

      return true;
    }

    /**
     * 環境上下文驗證檢查
     */
    isContextualValidationPassed(element, buttonType) {
      // 檢查頁面是否處於活動狀態
      if (document.hidden || !document.hasFocus()) {
        return false; // 頁面不在前台時不點擊
      }

      // 檢查是否有模態框或覆蓋層阻擋
      const modals = document.querySelectorAll('[role="dialog"], .modal, .overlay');
      for (const modal of modals) {
        if (this.elementFinder.isElementVisible(modal) && !modal.contains(element)) {
          return false; // 有模態框且按鈕不在其中
        }
      }

      return true;
    }

    /**
     * 檢查元素是否被遮擋
     */
    isElementObscured(element) {
      try {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const elementAtPoint = document.elementFromPoint(centerX, centerY);
        
        // 如果點擊位置的元素是自己或其子元素，則沒有被遮擋
        return elementAtPoint !== element && !element.contains(elementAtPoint);
      } catch {
        return false; // 發生錯誤時假設沒有被遮擋
      }
    }

    /**
     * 點擊元素 (Enhanced with improved safety and tracking)
     */
    clickElement(element, buttonType) {
      const startTime = Date.now();
      let clickSuccess = false;
      
      try {
        // Pre-click validation
        if (!this.preClickValidation(element, buttonType)) {
          return false;
        }

        const elementKey = this.getElementKey(element);
        const now = Date.now();

        // 記錄點擊前狀態
        this.recordPreClickState(element, buttonType, elementKey, now);

        // 執行點擊操作
        clickSuccess = this.performClick(element, buttonType);

        if (clickSuccess) {
          // 點擊成功後的處理
          this.handleClickSuccess(element, buttonType, elementKey, now);
          
          // 延遲清理處理過的元素
          this.scheduleElementCleanup(element, buttonType);
        } else {
          // 點擊失敗的處理
          this.handleClickFailure(element, buttonType, elementKey);
        }

        return clickSuccess;
      } catch (error) {
        this.handleClickError(element, buttonType, error, startTime);
        return false;
      }
    }

    /**
     * 點擊前最終驗證
     */
    preClickValidation(element, buttonType) {
      // 最後一次確認元素仍然可點擊
      if (!element.isConnected || !this.elementFinder.isElementVisible(element)) {
        console.log(`[KiroAssist] Pre-click validation failed: element not valid`);
        return false;
      }

      // 檢查是否有其他點擊正在進行
      if (this.isClickInProgress) {
        console.log(`[KiroAssist] Pre-click validation failed: another click in progress`);
        return false;
      }

      return true;
    }

    /**
     * 記錄點擊前狀態
     */
    recordPreClickState(element, buttonType, elementKey, timestamp) {
      this.isClickInProgress = true;
      this.lastClickTime = timestamp;
      
      if (elementKey) {
        this.recentClicks.set(elementKey, timestamp);
      }
      
      this.processedElements.add(element);
      
      // 記錄詳細的點擊資訊
      console.log(`[KiroAssist] Recording click state for ${buttonType} button at ${new Date(timestamp).toISOString()}`);
    }

    /**
     * 執行實際的點擊操作
     */
    performClick(element, buttonType) {
      try {
        // 滾動到元素位置確保可見
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // 給一點時間讓滾動完成
        setTimeout(() => {
          // 觸發多種事件以確保相容性
          this.triggerClickEvents(element);
        }, 100);

        return true;
      } catch (error) {
        console.error(`[KiroAssist] Click execution failed:`, error);
        return false;
      }
    }

    /**
     * 觸發點擊事件
     */
    triggerClickEvents(element) {
      // 觸發多個事件以確保最大相容性
      const events = ['mousedown', 'mouseup', 'click'];
      
      events.forEach(eventType => {
        try {
          const event = new MouseEvent(eventType, {
            bubbles: true,
            cancelable: true,
            view: window,
            button: 0,
            buttons: 1,
            clientX: element.getBoundingClientRect().left + element.getBoundingClientRect().width / 2,
            clientY: element.getBoundingClientRect().top + element.getBoundingClientRect().height / 2
          });
          element.dispatchEvent(event);
        } catch (error) {
          console.warn(`[KiroAssist] Failed to trigger ${eventType} event:`, error);
        }
      });

      // 備用的直接點擊
      try {
        element.click();
      } catch (error) {
        console.warn(`[KiroAssist] Direct click failed:`, error);
      }
    }

    /**
     * 處理點擊成功
     */
    handleClickSuccess(element, buttonType, elementKey, timestamp) {
      // 更新統計
      this.totalClicks++;
      const moduleKey = buttonType === 'retry' ? 'retryButton' : 'kiroSnackbar';
      this.moduleStats[moduleKey]++;

      // 更新面板狀態
      this.updatePanelStatus();
      
      // 記錄成功日誌
      this.log(`已自動點擊 ${buttonType} 按鈕 (#${this.totalClicks})`, "success");
      
      // 額外的成功處理邏輯
      const pattern = BUTTON_PATTERNS[buttonType];
      if (pattern?.extraTime) {
        // 對於需要額外時間的按鈕，延長冷卻期
        if (elementKey) {
          this.recentClicks.set(elementKey, timestamp + pattern.extraTime);
        }
      }

      console.log(`[KiroAssist] Click success - ${buttonType} button, total clicks: ${this.totalClicks}`);
    }

    /**
     * 處理點擊失敗
     */
    handleClickFailure(element, buttonType, elementKey) {
      // 從處理列表中移除，允許重試
      this.processedElements.delete(element);
      if (elementKey) {
        this.recentClicks.delete(elementKey);
      }
      
      this.log(`點擊 ${buttonType} 按鈕失敗`, "error");
      console.log(`[KiroAssist] Click failed for ${buttonType} button`);
    }

    /**
     * 處理點擊錯誤
     */
    handleClickError(element, buttonType, error, startTime) {
      const duration = Date.now() - startTime;
      this.log(`點擊${buttonType}失敗：${error.message} (耗時: ${duration}ms)`, "error");
      console.error(`[KiroAssist] Click error for ${buttonType}:`, error);
      
      // 清理狀態
      this.processedElements.delete(element);
      const elementKey = this.getElementKey(element);
      if (elementKey) {
        this.recentClicks.delete(elementKey);
      }
    }

    /**
     * 排程元素清理
     */
    scheduleElementCleanup(element, buttonType) {
      const pattern = BUTTON_PATTERNS[buttonType];
      const cleanupDelay = pattern?.extraTime ? pattern.extraTime + 1000 : 3000;
      
      setTimeout(() => {
        this.processedElements.delete(element);
        this.isClickInProgress = false;
        console.log(`[KiroAssist] Cleaned up processed element for ${buttonType}`);
      }, cleanupDelay);
    }


    /**
     * 創建控制面板
     */
    createControlPanel() {
      if (this.controlPanel) return;

      this.controlPanel = document.createElement("div");
      this.controlPanel.id = "kiro-assist-panel";
      
      this.createPanelStructure();
      this.addPanelStyles();
      this.setupPanelEvents();
      
      document.body.appendChild(this.controlPanel);
    }

    /**
     * 創建面板結構
     */
    createPanelStructure() {
      // 標題區域
      const header = document.createElement("div");
      header.className = "prc-header";
      
      const titleContent = document.createElement("div");
      titleContent.className = "prc-title-content";
      
      const titleIcon = createSVGIcon('refresh', 'prc-title-icon');
      
      const titleText = document.createElement("span");
      titleText.className = "prc-title-text";
      titleText.textContent = "KiroAssist";

      titleContent.appendChild(titleIcon);
      titleContent.appendChild(titleText);

      // 控制按鈕
      const headerControls = document.createElement("div");
      headerControls.className = "prc-header-controls";
      
      const minimizeBtn = document.createElement("button");
      minimizeBtn.className = "prc-control-btn prc-minimize";
      minimizeBtn.appendChild(createSVGIcon('minimize'));
      minimizeBtn.onclick = () => this.toggleMinimize();
      
      const closeBtn = document.createElement("button");
      closeBtn.className = "prc-control-btn prc-close";
      closeBtn.appendChild(createSVGIcon('close'));
      closeBtn.onclick = () => this.hidePanel();

      headerControls.appendChild(minimizeBtn);
      headerControls.appendChild(closeBtn);
      header.appendChild(titleContent);
      header.appendChild(headerControls);

      // 主內容區域
      const content = document.createElement("div");
      content.className = "prc-content";

      // 狀態卡片
      const statusCard = document.createElement("div");
      statusCard.className = "prc-status-card";
      
      const statusIcon = document.createElement("div");
      statusIcon.className = "prc-status-icon";
      statusIcon.appendChild(createSVGIcon('clock'));
      
      const statusContent = document.createElement("div");
      statusContent.className = "prc-status-content";
      
      const statusText = document.createElement("div");
      statusText.className = "prc-status-text";
      statusText.textContent = "已停止";
      
      const statusSubtext = document.createElement("div");
      statusSubtext.className = "prc-status-subtext";
      statusSubtext.textContent = "等待開始監控";
      
      const clicksCounter = document.createElement("div");
      clicksCounter.className = "prc-clicks-counter";
      
      const clicksIcon = createSVGIcon('barChart', 'prc-clicks-icon');
      
      const clicksInfo = document.createElement("div");
      clicksInfo.className = "prc-clicks-info";
      
      const clicksNumber = document.createElement("span");
      clicksNumber.className = "prc-clicks-number";
      clicksNumber.textContent = "0";
      
      const clicksLabel = document.createElement("span");
      clicksLabel.className = "prc-clicks-label";
      clicksLabel.textContent = "次點擊";

      statusContent.appendChild(statusText);
      statusContent.appendChild(statusSubtext);
      clicksInfo.appendChild(clicksNumber);
      clicksInfo.appendChild(clicksLabel);
      clicksCounter.appendChild(clicksIcon);
      clicksCounter.appendChild(clicksInfo);
      statusCard.appendChild(statusIcon);
      statusCard.appendChild(statusContent);
      statusCard.appendChild(clicksCounter);

      // 控制按鈕區域
      const controlsSection = document.createElement("div");
      controlsSection.className = "prc-controls-section";
      
      const startBtn = document.createElement("button");
      startBtn.className = "prc-action-btn prc-start-btn";
      
      const startIcon = createSVGIcon('play', 'prc-btn-icon');
      const startText = document.createElement("span");
      startText.className = "prc-btn-text";
      startText.textContent = "開始";
      
      startBtn.appendChild(startIcon);
      startBtn.appendChild(startText);
      startBtn.onclick = () => this.start();
      
      const stopBtn = document.createElement("button");
      stopBtn.className = "prc-action-btn prc-stop-btn";
      
      const stopIcon = createSVGIcon('stop', 'prc-btn-icon');
      const stopText = document.createElement("span");
      stopText.className = "prc-btn-text";
      stopText.textContent = "停止";
      
      stopBtn.appendChild(stopIcon);
      stopBtn.appendChild(stopText);
      stopBtn.disabled = true;
      stopBtn.onclick = () => this.stop();

      const settingsBtn = document.createElement("button");
      settingsBtn.className = "prc-action-btn prc-settings-btn";
      
      const settingsIcon = createSVGIcon('settings', 'prc-btn-icon');
      const settingsText = document.createElement("span");
      settingsText.className = "prc-btn-text";
      settingsText.textContent = "設定";
      
      settingsBtn.appendChild(settingsIcon);
      settingsBtn.appendChild(settingsText);
      settingsBtn.onclick = () => this.toggleSettings();

      controlsSection.appendChild(startBtn);
      controlsSection.appendChild(stopBtn);
      controlsSection.appendChild(settingsBtn);

      // 日誌區域
      const logSection = document.createElement("div");
      logSection.className = "prc-log-section";
      
      const logHeader = document.createElement("div");
      logHeader.className = "prc-log-header";
      
      const logIcon = createSVGIcon('fileText', 'prc-log-icon');
      const logTitle = document.createElement("span");
      logTitle.className = "prc-log-title";
      logTitle.textContent = "活動記錄";
      
      logHeader.appendChild(logIcon);
      logHeader.appendChild(logTitle);
      
      const logContainer = document.createElement("div");
      logContainer.className = "prc-log-container";

      logSection.appendChild(logHeader);
      logSection.appendChild(logContainer);

      // 作者卡片
      const authorCard = document.createElement("div");
      authorCard.className = "prc-author-card";
      
      const authorAvatar = document.createElement("div");
      authorAvatar.className = "prc-author-avatar";
      authorAvatar.appendChild(createSVGIcon('user'));
      
      const authorInfo = document.createElement("div");
      authorInfo.className = "prc-author-info";
      
      const authorName = document.createElement("div");
      authorName.className = "prc-author-name";
      authorName.textContent = "azlife_1224";
      
      const authorPlatform = document.createElement("div");
      authorPlatform.className = "prc-author-platform";
      authorPlatform.textContent = "Threads";
      
      const authorLink = document.createElement("a");
      authorLink.className = "prc-author-link";
      authorLink.href = "https://www.threads.net/@azlife_1224";
      authorLink.target = "_blank";
      
      const linkIcon = createSVGIcon('externalLink', 'prc-link-icon');
      const linkText = document.createElement("span");
      linkText.className = "prc-link-text";
      linkText.textContent = "作者";
      
      authorLink.appendChild(linkIcon);
      authorLink.appendChild(linkText);

      authorInfo.appendChild(authorName);
      authorInfo.appendChild(authorPlatform);
      authorCard.appendChild(authorAvatar);
      authorCard.appendChild(authorInfo);
      authorCard.appendChild(authorLink);

      // 設定面板（隱藏）
      const settingsPanel = document.createElement("div");
      settingsPanel.className = "prc-settings-panel";
      settingsPanel.style.display = "none";
      
      const settingsHeader = document.createElement("div");
      settingsHeader.className = "prc-settings-header";
      
      const settingsHeaderIcon = createSVGIcon('package', 'prc-settings-icon');
      const settingsHeaderTitle = document.createElement("span");
      settingsHeaderTitle.className = "prc-settings-title";
      settingsHeaderTitle.textContent = "模組設定";
      
      settingsHeader.appendChild(settingsHeaderIcon);
      settingsHeader.appendChild(settingsHeaderTitle);
      
      const settingsContent = document.createElement("div");
      settingsContent.className = "prc-settings-content";
      
      // 為每個模組創建設定項
      Object.entries(this.moduleConfig).forEach(([moduleKey, moduleInfo]) => {
        const moduleItem = document.createElement("div");
        moduleItem.className = "prc-module-item";
        
        const moduleSwitch = document.createElement("label");
        moduleSwitch.className = "prc-module-switch";
        
        const moduleCheckbox = document.createElement("input");
        moduleCheckbox.type = "checkbox";
        moduleCheckbox.checked = moduleInfo.enabled;
        moduleCheckbox.className = "prc-module-checkbox";
        moduleCheckbox.onchange = () => {
          this.moduleConfig[moduleKey].enabled = moduleCheckbox.checked;
          this.updateModuleStats();
          this.log(`${moduleInfo.name} ${moduleCheckbox.checked ? '已啟用' : '已停用'}`, "info");
        };
        
        const moduleSlider = document.createElement("span");
        moduleSlider.className = "prc-module-slider";
        
        const moduleInfo_el = document.createElement("div");
        moduleInfo_el.className = "prc-module-info";
        
        const moduleName = document.createElement("div");
        moduleName.className = "prc-module-name";
        moduleName.textContent = moduleInfo.name;
        
        const moduleDesc = document.createElement("div");
        moduleDesc.className = "prc-module-desc";
        moduleDesc.textContent = moduleInfo.description;
        
        const moduleCount = document.createElement("div");
        moduleCount.className = "prc-module-count";
        moduleCount.textContent = `已執行: ${this.moduleStats[moduleKey]}次`;
        
        moduleSwitch.appendChild(moduleCheckbox);
        moduleSwitch.appendChild(moduleSlider);
        
        moduleInfo_el.appendChild(moduleName);
        moduleInfo_el.appendChild(moduleDesc);
        moduleInfo_el.appendChild(moduleCount);
        
        moduleItem.appendChild(moduleSwitch);
        moduleItem.appendChild(moduleInfo_el);
        
        settingsContent.appendChild(moduleItem);
      });
      
      settingsPanel.appendChild(settingsHeader);
      settingsPanel.appendChild(settingsContent);

      // 組裝內容
      content.appendChild(statusCard);
      content.appendChild(controlsSection);
      content.appendChild(settingsPanel);
      content.appendChild(logSection);
      content.appendChild(authorCard);

      // 組裝面板
      this.controlPanel.appendChild(header);
      this.controlPanel.appendChild(content);
    }

    /**
     * 添加面板樣式 - 專業App風格
     */
    addPanelStyles() {
      if (document.getElementById("kiro-assist-styles")) return;

      const style = document.createElement("style");
      style.id = "kiro-assist-styles";
      style.textContent = `
        /* ===== 基礎SVG圖標樣式 ===== */
        .crc-icon svg, .prc-icon svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .crc-icon, .prc-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ===== 主面板樣式 ===== */
        #kiro-assist-panel {
          position: fixed;
          top: 120px;
          right: 24px;
          width: 340px;
          background: linear-gradient(145deg, #211d25 0%, #28242e 100%);
          border: 1px solid rgba(176, 128, 255, 0.15);
          border-radius: 20px;
          box-shadow: 
            0 24px 48px rgba(0, 0, 0, 0.5),
            0 12px 24px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif);
          font-size: 13px;
          color: #ffffff;
          z-index: 999999;
          user-select: none;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(24px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        /* ===== 標題區域 ===== */
        .prc-header {
          background: linear-gradient(135deg, #b080ff 0%, #9e61ff 100%);
          padding: 18px 24px;
          border-radius: 19px 19px 0 0;
          cursor: move;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .prc-header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.08), transparent);
          animation: shimmer 4s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(30deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(30deg); }
        }

        .prc-title-content {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .prc-title-icon {
          width: 20px;
          height: 20px;
          color: white;
          animation: rotateRefresh 3s linear infinite;
        }

        @keyframes rotateRefresh {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .prc-title-text {
          font-weight: 700;
          font-size: 17px;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.5px;
        }

        .prc-header-controls {
          display: flex;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .prc-control-btn {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .prc-control-btn .crc-icon,
        .prc-control-btn .prc-icon {
          width: 16px;
          height: 16px;
          color: white;
          transition: transform 0.2s ease;
        }

        .prc-control-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .prc-control-btn:hover .crc-icon,
        .prc-control-btn:hover .prc-icon {
          transform: scale(1.1);
        }

        .prc-close:hover {
          background: rgba(239, 68, 68, 0.8);
          border-color: rgba(239, 68, 68, 0.5);
        }

        /* ===== 內容區域 ===== */
        .prc-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ===== 狀態卡片 ===== */
        .prc-status-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .prc-status-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(176, 128, 255, 0.08), transparent);
          transition: left 0.6s ease;
        }

        .prc-status-card:hover::before {
          left: 100%;
        }

        .prc-status-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #b080ff, #9e61ff);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(176, 128, 255, 0.25);
          position: relative;
          z-index: 1;
        }

        .prc-status-icon .crc-icon,
        .prc-status-icon .prc-icon {
          width: 24px;
          height: 24px;
          color: white;
        }

        .prc-status-content {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .prc-status-text {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
          letter-spacing: -0.3px;
        }

        .prc-status-text.running {
          color: #10b981;
        }

        .prc-status-text.stopped {
          color: #ef4444;
        }

        .prc-status-subtext {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .prc-clicks-counter {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(176, 128, 255, 0.08);
          border: 1px solid rgba(176, 128, 255, 0.15);
          border-radius: 12px;
          padding: 12px 16px;
          position: relative;
          z-index: 1;
        }

        .prc-clicks-icon {
          width: 20px;
          height: 20px;
          color: #b080ff;
        }

        .prc-clicks-info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .prc-clicks-number {
          font-size: 20px;
          font-weight: 800;
          color: #b080ff;
          line-height: 1;
          letter-spacing: -0.5px;
        }

        .prc-clicks-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
          margin-top: 2px;
        }

        /* ===== 控制按鈕區域 ===== */
        .prc-controls-section {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .prc-action-btn {
          padding: 16px 20px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          letter-spacing: -0.3px;
        }

        .prc-action-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          transition: all 0.4s ease;
          transform: translate(-50%, -50%);
        }

        .prc-action-btn:hover::before {
          width: 120%;
          height: 120%;
        }

        .prc-btn-icon {
          width: 18px;
          height: 18px;
          position: relative;
          z-index: 1;
        }

        .prc-btn-text {
          position: relative;
          z-index: 1;
        }

        .prc-start-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.25);
        }

        .prc-start-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
        }

        .prc-stop-btn {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.25);
        }

        .prc-stop-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.35);
        }

        .prc-settings-btn {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          color: white;
          box-shadow: 0 6px 16px rgba(139, 92, 246, 0.25);
        }

        .prc-settings-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.35);
        }

        .prc-action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        /* ===== 設定面板 ===== */
        .prc-settings-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .prc-settings-header {
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .prc-settings-icon {
          width: 18px;
          height: 18px;
          color: #8b5cf6;
        }

        .prc-settings-title {
          font-weight: 700;
          color: #8b5cf6;
          font-size: 14px;
          letter-spacing: -0.3px;
        }

        .prc-settings-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .prc-module-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .prc-module-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(139, 92, 246, 0.2);
        }

        .prc-module-switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
          cursor: pointer;
        }

        .prc-module-checkbox {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .prc-module-slider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.1);
          transition: 0.3s;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .prc-module-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 2px;
          bottom: 2px;
          background-color: #ffffff;
          transition: 0.3s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .prc-module-checkbox:checked + .prc-module-slider {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          border-color: #8b5cf6;
        }

        .prc-module-checkbox:checked + .prc-module-slider:before {
          transform: translateX(24px);
        }

        .prc-module-info {
          flex: 1;
        }

        .prc-module-name {
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .prc-module-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 6px;
          line-height: 1.4;
        }

        .prc-module-count {
          font-size: 11px;
          color: #8b5cf6;
          font-weight: 600;
        }

        /* ===== 日誌區域 ===== */
        .prc-log-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
        }

        .prc-log-header {
          background: linear-gradient(90deg, rgba(176, 128, 255, 0.08) 0%, rgba(176, 128, 255, 0.04) 100%);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .prc-log-icon {
          width: 18px;
          height: 18px;
          color: #b080ff;
        }

        .prc-log-title {
          font-weight: 700;
          color: #b080ff;
          font-size: 14px;
          letter-spacing: -0.3px;
        }

        .prc-log-container {
          padding: 16px 20px;
          height: 140px;
          overflow-y: auto;
          font-size: 12px;
          line-height: 1.6;
        }

        .prc-log-container::-webkit-scrollbar {
          width: 8px;
        }

        .prc-log-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
        }

        .prc-log-container::-webkit-scrollbar-thumb {
          background: rgba(176, 128, 255, 0.2);
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        .prc-log-container::-webkit-scrollbar-thumb:hover {
          background: rgba(176, 128, 255, 0.4);
        }

        .prc-log-entry {
          margin-bottom: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          border-left: 3px solid transparent;
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.3s ease;
          animation: fadeInUp 0.4s ease;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-weight: 500;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .prc-log-entry .prc-log-type-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .prc-log-entry.success {
          color: #10b981;
          border-left-color: #10b981;
          background: rgba(16, 185, 129, 0.08);
        }

        .prc-log-entry.success .prc-log-type-icon {
          color: #10b981;
        }

        .prc-log-entry.error {
          color: #ef4444;
          border-left-color: #ef4444;
          background: rgba(239, 68, 68, 0.08);
        }

        .prc-log-entry.error .prc-log-type-icon {
          color: #ef4444;
        }

        .prc-log-entry.info {
          color: #3b82f6;
          border-left-color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
        }

        .prc-log-entry.info .prc-log-type-icon {
          color: #3b82f6;
        }

        /* ===== 作者卡片 ===== */
        .prc-author-card {
          background: linear-gradient(135deg, rgba(176, 128, 255, 0.08) 0%, rgba(176, 128, 255, 0.04) 100%);
          border: 1px solid rgba(176, 128, 255, 0.15);
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .prc-author-card:hover {
          background: linear-gradient(135deg, rgba(176, 128, 255, 0.12) 0%, rgba(176, 128, 255, 0.06) 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(176, 128, 255, 0.15);
        }

        .prc-author-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #b080ff, #9e61ff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(176, 128, 255, 0.25);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .prc-author-avatar .crc-icon,
        .prc-author-avatar .prc-icon {
          width: 24px;
          height: 24px;
          color: white;
        }

        .prc-author-info {
          flex: 1;
        }

        .prc-author-name {
          font-weight: 700;
          color: #b080ff;
          margin-bottom: 2px;
          font-size: 15px;
          letter-spacing: -0.3px;
        }

        .prc-author-platform {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .prc-author-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(176, 128, 255, 0.08);
          border: 1px solid rgba(176, 128, 255, 0.15);
          border-radius: 12px;
          color: #b080ff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          transition: all 0.3s ease;
          letter-spacing: -0.2px;
        }

        .prc-author-link:hover {
          background: rgba(176, 128, 255, 0.15);
          transform: scale(1.02);
          color: #8dc8fb;
          border-color: rgba(176, 128, 255, 0.25);
        }

        .prc-link-icon {
          width: 14px;
          height: 14px;
        }

        /* ===== 最小化狀態 ===== */
        #kiro-assist-panel.prc-minimized .prc-content {
          display: none;
        }

        #kiro-assist-panel.prc-minimized {
          width: 220px;
        }

        /* ===== 響應式設計 ===== */
        @media (max-width: 480px) {
          #kiro-assist-panel {
            width: 300px;
            right: 16px;
          }
        }

        /* ===== 特殊效果 ===== */
        .prc-pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }

        .prc-bounce {
          animation: bounce 0.6s ease;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-4px) scale(1.05); }
          60% { transform: translateY(-2px) scale(1.02); }
        }

        .prc-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 6px 16px rgba(176, 128, 255, 0.25); }
          to { box-shadow: 0 6px 24px rgba(176, 128, 255, 0.4); }
        }
      `;

      document.head.appendChild(style);
    }

    /**
     * 設置面板事件
     */
    setupPanelEvents() {
      // 拖曳功能
      const header = this.controlPanel.querySelector(".prc-header");
      let isDragging = false;
      let dragOffset = { x: 0, y: 0 };

      header.addEventListener("mousedown", (e) => {
        if (e.target.closest(".prc-control-btn")) return;
        
        isDragging = true;
        const rect = this.controlPanel.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        e.preventDefault();
        
        this.controlPanel.style.transition = "none";
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        
        const x = e.clientX - dragOffset.x;
        const y = e.clientY - dragOffset.y;
        
        this.controlPanel.style.left = Math.max(0, Math.min(
          window.innerWidth - this.controlPanel.offsetWidth, x
        )) + "px";
        this.controlPanel.style.top = Math.max(0, Math.min(
          window.innerHeight - this.controlPanel.offsetHeight, y
        )) + "px";
        this.controlPanel.style.right = "auto";
      });

      document.addEventListener("mouseup", () => {
        if (isDragging) {
          isDragging = false;
          this.controlPanel.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        }
      });
    }

    /**
     * 開始自動點擊
     */
    start() {
      if (this.isRunning) return;

      this.isRunning = true;
      this.domWatcher.start();
      this.checkAndClickButtons(); // 立即檢查一次

      this.updatePanelStatus();
      this.updateModuleStats();
      this.log("已開始智能監控", "success");
      
      // 更新狀態圖標
      const statusIcon = this.controlPanel.querySelector(".prc-status-icon");
      while (statusIcon.firstChild) {
        statusIcon.removeChild(statusIcon.firstChild);
      }
      statusIcon.appendChild(createSVGIcon('activity'));
      statusIcon.classList.add("prc-pulse", "prc-glow");
    }

    /**
     * 停止自動點擊
     */
    stop() {
      if (!this.isRunning) return;

      this.isRunning = false;
      this.domWatcher.stop();

      this.updatePanelStatus();
      this.log("已停止智能監控", "info");
      
      // 更新狀態圖標
      const statusIcon = this.controlPanel.querySelector(".prc-status-icon");
      while (statusIcon.firstChild) {
        statusIcon.removeChild(statusIcon.firstChild);
      }
      statusIcon.appendChild(createSVGIcon('clock'));
      statusIcon.classList.remove("prc-pulse", "prc-glow");
    }

    /**
     * 更新面板狀態
     */
    updatePanelStatus() {
      const statusText = this.controlPanel?.querySelector(".prc-status-text");
      const statusSubtext = this.controlPanel?.querySelector(".prc-status-subtext");
      const clicksNumber = this.controlPanel?.querySelector(".prc-clicks-number");
      const startBtn = this.controlPanel?.querySelector(".prc-start-btn");
      const stopBtn = this.controlPanel?.querySelector(".prc-stop-btn");

      if (statusText) {
        statusText.textContent = this.isRunning ? "監控中" : "已停止";
        statusText.className = `prc-status-text ${this.isRunning ? "running" : "stopped"}`;
      }

      if (statusSubtext) {
        const enabledCount = Object.values(this.moduleConfig).filter(m => m.enabled).length;
        statusSubtext.textContent = this.isRunning 
          ? `正在監控 ${enabledCount} 個模組` 
          : "等待開始監控";
      }

      if (clicksNumber) {
        clicksNumber.textContent = this.totalClicks;
        if (this.totalClicks > 0) {
          clicksNumber.classList.add("prc-bounce");
          setTimeout(() => clicksNumber.classList.remove("prc-bounce"), 600);
        }
      }

      if (startBtn) startBtn.disabled = this.isRunning;
      if (stopBtn) stopBtn.disabled = !this.isRunning;
      
      // 更新模組統計
      this.updateModuleStats();
    }

    /**
     * 切換設定面板
     */
    toggleSettings() {
      const settingsPanel = this.controlPanel?.querySelector(".prc-settings-panel");
      if (!settingsPanel) return;

      const isVisible = settingsPanel.style.display !== "none";
      settingsPanel.style.display = isVisible ? "none" : "block";
      
      this.log(`設定面板已${isVisible ? '隱藏' : '顯示'}`, "info");
    }

    /**
     * 更新模組統計
     */
    updateModuleStats() {
      const moduleItems = this.controlPanel?.querySelectorAll(".prc-module-item");
      if (!moduleItems) return;

      Object.entries(this.moduleConfig).forEach(([moduleKey, moduleInfo], index) => {
        const moduleItem = moduleItems[index];
        if (moduleItem) {
          const countElement = moduleItem.querySelector(".prc-module-count");
          if (countElement) {
            countElement.textContent = `已執行: ${this.moduleStats[moduleKey]}次`;
          }
        }
      });
    }

    /**
     * 切換最小化
     */
    toggleMinimize() {
      const isMinimized = this.controlPanel.classList.contains("prc-minimized");
      
      if (isMinimized) {
        this.controlPanel.classList.remove("prc-minimized");
        this.log("面板已展開", "info");
      } else {
        this.controlPanel.classList.add("prc-minimized");
        this.log("面板已收折", "info");
      }
    }

    /**
     * 隱藏面板
     */
    hidePanel() {
      this.controlPanel.style.display = "none";
      this.log("面板已隱藏", "info");
    }

    /**
     * 顯示面板
     */
    showPanel() {
      this.controlPanel.style.display = "flex";
    }

    /**
     * 記錄日誌
     */
    log(message, type = "info") {
      console.log(`[KiroAssist] ${message}`);
      
      const logContainer = this.controlPanel?.querySelector(".prc-log-container");
      if (!logContainer) return;

      const logEntry = document.createElement("div");
      logEntry.className = `prc-log-entry ${type}`;
      
      // 添加對應的圖標
      let iconName = 'info';
      if (type === 'success') iconName = 'checkCircle';
      else if (type === 'error') iconName = 'xCircle';
      else if (type === 'info') iconName = 'info';
      
      const typeIcon = createSVGIcon(iconName, 'prc-log-type-icon');
      if (typeIcon) {
        logEntry.appendChild(typeIcon);
      }
      
      // 添加日誌文本
      const logText = document.createElement("span");
      logText.textContent = `${new Date().toLocaleTimeString()} ${message}`;
      logEntry.appendChild(logText);

      logContainer.appendChild(logEntry);
      logContainer.scrollTop = logContainer.scrollHeight;

      // 保持最多 50 條日誌
      while (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.firstChild);
      }
    }

    /**
     * 獲取狀態
     */
    getStatus() {
      return {
        isRunning: this.isRunning,
        totalClicks: this.totalClicks,
        version: this.version,
        moduleConfig: this.moduleConfig,
        moduleStats: this.moduleStats,
        enabledModules: Object.entries(this.moduleConfig)
          .filter(([key, config]) => config.enabled)
          .map(([key, config]) => config.name)
      };
    }
  }

  // 創建實例
  const kiroAssist = new KiroAssist();

  // 設定全域API
  window.KiroAssist = kiroAssist;
  window.startKiroAssist = () => kiroAssist.start();
  window.stopKiroAssist = () => kiroAssist.stop();
  window.kiroAssistStatus = () => kiroAssist.getStatus();

  // 向後相容的API
  window.AutoRetryClicker = kiroAssist;
  window.startRetryClicker = () => kiroAssist.start();
  window.stopRetryClicker = () => kiroAssist.stop();
  window.retryClickerStatus = () => kiroAssist.getStatus();

  console.log("✨ KiroAssist v3.1.2 (智能助手專業版) 已載入！");
  console.log("🎛️ 新API: startKiroAssist(), stopKiroAssist(), kiroAssistStatus()");
  console.log("🔄 舊API: startRetryClicker(), stopRetryClicker(), retryClickerStatus() (向後相容)");
  console.log("👨‍💻 作者: threads:azlife_1224");
  console.log("🎯 功能: 智能檢測Retry按鈕 + Kiro Snackbar自動點擊");
  console.log("⚙️ 新增: 模組化設定面板，可獨立開關各功能");
  console.log("🎨 採用專業App風格SVG圖標系統");
})();