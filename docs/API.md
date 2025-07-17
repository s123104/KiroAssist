# 📚 KiroAssist API 文檔

本文檔詳細說明 KiroAssist v3.1.1 智能助手的所有 API 接口和使用方法。

## 🆕 v3.1.1 新功能

- **安全的類名獲取**：新增 `getElementClassName` 方法，安全處理不同類型的 className 屬性
- **增強的錯誤處理**：改進了類名獲取過程中的錯誤處理機制
- **增強的彈性選擇器**：更精確的按鈕檢測，支援 `data-variant` 和 `data-purpose` 屬性匹配
- **改進的 DOM 監控**：新增 `characterData` 監控和更多關鍵屬性追蹤
- **優化的防重複機制**：使用 WeakSet 和 Map 進行更高效的狀態管理
- **語義化按鈕識別**：基於屬性和內容的智能按鈕類型識別
- **模組化統計系統**：獨立追蹤各模組的點擊次數和效果

## 🎯 支援的功能模組

### 1. Retry 按鈕模組 (`retryButton`)
- **功能**：自動檢測並點擊 Retry 重試按鈕
- **支援格式**：
  - 英文：`"Retry"`、`"retry button"`
  - 中文：`"重試"`、`"重新嘗試"`、`"再試一次"`
- **優先級**：1（最高）
- **額外等待時間**：2000ms

### 2. Kiro Snackbar 模組 (`kiroSnackbar`)
- **功能**：自動檢測 Kiro 通知欄並點擊 Run 按鈕
- **觸發條件**：
  - 出現 "Waiting on your input" 文字
  - 容器具有 "needs-attention" 類別
- **支援格式**：
  - 英文：`"Run"`、`"run button"`
  - 中文：`"執行"`、`"運行"`
- **優先級**：2
- **額外等待時間**：1000ms

### 3. Trust 按鈕模組 (`trust`)
- **功能**：自動檢測並點擊 Trust 信任按鈕
- **支援格式**：
  - 英文：`"Trust"`、`"trust button"`
  - 中文：`"信任"`
- **優先級**：3
- **額外等待時間**：500ms

### 4. Reject 按鈕模組 (`reject`)
- **功能**：自動檢測並點擊 Reject 拒絕按鈕
- **支援格式**：
  - 英文：`"Reject"`、`"reject button"`
  - 中文：`"拒絕"`
- **優先級**：4
- **額外等待時間**：500ms

## 🏗️ 核心架構

### ElementFinder 類別
彈性元素查找器，解決頁面結構耦合問題：

```javascript
const finder = new ElementFinder();

// 查找單個元素
const element = finder.findElement(selectors, context);

// 查找多個元素
const elements = finder.findElements(selectors, context);

// 語義化按鈕識別
const buttons = finder.findButtonsBySemantics(context);
```

### DOMWatcher 類別
DOM 變化監控器：

```javascript
const watcher = new DOMWatcher(callback);

// 開始監控
watcher.start();

// 停止監控
watcher.stop();
```

## 🌐 全域 API

### 快速啟動函數

#### `startRetryClicker()`

啟動自動重試監控功能。

```javascript
startRetryClicker();
```

**參數**：無

**返回值**：`undefined`

**副作用**：
- 開始監控頁面上的 Retry 按鈕
- 啟動 DOM 變化監控
- 更新控制面板狀態

**使用範例**：
```javascript
// 啟動監控
startRetryClicker();

// 檢查是否成功啟動
console.log(retryClickerStatus().isRunning); // true
```

#### `stopRetryClicker()`

停止自動重試監控功能。

```javascript
stopRetryClicker();
```

**參數**：無

**返回值**：`undefined`

**副作用**：
- 停止所有監控活動
- 清理 DOM 監控器
- 更新控制面板狀態

**使用範例**：
```javascript
// 停止監控
stopRetryClicker();

// 檢查是否成功停止
console.log(retryClickerStatus().isRunning); // false
```

#### `retryClickerStatus()`

獲取當前 KiroAssist 的狀態信息。

```javascript
const status = retryClickerStatus();
```

**參數**：無

**返回值**：`Object`
```typescript
{
  isRunning: boolean,    // 是否正在運行
  totalClicks: number,   // 總點擊次數
  version: string        // 版本號
}
```

**使用範例**：
```javascript
const status = retryClickerStatus();
console.log(`運行狀態: ${status.isRunning}`);
console.log(`總點擊數: ${status.totalClicks}`);
console.log(`版本: ${status.version}`);
```

## 🎛️ 主類別 API

### `KiroAssist` 類別

