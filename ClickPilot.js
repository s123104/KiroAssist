/**
 * 📦 模組：KiroAssist v3.0.2 - 智能助手專業版
 * 🕒 最後更新：2025-07-17T17:00:00+08:00
 * 🧑‍💻 作者：threads:azlife_1224
 * 🔢 版本：v3.0.2
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
   * 🎯 按鈕檢測配置 - 支援多種按鈕類型
   */
  const BUTTON_SELECTORS = {
    // Retry按鈕選擇器
    retry: [
      'button.kiro-button[data-variant="secondary"]:contains("Retry")',
      'button.kiro-button:contains("Retry")',
      'button[data-variant="secondary"]:contains("Retry")',
      'button:contains("Retry")',
      'button[aria-label*="retry" i]',
      'button[title*="retry" i]',
      '[role="button"]:contains("Retry")',
      '[onclick*="retry" i]',
      '.retry-button, .btn-retry',
      'button:contains("重試")',
      'button:contains("重新嘗試")',
      'button:contains("再試一次")',
    ],
    
    // Kiro Snackbar Run按鈕選擇器
    kiroSnackbarRun: [
      '.kiro-snackbar-actions button.kiro-button[data-variant="primary"]:contains("Run")',
      '.kiro-snackbar-actions button[data-variant="primary"]:contains("Run")',
      '.kiro-snackbar .kiro-button[data-variant="primary"]:contains("Run")',
      '.kiro-snackbar-actions button:contains("Run")',
      '.kiro-snackbar button[data-purpose="alert"]:contains("Run")',
      '.kiro-snackbar button.kiro-button:contains("Run")',
    ],
    
    // Kiro Snackbar容器選擇器
    kiroSnackbarContainer: [
      '.kiro-snackbar',
      '.kiro-snackbar-container',
      '.kiro-snackbar-container.needs-attention',
      'div[class*="kiro-snackbar"]',
    ]
  };

  /**
   * 🔬 DOM 監視器
   */
  class DOMWatcher {
    constructor(callback) {
      this.callback = callback;
      this.observer = null;
      this.isWatching = false;
      this.debounceTimer = null;
      this.debounceDelay = 500; // 500ms 防抖
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
        attributeFilter: ["class", "style", "data-active", "data-loading", "disabled"],
      };

      this.observer.observe(document.body, config);
      this.isWatching = true;
      console.log("[DOMWatcher] 🔍 開始監視DOM變化");
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
          this.callback();
        }, this.debounceDelay);
      }
    }

    isRelevantMutation(mutation) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (this.hasRetryContent(node)) {
              return true;
            }
          }
        }
      }

      if (mutation.type === "attributes") {
        const target = mutation.target;
        if (target.nodeType === Node.ELEMENT_NODE) {
          return this.hasRetryContent(target);
        }
      }

      return false;
    }

    hasRetryContent(element) {
      const text = element.textContent?.toLowerCase() || "";
      const className = element.className || "";
      
      // 檢查是否為Retry按鈕
      const isRetryButton = (
        text.includes("retry") ||
        text.includes("重試") ||
        text.includes("重新嘗試") ||
        className.includes("retry")
      );
      
      // 檢查是否為kiro-button
      const isKiroButton = className.includes("kiro-button");
      
      // 檢查是否為kiro-snackbar相關
      const isKiroSnackbar = (
        className.includes("kiro-snackbar") ||
        text.includes("waiting on your input") ||
        text.includes("run") ||
        text.includes("trust") ||
        text.includes("reject")
      );
      
      // 檢查是否有data-variant屬性
      const hasVariantAttribute = element.hasAttribute && (
        element.hasAttribute("data-variant") ||
        element.hasAttribute("data-purpose") ||
        element.hasAttribute("data-active")
      );
      
      return isRetryButton || isKiroButton || isKiroSnackbar || hasVariantAttribute;
    }
  }

  /**
   * 🎪 主控制器類別 - KiroAssist智能助手
   */
  class KiroAssist {
    constructor() {
      this.version = "4.0.0";
      this.isRunning = false;
      this.totalClicks = 0;
      this.lastClickTime = 0;
      this.minClickInterval = 2000; // 最小點擊間隔 2 秒
      this.clickedButtons = new WeakSet(); // 追蹤已點擊的按鈕

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
      this.domWatcher = new DOMWatcher(() => this.checkAndClickButtons());
      this.controlPanel = null;

      this.createControlPanel();
      this.log("🚀 KiroAssist v3.0.2 已初始化", "success");
    }

    /**
     * 檢查並點擊各種按鈕
     */
    checkAndClickButtons() {
      if (!this.isRunning) return;

      try {
        // 檢查Retry按鈕
        if (this.moduleConfig.retryButton.enabled) {
          const retryButton = this.findRetryButton();
          if (retryButton && this.canClickButton(retryButton)) {
            this.clickButton(retryButton, "retryButton", "Retry");
          }
        }

        // 檢查Kiro Snackbar Run按鈕
        if (this.moduleConfig.kiroSnackbar.enabled) {
          const kiroRunButton = this.findKiroSnackbarRunButton();
          if (kiroRunButton && this.canClickButton(kiroRunButton)) {
            this.clickButton(kiroRunButton, "kiroSnackbar", "Kiro Snackbar Run");
          }
        }
      } catch (error) {
        this.log(`執行時出錯：${error.message}`, "error");
        console.error("[KiroAssist] 詳細錯誤:", error);
      }
    }

    /**
     * 尋找Retry按鈕
     */
    findRetryButton() {
      const button = this.findButtonBySelectors(BUTTON_SELECTORS.retry, "retry");
      if (button) {
        console.log("[KiroAssist] 找到 Retry 按鈕:", button);
      }
      return button;
    }

    /**
     * 尋找Kiro Snackbar Run按鈕
     */
    findKiroSnackbarRunButton() {
      // 首先檢查是否存在Kiro Snackbar容器
      const snackbarContainer = this.findElementBySelectors(BUTTON_SELECTORS.kiroSnackbarContainer);
      if (!snackbarContainer) {
        return null;
      }

      // 檢查容器是否包含"Waiting on your input"文字
      const waitingText = snackbarContainer.querySelector('.thinking-text[data-is-thinking="true"]');
      const hasWaitingText = waitingText && waitingText.textContent.includes("Waiting on your input");
      
      // 也檢查是否包含"needs-attention"類別
      const hasNeedsAttention = snackbarContainer.classList.contains('needs-attention') || 
                               snackbarContainer.querySelector('.needs-attention');
      
      // 如果沒有等待輸入的文字且不是需要注意的通知，就跳過
      if (!hasWaitingText && !hasNeedsAttention) {
        return null;
      }

      // 在容器內尋找Run按鈕
      const button = this.findButtonBySelectors(BUTTON_SELECTORS.kiroSnackbarRun, "kiro-run", snackbarContainer);
      if (button) {
        console.log("[KiroAssist] 找到 Kiro Snackbar Run 按鈕:", button);
      }
      return button;
    }

    /**
     * 通用按鈕查找方法
     */
    findButtonBySelectors(selectors, logPrefix = "", context = document) {
      for (const selector of selectors) {
        try {
          // 對於包含:contains的選擇器，需要手動檢查
          if (selector.includes(':contains(')) {
            const baseSelector = selector.split(':contains(')[0];
            const containsText = selector.match(/:contains\("([^"]+)"\)/)?.[1];
            
            if (baseSelector && containsText) {
              const elements = context.querySelectorAll(baseSelector);
              for (const element of elements) {
                const elementText = element.textContent?.trim().toLowerCase() || "";
                const searchText = containsText.toLowerCase();
                
                // 支援更準確的文字匹配
                if ((elementText.includes(searchText) || 
                     elementText === searchText ||
                     element.textContent?.trim() === containsText) &&
                    this.isElementVisible(element) && 
                    this.isElementClickable(element)) {
                  return element;
                }
              }
            }
          } else {
            const element = context.querySelector(selector);
            if (element && 
                this.isElementVisible(element) && 
                this.isElementClickable(element)) {
              return element;
            }
          }
        } catch (error) {
          console.warn(`[KiroAssist] 選擇器失效: ${selector}`, error);
        }
      }
      return null;
    }

    /**
     * 通用元素查找方法
     */
    findElementBySelectors(selectors, context = document) {
      for (const selector of selectors) {
        try {
          const element = context.querySelector(selector);
          if (element && this.isElementVisible(element)) {
            return element;
          }
        } catch (error) {
          console.warn(`[KiroAssist] 選擇器失效: ${selector}`, error);
        }
      }
      return null;
    }

    /**
     * 檢查元素是否可見
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
     * 檢查元素是否可點擊
     */
    isElementClickable(element) {
      if (!element) return false;

      const style = window.getComputedStyle(element);
      return (
        style.pointerEvents !== "none" &&
        !element.disabled &&
        !element.hasAttribute("disabled") &&
        element.getAttribute("aria-disabled") !== "true" &&
        element.getAttribute("data-loading") !== "true"
      );
    }

    /**
     * 檢查是否可以點擊按鈕
     */
    canClickButton(button) {
      const now = Date.now();

      // 檢查全域點擊間隔
      if (now - this.lastClickTime < this.minClickInterval) {
        return false;
      }

      // 檢查是否已經點擊過這個按鈕
      if (this.clickedButtons.has(button)) {
        return false;
      }

      return true;
    }

    /**
     * 通用點擊按鈕方法
     */
    clickButton(button, moduleType, buttonName) {
      try {
        const now = Date.now();
        
        // 記錄點擊狀態
        this.lastClickTime = now;
        this.clickedButtons.add(button);
        
        // 點擊按鈕
        button.click();
        
        // 更新統計
        this.totalClicks++;
        this.moduleStats[moduleType]++;
        
        this.updatePanelStatus();
        this.log(`已自動點擊 ${buttonName} 按鈕 (#${this.totalClicks})`, "success");

        // 清除已點擊記錄（3秒後）
        setTimeout(() => {
          this.clickedButtons.delete(button);
        }, 3000);

        return true;
      } catch (error) {
        this.log(`點擊${buttonName}失敗：${error.message}`, "error");
        return false;
      }
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
      statusIcon.innerHTML = '';
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
      statusIcon.innerHTML = '';
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

  console.log("✨ KiroAssist v3.0.2 (智能助手專業版) 已載入！");
  console.log("🎛️ 新API: startKiroAssist(), stopKiroAssist(), kiroAssistStatus()");
  console.log("🔄 舊API: startRetryClicker(), stopRetryClicker(), retryClickerStatus() (向後相容)");
  console.log("👨‍💻 作者: threads:azlife_1224");
  console.log("🎯 功能: 智能檢測Retry按鈕 + Kiro Snackbar自動點擊");
  console.log("⚙️ 新增: 模組化設定面板，可獨立開關各功能");
  console.log("🎨 採用專業App風格SVG圖標系統");
})();