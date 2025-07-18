/**
 * 📦 腳本：彈性策略自動點擊器 (最終修正版)
 * 🕒 版本：2.1.0
 * 📝 功能：
 *   - 【已修正】採用更強健的 `querySelectorAll` 搜索邏輯，避免遺漏目標。
 *   - 自動偵測並點擊 "Run" 或 "Retry" 按鈕。
 *   - 集中化管理目標，方便擴充。
 */
(function () {
    'use strict';

    // --- 設定 ---
    const DEBOUNCE_DELAY = 250;
    let debounceTimer;

    /**
     * 🎯 目標定義與選擇器備案
     * 腳本會依照此處定義的順序和選擇器來尋找按鈕。
     */
    const TARGET_DEFINITIONS = [
        {
            name: 'Run Button',
            selectors: [
                'div.kiro-snackbar button.kiro-button[data-variant="primary"][data-purpose="alert"]',
                'div.kiro-snackbar-actions button[data-variant="primary"]'
            ],
            validate: (element) => element.textContent.trim() === 'Run'
        },
        {
            name: 'Retry Button',
            selectors: [
                'div.kiro-chat-message-body button.kiro-button[data-variant="secondary"][data-purpose="default"]',
                // 這個備用選擇器現在因為邏輯的改進而變得更可靠
                'button.kiro-button[data-variant="secondary"]'
            ],
            validate: (element) => element.textContent.trim() === 'Retry'
        }
    ];

    // --- 核心邏輯 ---

    /**
     * 檢查一個元素是否在畫面上可見且可點擊。
     */
    function isElementReady(element) {
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
     * 【核心修正】主函式：遍歷所有目標定義，使用 querySelectorAll 尋找並點擊。
     */
    function checkAndClick() {
        // 遍歷所有我們定義好的目標 (例如 "Run", "Retry")
        for (const target of TARGET_DEFINITIONS) {
            // 遍歷該目標的所有備用選擇器
            for (const selector of target.selectors) {
                // 使用 querySelectorAll 找出所有符合的元素
                const foundElements = document.querySelectorAll(selector);

                // 遍歷所有找到的元素
                for (const element of foundElements) {
                    // 檢查元素是否可見、可用，並且通過二次驗證
                    if (isElementReady(element) && (!target.validate || target.validate(element))) {
                        console.log(`[自動點擊器] 發現目標: "${target.name}"，執行點擊！`);
                        element.click();
                        // 每次只處理一個點擊，然後立即返回，等待下一次DOM變動
                        return;
                    }
                }
            }
        }
    }

    // --- DOM 變動監視器 (與之前版本相同) ---
    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(checkAndClick, DEBOUNCE_DELAY);
    });

    function startObserver() {
        observer.observe(document.body, { childList: true, subtree: true });
        console.log('[自動點擊器] 最終修正版腳本已啟動...');
        checkAndClick(); // 啟動時立即檢查一次
    }

    if (document.body) {
        startObserver();
    } else {
        window.addEventListener('DOMContentLoaded', startObserver);
    }

})();