主控制器類別，可通過 `window.KiroAssist` 訪問。

#### 模組配置

##### `moduleConfig`
```javascript
const config = window.KiroAssist.moduleConfig;

// 查看模組配置
console.log(config.retryButton.enabled);    // Retry按鈕模組是否啟用
console.log(config.kiroSnackbar.enabled);   // Kiro Snackbar模組是否啟用

// 動態控制模組
config.retryButton.enabled = false;         // 停用Retry按鈕模組
config.kiroSnackbar.enabled = true;         // 啟用Kiro Snackbar模組
```

##### `moduleStats`
```javascript
const stats = window.KiroAssist.moduleStats;

// 查看各模組統計
console.log(`Retry按鈕點擊次數: ${stats.retryButton}`);
console.log(`Kiro Snackbar點擊次數: ${stats.kiroSnackbar}`);
```

#### 屬性

##### `version`
```javascript
const version = window.KiroAssist.version;
// 返回: "3.1.1"
```
- **類型**：`string`
- **描述**：當前版本號
- **只讀**：是

##### `isRunning`
```javascript
const isRunning = window.KiroAssist.isRunning;
// 返回: true | false
```
- **類型**：`boolean`
- **描述**：當前運行狀態
- **只讀**：是

##### `totalClicks`
```javascript
const totalClicks = window.KiroAssist.totalClicks;
// 返回: number
```
- **類型**：`number`
- **描述**：總點擊次數
- **只讀**：是

##### `minClickInterval`
```javascript
// 獲取當前間隔
const interval = window.KiroAssist.minClickInterval;

// 設置新間隔（毫秒）
window.KiroAssist.minClickInterval = 3000; // 3秒
```
- **類型**：`number`
- **描述**：最小點擊間隔（毫秒）
- **預設值**：`2000`
- **可寫**：是

#### 方法

##### `start()`

啟動自動監控。

```javascript
window.KiroAssist.start();
```

**參數**：無

**返回值**：`undefined`

**功能**：
- 啟動 DOM 監控器
- 立即執行一次按鈕檢測
- 更新控制面板狀態
- 記錄啟動日誌

##### `stop()`

停止自動監控。

```javascript
window.KiroAssist.stop();
```

**參數**：無

**返回值**：`undefined`

**功能**：
- 停止 DOM 監控器
- 清理所有定時器
- 更新控制面板狀態
- 記錄停止日誌

##### `getStatus()`

獲取詳細狀態信息。

```javascript
const status = window.KiroAssist.getStatus();
```

**參數**：無

**返回值**：`Object`
```typescript
{
  isRunning: boolean,
  totalClicks: number,
  version: string
}
```

##### `showPanel()`

顯示控制面板。

```javascript
window.KiroAssist.showPanel();
```

**參數**：無

**返回值**：`undefined`

**使用場景**：當面板被隱藏後重新顯示

##### `hidePanel()`

隱藏控制面板。

```javascript
window.KiroAssist.hidePanel();
```

**參數**：無

**返回值**：`undefined`

**使用場景**：需要暫時隱藏面板時

##### `toggleMinimize()`

切換面板最小化狀態。

```javascript
window.KiroAssist.toggleMinimize();
```

**參數**：無

**返回值**：`undefined`

**功能**：
- 如果面板已展開，則最小化
- 如果面板已最小化，則展開

##### `log(message, type)`

添加日誌記錄。

```javascript
window.KiroAssist.log("自定義訊息", "info");
```

**參數**：
- `message` (string)：日誌訊息
- `type` (string, 可選)：日誌類型，預設 "info"
  - `"success"`：成功訊息（綠色）
  - `"error"`：錯誤訊息（紅色）
  - `"info"`：一般訊息（藍色）

**返回值**：`undefined`

## 🔧 內部 API

### `DOMWatcher` 類別

DOM 監控器類別，負責監控頁面變化。

#### 方法

##### `start()`
開始監控 DOM 變化。

##### `stop()`
停止監控 DOM 變化。

##### `handleMutations(mutations)`
處理 DOM 變化事件。

### 按鈕檢測方法

#### `findRetryButtons()`

尋找頁面上的 Retry 按鈕。

```javascript
const buttons = window.KiroAssist.findRetryButtons();
```

**返回值**：`HTMLElement[]`

**檢測規則**：
- 包含 "Retry"、"重試"、"重新嘗試" 等文字
- 具有相關的 aria-label 或 title 屬性
- 符合預定義的 CSS 選擇器
- 使用語義化識別和屬性匹配

#### `isElementVisible(element)`

檢查元素是否可見。

