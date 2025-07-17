# 🎯 Kiro 專用設置指南

專為 Kiro AI IDE 用戶設計的 KiroAssist v3.1.1 快速設置指南。

## 🆕 v3.1.1 功能亮點

- **安全的類名處理**：新增 `getElementClassName` 方法，增強元素識別的穩定性
- **增強的錯誤處理**：改進了類名獲取過程中的錯誤處理機制
- **精確按鈕匹配**：基於 `data-variant` 和 `data-purpose` 屬性的精確識別
- **增強監控能力**：監控文字內容變化和關鍵屬性更新
- **優化性能表現**：使用先進的快取機制和狀態管理

## 📥 第一步：下載 Kiro

1. 前往 [kiro.dev](https://kiro.dev/) 官網
2. 點擊下載按鈕獲取最新版本
3. 完成安裝並啟動 Kiro
4. 完成初始設置和登入

## 🛠️ 第二步：開啟開發者工具

### 方法一：選單操作
```
Kiro 上方選單 → 說明 → 切換開發人員工具
```

### 方法二：快捷鍵
```
按 F12 鍵
```

### 方法三：右鍵選單
```
在頁面空白處右鍵 → 檢查
```

## 🚀 第三步：安裝 KiroAssist

### 永久安裝（推薦）

1. **進入 Snippets**
   ```
   Developer → Sources → Workspace → >> → Snippets
   ```

2. **創建新腳本**
   ```
   點擊 "New snippet" → 命名為 "ClickPilot.js"
   ```

3. **貼上腳本**
   - 複製 [ClickPilot.js](../ClickPilot.js) 完整內容
   - 貼到編輯器中

4. **執行腳本**
   ```
   右鍵點擊 ClickPilot.js → Run
   ```

### 臨時使用

1. **開啟 Console**
   ```
   Developer → Console
   ```

2. **允許貼上**
   ```
   首次使用需輸入：allow pasting
   ```

3. **執行腳本**
   - 貼上 ClickPilot.js 完整內容
   - 按 Enter 執行

## ✅ 第四步：驗證安裝

安裝成功後你會看到：

- ✅ 頁面右側出現 ClickPilot 控制面板
- ✅ Console 顯示載入成功訊息
- ✅ 面板顯示「已停止」狀態

## 🎮 第五步：開始使用

### 啟動監控
```javascript
// 方法一：點擊面板「開始監控」按鈕
// 方法二：執行命令
startRetryClicker();
```

### 停止監控
```javascript
// 方法一：點擊面板「停止監控」按鈕
// 方法二：執行命令
stopRetryClicker();
```

### 查看狀態
```javascript
retryClickerStatus();
```

## 🎯 Kiro 專用功能

### 支援的按鈕類型
- Kiro 原生 Retry 按鈕
- 對話重試按鈕
- 代碼生成重試按鈕
- 自定義重試按鈕

### 最佳使用場景
1. **AI 對話重試**：當 AI 回應出錯時自動重試
2. **代碼生成重試**：代碼生成失敗時自動重新生成
3. **批量操作重試**：批量處理時的錯誤重試
4. **網路問題重試**：網路不穩定時的自動重試

## ⚠️ 注意事項

### 相容性
- ✅ Kiro v1.0+ 完全支援
- ✅ Chrome 80+ 瀏覽器核心
- ✅ 現代瀏覽器環境

### 安全性
- 🔒 僅在當前頁面運行
- 🔒 不收集任何個人資料
- 🔒 所有操作本地執行

### 效能
- ⚡ 低資源消耗設計
- ⚡ 不影響 Kiro 正常運行
- ⚡ 自動記憶體管理

## 🐛 常見問題

### Q: 腳本載入失敗？
**A**: 確認步驟：
1. 檢查是否在 Kiro 環境中
2. 確認開發者工具已開啟
3. 檢查 Console 錯誤訊息
4. 嘗試重新整理頁面

### Q: 找不到 Retry 按鈕？
**A**: 支援的按鈕格式：
- 英文：Retry、retry
- 中文：重試、重新嘗試、再試一次
- Kiro 專用按鈕格式

### Q: 控制面板消失？
**A**: 重新顯示方法：
```javascript
window.KiroAssist.showPanel();
```

### Q: 如何完全移除？
**A**: 重新整理頁面即可，或執行：
```javascript
window.KiroAssist.stop();
delete window.KiroAssist;
```

## 📞 技術支援

- **GitHub Issues**: [問題回報](https://github.com/s123104/KiroAssist/issues)
- **作者聯繫**: [@azlife_1224](https://www.threads.net/@azlife_1224)
- **完整文檔**: [README.md](../README.md)

---

**🎉 現在你可以在 Kiro 中享受自動重試的便利！**

*專注於創作，讓 KiroAssist 處理重複的點擊操作。*