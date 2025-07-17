# 🤝 貢獻指南

感謝你對 ClickPilot 專案的興趣！我們歡迎所有形式的貢獻，無論是代碼、文檔、錯誤回報還是功能建議。

## 📋 目錄

- [行為準則](#行為準則)
- [如何貢獻](#如何貢獻)
- [開發環境設置](#開發環境設置)
- [代碼規範](#代碼規範)
- [提交指南](#提交指南)
- [Pull Request 流程](#pull-request-流程)
- [問題回報](#問題回報)
- [功能請求](#功能請求)

## 🤝 行為準則

### 我們的承諾

為了營造一個開放且友善的環境，我們作為貢獻者和維護者承諾，無論年齡、體型、殘疾、族裔、性別認同和表達、經驗水平、國籍、個人外表、種族、宗教或性取向如何，參與我們專案和社群的每個人都能享有無騷擾的體驗。

### 我們的標準

有助於創造正面環境的行為包括：

- 使用友善和包容的語言
- 尊重不同的觀點和經驗
- 優雅地接受建設性批評
- 專注於對社群最有利的事情
- 對其他社群成員表現出同理心

### 執行

如果你遇到不當行為，請聯繫專案維護者：[@azlife_1224](https://www.threads.net/@azlife_1224)

## 🛠️ 如何貢獻

### 貢獻類型

我們歡迎以下類型的貢獻：

1. **🐛 錯誤修正**：修復已知的 bug
2. **✨ 新功能**：添加新的功能特性
3. **📚 文檔改進**：改善文檔內容和結構
4. **🎨 UI/UX 改進**：改善用戶介面和體驗
5. **⚡ 性能優化**：提升代碼性能
6. **🧪 測試**：添加或改進測試用例
7. **🔧 工具改進**：改善開發工具和流程

### 貢獻流程

1. **Fork 專案**到你的 GitHub 帳戶
2. **創建分支**用於你的修改
3. **進行修改**並確保符合代碼規範
4. **測試修改**確保功能正常
5. **提交 Pull Request**

## 🔧 開發環境設置

### 前置需求

- **瀏覽器**：Chrome 80+、Firefox 75+ 或其他現代瀏覽器
- **Kiro AI IDE**：[下載最新版本](https://kiro.dev/)
- **Git**：用於版本控制
- **文字編輯器**：VS Code、Sublime Text 等

### 本地開發

1. **克隆專案**
   ```bash
   git clone https://github.com/s123104/ClickPilot.git
   cd ClickPilot
   ```

2. **創建開發分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **在 Kiro 中測試**
   - 開啟 Kiro AI IDE
   - 按 F12 開啟開發者工具
   - 在 Console 中載入 `ClickPilot.js`
   - 測試你的修改

### 測試環境

#### 基本測試
```javascript
// 載入腳本後執行基本測試
console.log('ClickPilot 版本:', window.AutoRetryClicker.version);
console.log('初始狀態:', retryClickerStatus());

// 測試啟動和停止
startRetryClicker();
console.log('啟動後狀態:', retryClickerStatus());

stopRetryClicker();
console.log('停止後狀態:', retryClickerStatus());
```

#### 功能測試
- 測試按鈕檢測功能
- 測試控制面板操作
- 測試拖拽功能
- 測試日誌記錄
- 測試錯誤處理

## 📝 代碼規範

### JavaScript 規範

#### 基本規則
- 使用 **ES6+** 語法
- 使用 **2 空格**縮排
- 使用 **單引號**字串
- 行末**不加分號**（除非必要）
- 函數和變數使用 **camelCase**
- 常數使用 **UPPER_SNAKE_CASE**
- 類別使用 **PascalCase**

#### 代碼範例
```javascript
// ✅ 好的寫法
const RETRY_SELECTORS = [
  'button:contains("Retry")',
  'button:contains("重試")'
]

class AutoRetryClicker {
  constructor() {
    this.isRunning = false
    this.totalClicks = 0
  }

  start() {
    if (this.isRunning) return
    
    this.isRunning = true
    this.log('已開始監控', 'success')
  }
}

// ❌ 避免的寫法
var retry_selectors = ["button:contains(\"Retry\")"];

function AutoRetryClicker() {
  this.is_running = false;
  this.total_clicks = 0;
}
```

### 註釋規範

#### JSDoc 註釋
```javascript
/**
 * 🎯 尋找頁面上的 Retry 按鈕
 * @returns {HTMLElement|null} 找到的按鈕元素或 null
 */
findRetryButton() {
  // 實作內容
}

/**
 * 📊 記錄日誌訊息
 * @param {string} message - 日誌訊息
 * @param {string} [type='info'] - 日誌類型
 */
log(message, type = 'info') {
  // 實作內容
}
```

#### 區塊註釋
```javascript
/**
 * ===== 主要功能區塊 =====
 */

// 單行註釋說明
const importantVariable = 'value'

/* 
 * 多行註釋
 * 用於複雜邏輯說明
 */
```

### HTML/CSS 規範

#### CSS 類別命名
- 使用 **kebab-case**
- 使用有意義的名稱
- 添加專案前綴避免衝突

```css
/* ✅ 好的寫法 */
.prc-control-panel { }
.prc-status-indicator { }
.prc-action-btn { }

/* ❌ 避免的寫法 */
.panel { }
.btn { }
.red { }
```

## 📤 提交指南

### 提交訊息格式

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### 提交類型

- **feat**: 新功能
- **fix**: 錯誤修正
- **docs**: 文檔更新
- **style**: 代碼格式（不影響功能）
- **refactor**: 代碼重構
- **perf**: 性能改進
- **test**: 測試相關
- **chore**: 建構過程或輔助工具變動

#### 提交範例

```bash
# 新功能
git commit -m "feat: 添加自定義按鈕選擇器配置"

# 錯誤修正
git commit -m "fix: 修正面板拖拽在 Firefox 中的問題"

# 文檔更新
git commit -m "docs: 更新 API 文檔和使用範例"

# 性能改進
git commit -m "perf: 優化 DOM 監控器的防抖機制"
```

### 提交最佳實踐

1. **原子性提交**：每次提交只包含一個邏輯變更
2. **清晰描述**：提交訊息要清楚說明變更內容
3. **測試通過**：確保提交前所有測試都通過
4. **代碼整潔**：遵循代碼規範和最佳實踐

## 🔄 Pull Request 流程

### 提交前檢查清單

- [ ] 代碼符合專案規範
- [ ] 添加了適當的註釋
- [ ] 功能已在 Kiro 中測試
- [ ] 更新了相關文檔
- [ ] 提交訊息符合規範
- [ ] 沒有合併衝突

### PR 標題格式

```
<type>: <簡短描述>
```

範例：
- `feat: 添加快捷鍵支援`
- `fix: 修正按鈕檢測邏輯`
- `docs: 改進快速入門指南`

### PR 描述模板

```markdown
## 📝 變更摘要
簡要描述這個 PR 的主要變更。

## 🎯 變更類型
- [ ] 錯誤修正
- [ ] 新功能
- [ ] 文檔更新
- [ ] 性能改進
- [ ] 其他：_____

## 🧪 測試
描述你如何測試這些變更：
- [ ] 在 Kiro 中手動測試
- [ ] 測試了邊界情況
- [ ] 驗證了向後相容性

## 📸 截圖（如適用）
如果有 UI 變更，請提供截圖。

## 📋 檢查清單
- [ ] 代碼符合專案規範
- [ ] 添加了適當的註釋
- [ ] 更新了相關文檔
- [ ] 測試通過
```

### 審查流程

1. **自動檢查**：GitHub Actions 會自動檢查代碼格式
2. **人工審查**：維護者會審查代碼品質和功能
3. **測試驗證**：確保新功能正常運作
4. **合併**：通過審查後合併到主分支

## 🐛 問題回報

### 回報前檢查

在提交新問題前，請：

1. **搜尋現有問題**：確認問題尚未被回報
2. **檢查文檔**：確認不是使用方法問題
3. **嘗試最新版本**：確認問題在最新版本中仍存在

### 問題模板

```markdown
## 🐛 問題描述
清楚簡潔地描述問題。

## 🔄 重現步驟
1. 前往 '...'
2. 點擊 '....'
3. 滾動到 '....'
4. 看到錯誤

## 🎯 預期行為
描述你預期應該發生什麼。

## 📸 截圖
如果適用，添加截圖來幫助解釋問題。

## 🖥️ 環境資訊
- OS: [例如 Windows 10]
- 瀏覽器: [例如 Chrome 91]
- Kiro 版本: [例如 1.2.3]
- ClickPilot 版本: [例如 3.0.1]

## 📋 額外資訊
添加任何其他相關的問題資訊。
```

## 💡 功能請求

### 請求模板

```markdown
## 🚀 功能描述
清楚簡潔地描述你想要的功能。

## 🎯 問題背景
這個功能請求是否與問題相關？請描述。

## 💭 解決方案
描述你希望的解決方案。

## 🔄 替代方案
描述你考慮過的任何替代解決方案或功能。

## 📋 額外資訊
添加任何其他相關的功能請求資訊。
```

## 🏷️ 標籤系統

我們使用以下標籤來組織問題和 PR：

### 問題類型
- `bug`：錯誤回報
- `enhancement`：功能改進
- `feature`：新功能請求
- `documentation`：文檔相關
- `question`：問題諮詢

### 優先級
- `priority: high`：高優先級
- `priority: medium`：中優先級
- `priority: low`：低優先級

### 狀態
- `status: needs-review`：需要審查
- `status: in-progress`：進行中
- `status: blocked`：被阻塞
- `status: ready`：準備就緒

### 難度
- `difficulty: beginner`：適合新手
- `difficulty: intermediate`：中等難度
- `difficulty: advanced`：高難度

## 🎉 認可貢獻者

我們會在以下地方認可所有貢獻者：

- **README.md**：主要貢獻者列表
- **CHANGELOG.md**：版本更新中的貢獻者
- **GitHub Releases**：發布說明中的感謝
- **社群媒體**：在 Threads 等平台分享

## 📞 獲得幫助

如果你在貢獻過程中遇到任何問題：

- **GitHub Issues**：[提出問題](https://github.com/s123104/ClickPilot/issues)
- **Threads**：[@azlife_1224](https://www.threads.net/@azlife_1224)
- **Email**：透過 GitHub 個人資料聯繫

## 📚 學習資源

### JavaScript 資源
- [MDN JavaScript 指南](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide)
- [ES6 特性](https://es6-features.org/)
- [JavaScript 最佳實踐](https://github.com/ryanmcdermott/clean-code-javascript)

### Git 資源
- [Git 基礎教學](https://git-scm.com/book/zh-tw/v2)
- [GitHub 流程](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### 開源貢獻
- [如何貢獻開源專案](https://opensource.guide/zh-tw/how-to-contribute/)
- [開源禮儀](https://tirania.org/blog/archive/2010/Dec-31.html)

---

**🙏 感謝你對 ClickPilot 的貢獻！**

每一個貢獻，無論大小，都讓這個專案變得更好。我們期待與你一起建設更強大的自動化工具！

*最後更新：2025-07-17*