```javascript
const isVisible = window.KiroAssist.elementFinder.isElementVisible(element);
```

**參數**：
- `element` (HTMLElement)：要檢查的元素

**返回值**：`boolean`

**檢查條件**：
- display 不為 "none"
- visibility 不為 "hidden"
- opacity 大於 0.1
- 具有實際尺寸

#### `isElementClickable(element)`

檢查元素是否可點擊。

```javascript
const isClickable = window.KiroAssist.elementFinder.isElementClickable(element);
```

**參數**：
- `element` (HTMLElement)：要檢查的元素

**返回值**：`boolean`

**檢查條件**：
- pointer-events 不為 "none"
- 未被禁用
- aria-disabled 不為 "true"
- data-loading 不為 "true"

## 🎨 SVG 圖標 API

### `createSVGIcon(iconName, className)`

創建 SVG 圖標元素。

```javascript
const icon = createSVGIcon("refresh", "my-icon-class");
```

**參數**：
- `iconName` (string)：圖標名稱
- `className` (string, 可選)：額外的 CSS 類名

**返回值**：`HTMLElement | null`

**可用圖標**：
- `refresh`：刷新圖標
- `play`：播放圖標
- `stop`：停止圖標
- `pause`：暫停圖標
- `minimize`：最小化圖標
- `close`：關閉圖標
- `activity`：活動圖標
- `clock`：時鐘圖標
- `checkCircle`：成功圖標
- `xCircle`：錯誤圖標
- `info`：信息圖標
- 更多圖標請參考源碼

## 🔍 事件系統

### DOM 事件

KiroAssist 會監聽以下 DOM 事件：

#### MutationObserver 事件
- **childList**：子節點變化
- **subtree**：子樹變化
- **attributes**：屬性變化
- **attributeFilter**：特定屬性變化

#### 滑鼠事件
- **mousedown**：面板拖拽開始
- **mousemove**：面板拖拽中
- **mouseup**：面板拖拽結束

### 自定義事件

你可以監聽 KiroAssist 的自定義事件：

```javascript
// 監聽點擊事件
document.addEventListener('clickpilot:click', (event) => {
  console.log('按鈕被點擊:', event.detail);
});

// 監聽狀態變化
document.addEventListener('clickpilot:statuschange', (event) => {
  console.log('狀態變化:', event.detail);
});
```

## 🛠️ 配置選項

### 按鈕選擇器配置

```javascript
// 查看當前選擇器配置（在腳本源碼中的 SELECTORS 常數）
// 包含多種彈性選擇器：
const SELECTORS = {
  retryButtons: [
    'button.kiro-button[data-variant="secondary"][data-purpose="default"]',
    'button.kiro-button[data-variant="secondary"]',
    'button.kiro-button',
    'button[data-variant="secondary"]',
    // ... 更多選擇器
  ],
  kiroSnackbarRun: [
    '.kiro-snackbar-actions button.kiro-button[data-variant="primary"][data-purpose="alert"]',
    '.kiro-snackbar-actions button.kiro-button[data-variant="primary"]',
    // ... 更多選擇器
  ]
};
```

### 監控配置

```javascript
// DOM 監控配置
const config = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class", "style", "data-active", "data-loading", "disabled"]
};
```

## 🐛 錯誤處理

### 錯誤類型

KiroAssist 會處理以下類型的錯誤：

1. **DOM 操作錯誤**：元素不存在或無法訪問
2. **點擊錯誤**：按鈕無法點擊或點擊失敗
3. **監控錯誤**：MutationObserver 異常
4. **面板錯誤**：控制面板操作異常

### 錯誤處理方式

```javascript
try {
  window.KiroAssist.start();
} catch (error) {
  console.error('KiroAssist 啟動失敗:', error);
  // 處理錯誤
}
```

### 調試模式

```javascript
// 查看內部狀態
console.log(window.KiroAssist);

// 查看模組配置
console.log(window.KiroAssist.moduleConfig);

// 查看統計資料
console.log(window.KiroAssist.moduleStats);
```

## 📊 性能監控

### 記憶體使用

```javascript
// 檢查記憶體使用（如果瀏覽器支援）
if (performance.memory) {
  console.log('記憶體使用:', performance.memory);
}
```

### 性能指標

```javascript
// 監控點擊響應時間
const startTime = performance.now();
// ... 執行點擊操作
const endTime = performance.now();
console.log('點擊響應時間:', endTime - startTime, 'ms');
```

## 🔗 相關資源

- [MDN - MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [MDN - SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [Kiro AI IDE 文檔](https://kiro.dev/docs)

---

*最後更新：2025-07-17*