# 🚀 ClickPilot - Auto Retry Button Clicker

<div align="center"></div>ClickPilot Logo](https://img.shields.io/badge/ClickPilot-v3.0.1-blueviolet?style=for-the-badge&logo=javascript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Kiro Compatible](https://img.shields.io/badge/Kiro-Compatible-9945FF?style=for-the-badge)](https://kiro.dev/)

**專業級自動重試按鈕點擊器 - 為 Kiro AI IDE 量身打造**

[🎯 快速開始](#-快速開始) • [📖 使用教學](#-使用教學) • [⚡ 功能特色](#-功能特色) • [🛠️ 安裝方式](#️-安裝方式) • [📚 API 文檔](#-api-文檔)

</div>

---

## 📋 目錄

- [🎯 快速開始](#-快速開始)
- [⚡ 功能特色](#-功能特色)
- [🛠️ 安裝方式](#️-安裝方式)
- [📖 使用教學](#-使用教學)
- [🎮 控制面板](#-控制面板)
- [📚 API 文檔](#-api-文檔)
- [🔧 配置選項](#-配置選項)
- [🤝 貢獻指南](#-貢獻指南)
- [📄 授權條款](#-授權條款)
- [👨‍💻 作者資訊](#-作者資訊)

---

## 🎯 快速開始

### 前置需求

- [Kiro AI IDE](https://kiro.dev/) - 下載並安裝最新版本
- 支援 ES6+ 的現代瀏覽器
- 基本的 JavaScript 知識

### 30 秒快速部署

1. **下載 Kiro**：前往 [kiro.dev](https://kiro.dev/) 下載並安裝
2. **開啟開發者工具**：在 Kiro 中按 `F12` 或點擊「說明」→「切換開發人員工具」
3. **執行腳本**：複製 [ClickPilot.js](./ClickPilot.js) 內容到 Console 並執行
4. **開始使用**：點擊控制面板的「開始監控」按鈕

```javascript
// 快速啟動命令
startRetryClicker(); // 開始監控
stopRetryClicker(); // 停止監控
retryClickerStatus(); // 查看狀態
```

---

## ⚡ 功能特色

### 🎨 專業 UI 設計

- **現代化控制面板**：採用專業 App 風格設計
- **SVG 圖標系統**：純 DOM API 創建，無安全限制
- **流暢動畫效果**：提供優雅的用戶體驗
- **可拖拽面板**：支援自由拖拽定位

### 🔍 智能檢測

- **自動按鈕識別**：支援多種 Retry 按鈕格式
- **DOM 變化監控**：使用 MutationObserver 即時監控
- **防重複點擊**：智能防抖機制避免重複操作
- **多語言支援**：支援中英文按鈕識別

### 📊 數據統計

- **點擊計數器**：即時顯示點擊統計
- **活動記錄**：詳細的操作日誌
- **狀態監控**：即時顯示運行狀態
- **性能優化**：低資源消耗設計

### 🛡️ 安全可靠

- **TrustedHTML 相容**：解決現代瀏覽器安全限制
- **錯誤處理**：完善的異常捕獲機制
- **記憶體管理**：自動清理避免記憶體洩漏
- **非侵入式**：不影響原有頁面功能

---

## 🛠️ 安裝方式

### 方法一：永久安裝（推薦）

適合長期使用，腳本會保存在瀏覽器中：

1. **開啟 Kiro 開發者工具**

   ```
   說明 → 切換開發人員工具
   或按 F12
   ```

2. **進入 Snippets 管理**

   ```
   Developer → Sources → Workspace → >> → Snippets
   ```

3. **創建新腳本**

   ```
   New snippet → 命名為 "ClickPilot.js"
   ```

4. **貼上腳本內容**

   - 複製 [ClickPilot.js](./ClickPilot.js) 完整內容
   - 貼上到編輯器中

5. **執行腳本**
   ```
   右鍵點擊 ClickPilot.js → Run
   ```

### 方法二：臨時執行

適合一次性使用：

1. **開啟 Console**

   ```
   Developer → Console
   ```

2. **貼上並執行**
   ```javascript
   // 首次使用需要輸入 "allow pasting"
   // 然後貼上完整的 ClickPilot.js 內容並按 Enter
   ```

---

## 📖 使用教學

### 基本操作

#### 1. 啟動腳本

```javascript
// 方式一：使用控制面板
// 點擊「開始監控」按鈕

// 方式二：使用 API
startRetryClicker();
```

#### 2. 停止監控

```javascript
// 方式一：使用控制面板
// 點擊「停止監控」按鈕

// 方式二：使用 API
stopRetryClicker();
```

#### 3. 查看狀態

```javascript
// 獲取當前狀態
const status = retryClickerStatus();
console.log(status);
// 輸出：{ isRunning: true, totalClicks: 5, version: "3.0.1" }
```

### 進階功能

#### 控制面板操作

- **拖拽移動**：點擊標題欄拖拽面板到任意位置
- **最小化**：點擊 `-` 按鈕收折面板
- **關閉面板**：點擊 `×` 按鈕隱藏面板
- **查看日誌**：在活動記錄區域查看詳細操作日誌

#### 自定義配置

```javascript
// 訪問主實例
const clicker = window.AutoRetryClicker;

// 修改點擊間隔（毫秒）
clicker.minClickInterval = 3000; // 3秒間隔

// 查看總點擊數
console.log(clicker.totalClicks);
```

---

## 🎮 控制面板

### 面板組件說明

| 組件          | 功能         | 說明                          |
| ------------- | ------------ | ----------------------------- |
| 🔄 狀態指示器 | 顯示運行狀態 | 綠色=運行中，紅色=已停止      |
| 📊 點擊計數器 | 統計點擊次數 | 即時更新點擊統計              |
| ▶️ 開始按鈕   | 啟動監控     | 開始自動檢測並點擊 Retry 按鈕 |
| ⏹️ 停止按鈕   | 停止監控     | 停止所有自動操作              |
| 📝 活動記錄   | 操作日誌     | 顯示詳細的操作歷史            |
| 👤 作者資訊   | 開發者信息   | 包含作者聯繫方式              |

### 快捷鍵

| 快捷鍵             | 功能          |
| ------------------ | ------------- |
| `Ctrl + Shift + R` | 快速重啟腳本  |
| `Ctrl + Shift + S` | 開始/停止監控 |
| `Ctrl + Shift + H` | 隱藏/顯示面板 |

---

## 📚 API 文檔

### 全域函數

#### `startRetryClicker()`

啟動自動重試監控

```javascript
startRetryClicker();
// 返回：undefined
// 副作用：開始監控頁面上的 Retry 按鈕
```

#### `stopRetryClicker()`

停止自動重試監控

```javascript
stopRetryClicker();
// 返回：undefined
// 副作用：停止所有監控活動
```

#### `retryClickerStatus()`

獲取當前狀態信息

```javascript
const status = retryClickerStatus();
// 返回：{
//   isRunning: boolean,    // 是否正在運行
//   totalClicks: number,   // 總點擊次數
//   version: string        // 版本號
// }
```

### 主類別 API

#### `AutoRetryClicker`

主控制器類別

```javascript
const clicker = window.AutoRetryClicker;

// 屬性
clicker.version; // 版本號
clicker.isRunning; // 運行狀態
clicker.totalClicks; // 總點擊數
clicker.minClickInterval; // 最小點擊間隔（毫秒）

// 方法
clicker.start(); // 開始監控
clicker.stop(); // 停止監控
clicker.getStatus(); // 獲取狀態
clicker.showPanel(); // 顯示面板
clicker.hidePanel(); // 隱藏面板
```

---

## 🔧 配置選項

### 按鈕選擇器配置

腳本支援多種 Retry 按鈕格式：

```javascript
const RETRY_SELECTORS = [
  // Kiro 專用按鈕
  'button.kiro-button:contains("Retry")',
  'button[data-variant="secondary"]:contains("Retry")',

  // 通用按鈕
  'button:contains("Retry")',
  'button[aria-label*="retry" i]',

  // 中文按鈕
  'button:contains("重試")',
  'button:contains("重新嘗試")',
];
```

### 監控配置

```javascript
// DOM 監控配置
const config = {
  childList: true, // 監控子節點變化
  subtree: true, // 監控整個子樹
  attributes: true, // 監控屬性變化
  attributeFilter: [
    // 監控特定屬性
    "class",
    "style",
    "data-active",
    "data-loading",
    "disabled",
  ],
};
```

---

## 🤝 貢獻指南

我們歡迎所有形式的貢獻！

### 如何貢獻

1. **Fork 專案**
2. **創建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **開啟 Pull Request**

### 開發指南

#### 本地開發設置

```bash
# 克隆專案
git clone https://github.com/s123104/ClickPilot.git
cd ClickPilot

# 在 Kiro 中測試
# 將 ClickPilot.js 載入到 Kiro 的 Console 中測試
```

#### 代碼規範

- 使用 ES6+ 語法
- 遵循 JSDoc 註釋規範
- 保持代碼簡潔易讀
- 添加適當的錯誤處理

#### 測試清單

- [ ] 在 Kiro IDE 中正常運行
- [ ] 控制面板功能完整
- [ ] 按鈕檢測準確
- [ ] 無記憶體洩漏
- [ ] 相容性測試通過

### 問題回報

發現 Bug？請[開啟 Issue](https://github.com/s123104/ClickPilot/issues) 並包含：

- 詳細的問題描述
- 重現步驟
- 預期行為 vs 實際行為
- 環境信息（瀏覽器版本、Kiro 版本等）
- 錯誤截圖（如適用）

---

## 📄 授權條款

本專案採用 [MIT License](LICENSE) 授權。

```
MIT License

Copyright (c) 2025 s123104

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

### 使用條款

✅ **允許的使用**

- 商業使用
- 修改和分發
- 私人使用
- 專利使用

⚠️ **使用限制**

- 必須保留版權聲明
- 必須保留授權條款
- 不提供任何擔保

---

## 👨‍💻 作者資訊

<div align="center">

### 🌟 開發者

**azlife_1224**

[![GitHub](https://img.shields.io/badge/GitHub-s123104-181717?style=for-the-badge&logo=github)](https://github.com/s123104)
[![Threads](https://img.shields.io/badge/Threads-azlife__1224-000000?style=for-the-badge&logo=threads)](https://www.threads.net/@azlife_1224)

_專注於 AI 輔助開發工具與自動化解決方案_

</div>

### 聯繫方式

- **GitHub Issues**: [專案問題回報](https://github.com/s123104/ClickPilot/issues)
- **Threads**: [@azlife_1224](https://www.threads.net/@azlife_1224)
- **Email**: 透過 GitHub 聯繫

### 支持專案

如果這個專案對你有幫助，請考慮：

- ⭐ 給專案一個 Star
- 🐛 回報 Bug 或建議功能
- 🤝 貢獻代碼或文檔
- 📢 分享給其他開發者

---

## 🔗 相關連結

- [Kiro AI IDE 官網](https://kiro.dev/)
- [JavaScript MDN 文檔](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [SVG 元素參考](https://developer.mozilla.org/en-US/docs/Web/SVG/Element)

---

<div align="center">

**🚀 讓 AI 開發更智能，讓重試更自動！**

_Built with ❤️ for the Kiro community_

[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Powered by Kiro](https://img.shields.io/badge/Powered%20by-Kiro-9945FF?style=for-the-badge)](https://kiro.dev/)

</div>
