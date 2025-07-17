# 🚀 ClickPilot 快速入門指南

歡迎使用 ClickPilot！這份指南將幫助你在 5 分鐘內開始使用自動重試功能。

## 📋 前置準備

### 1. 下載並安裝 Kiro

1. 前往 [kiro.dev](https://kiro.dev/) 官網
2. 點擊下載按鈕，獲取最新版本的 Kiro AI IDE
3. 按照安裝指示完成安裝
4. 啟動 Kiro 並完成初始設置

### 2. 準備 ClickPilot 腳本

1. 前往 [ClickPilot GitHub](https://github.com/s123104/ClickPilot)
2. 複製 `ClickPilot.js` 文件的完整內容
3. 或直接下載整個專案到本地

## 🛠️ 安裝方法

### 方法一：永久安裝（推薦）

**適用場景**：需要長期使用，希望腳本保存在瀏覽器中

#### 步驟詳解

1. **開啟開發者工具**

   ```
   方式一：點擊 Kiro 上方選單「說明」→「切換開發人員工具」
   方式二：直接按 F12 快捷鍵
   方式三：右鍵點擊頁面 →「檢查」
   ```

2. **進入 Sources 面板**

   ```
   Developer → Sources
   ```

3. **找到 Snippets 功能**

   ```
   Sources → Workspace → 點擊右側的 ">>" → Snippets
   ```

4. **創建新的程式碼片段**

   ```
   點擊「New snippet」按鈕
   輸入名稱：ClickPilot.js
   ```

5. **貼上腳本內容**

   - 將複製的 ClickPilot.js 完整內容貼到編輯器中
   - 確保所有代碼都已正確貼上

6. **執行腳本**

   ```
   右鍵點擊 ClickPilot.js → 選擇「Run」
   或使用快捷鍵 Ctrl+Enter
   ```

7. **驗證安裝**
   - 頁面右側應該出現 ClickPilot 控制面板
   - Console 中顯示載入成功訊息

#### 未來使用

- 每次需要使用時，只需重複步驟 6 即可
- 腳本會永久保存在瀏覽器的 Snippets 中

### 方法二：臨時執行

**適用場景**：偶爾使用，不需要保存腳本

#### 步驟詳解

1. **開啟 Console**

   ```
   Developer → Console
   ```

2. **準備貼上權限**

   - 首次在 Console 貼上代碼時
   - 需要在輸入框中輸入 `allow pasting`
   - 按 Enter 確認

3. **貼上並執行**

   - 將 ClickPilot.js 完整內容貼到 Console 輸入框
   - 按 Enter 執行

4. **驗證執行**
   - 控制面板應該出現在頁面右側
   - Console 顯示成功載入訊息

## 🎮 基本使用

### 1. 啟動監控

**方式一：使用控制面板**

- 點擊控制面板中的「開始監控」按鈕
- 狀態指示器變為綠色「監控中」

**方式二：使用命令**

```javascript
startRetryClicker();
```

### 2. 停止監控

**方式一：使用控制面板**

- 點擊控制面板中的「停止監控」按鈕
- 狀態指示器變為紅色「已停止」

**方式二：使用命令**

```javascript
stopRetryClicker();
```

### 3. 查看狀態

```javascript
// 獲取當前狀態
const status = retryClickerStatus();
console.log(status);

// 輸出範例：
// {
//   isRunning: true,
//   totalClicks: 3,
//   version: "3.0.1"
// }
```

## 🎯 實際使用場景

### 場景一：Kiro AI 對話重試

1. 在 Kiro 中進行 AI 對話
2. 當出現錯誤需要重試時
3. ClickPilot 會自動檢測並點擊「Retry」按鈕
4. 無需手動干預，自動完成重試

### 場景二：批量操作重試

1. 執行批量代碼生成或分析
2. 遇到網路問題或暫時性錯誤
3. ClickPilot 自動處理重試操作
4. 提高工作效率

## 🔧 控制面板功能

### 面板組件說明

| 組件          | 功能             | 操作方式 |
| ------------- | ---------------- | -------- |
| 🔄 狀態指示器 | 顯示當前運行狀態 | 自動更新 |
| 📊 點擊計數器 | 顯示總點擊次數   | 自動累計 |
| ▶️ 開始按鈕   | 啟動自動監控     | 點擊啟動 |
| ⏹️ 停止按鈕   | 停止自動監控     | 點擊停止 |
| 📝 活動記錄   | 顯示操作日誌     | 自動記錄 |
| 👤 作者資訊   | 開發者聯繫方式   | 點擊連結 |

### 面板操作

**拖拽移動**

- 點擊面板標題欄
- 拖拽到任意位置
- 釋放滑鼠完成移動

**最小化面板**

- 點擊標題欄右側的「-」按鈕
- 面板收折為標題欄
- 再次點擊展開

**關閉面板**

- 點擊標題欄右側的「×」按鈕
- 面板完全隱藏
- 使用 `window.AutoRetryClicker.showPanel()` 重新顯示

## ⚠️ 注意事項

### 使用限制

- 僅在 Kiro AI IDE 環境中測試
- 需要現代瀏覽器支援（Chrome 80+、Firefox 75+）
- 不建議在生產環境的重要操作中使用

### 安全考量

- 腳本僅在當前頁面運行
- 不會收集或傳送任何個人資料
- 所有操作都在本地執行

### 效能影響

- 腳本使用低資源設計
- 對頁面效能影響極小
- 自動清理記憶體避免洩漏

## 🐛 常見問題

### Q: 腳本無法載入？

**A**: 檢查以下項目：

- 確保在 Kiro 環境中執行
- 檢查 Console 是否有錯誤訊息
- 嘗試重新整理頁面後再次執行

### Q: 找不到 Retry 按鈕？

**A**: 腳本支援多種按鈕格式：

- 英文：Retry、retry
- 中文：重試、重新嘗試、再試一次
- 如果仍無法識別，請回報 Issue

### Q: 控制面板消失了？

**A**: 使用以下命令重新顯示：

```javascript
window.AutoRetryClicker.showPanel();
```

### Q: 如何完全移除腳本？

**A**: 重新整理頁面即可，或執行：

```javascript
window.AutoRetryClicker.stop();
delete window.AutoRetryClicker;
```

## 📞 獲得幫助

### 技術支援

- **GitHub Issues**: [回報問題](https://github.com/s123104/ClickPilot/issues)
- **文檔**: [完整文檔](../README.md)
- **作者聯繫**: [@azlife_1224](https://www.threads.net/@azlife_1224)

### 社群資源

- [Kiro 官方文檔](https://kiro.dev/docs)
- [JavaScript MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript)

---

**🎉 恭喜！你已經成功完成 ClickPilot 的快速入門。**

現在你可以享受自動化重試帶來的便利，專注於更重要的開發工作！

_有任何問題或建議，歡迎隨時聯繫我們。_
