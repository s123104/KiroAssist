# 📚 KiroAssist API 文檔

本文檔詳細說明 KiroAssist 的所有 API 接口和使用方法。

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

### `AutoRetryClicker` 類別

主控制器類別，可通過 `window.AutoRetryClicker` 訪問。

#### 屬性

##### `version`
```javascript
const version = window.AutoRetryClicker.version;
// 返回: "3.0.1"
```
- **類型**：`string`
- **描述**：當前版本號
- **只讀**：是

##### `isRunning`
```javascript
const isRunning = window.AutoRetryClicker.isRunning;
// 返回: true | false
```
- **類型**：`boolean`
- **描述**：當前運行狀態
- **只讀**：是

##### `totalClicks`
```javascript
const totalClicks = window.AutoRetryClicker.totalClicks;
// 返回: number
```
- **類型**：`number`
- **描述**：總點擊次數
- **只讀**：是

##### `minClickInterval`
```javascript
// 獲取當前間隔
const interval = window.AutoRetryClicker.minClickInterval;

// 設置新間隔（毫秒）
window.AutoRetryClicker.minClickInterval = 3000; // 3秒
```
- **類型**：`number`
- **描述**：最小點擊間隔（毫秒）
- **預設值**：`2000`
- **可寫**：是

#### 方法

##### `start()`

啟動自動監控。

```javascript
window.AutoRetryClicker.start();
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
window.AutoRetryClicker.stop();
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
const status = window.AutoRetryClicker.getStatus();
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
window.AutoRetryClicker.showPanel();
```

**參數**：無

**返回值**：`undefined`

**使用場景**：當面板被隱藏後重新顯示

##### `hidePanel()`

隱藏控制面板。

```javascript
window.AutoRetryClicker.hidePanel();
```

**參數**：無

**返回值**：`undefined`

**使用場景**：需要暫時隱藏面板時

##### `toggleMinimize()`

切換面板最小化狀態。

```javascript
window.AutoRetryClicker.toggleMinimize();
```

**參數**：無

**返回值**：`undefined`

**功能**：
- 如果面板已展開，則最小化
- 如果面板已最小化，則展開

##### `log(message, type)`

添加日誌記錄。

```javascript
window.AutoRetryClicker.log("自定義訊息", "info");
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

#### `findRetryButton()`

尋找頁面上的 Retry 按鈕。

```javascript
const button = window.AutoRetryClicker.findRetryButton();
```

**返回值**：`HTMLElement | null`

**檢測規則**：
- 包含 "Retry"、"重試"、"重新嘗試" 等文字
- 具有相關的 aria-label 或 title 屬性
- 符合預定義的 CSS 選擇器

#### `isElementVisible(element)`

檢查元素是否可見。

```javascript
const isVisible = window.AutoRetryClicker.isElementVisible(element);
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
const isClickable = window.AutoRetryClicker.isElementClickable(element);
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
// 獲取當前選擇器
const selectors = window.AutoRetryClicker.RETRY_SELECTORS;

// 添加自定義選擇器（需要修改源碼）
const customSelectors = [
  'button.my-retry-btn',
  '[data-action="retry"]'
];
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
  window.AutoRetryClicker.start();
} catch (error) {
  console.error('KiroAssist 啟動失敗:', error);
  // 處理錯誤
}
```

### 調試模式

```javascript
// 啟用詳細日誌
window.AutoRetryClicker.debugMode = true;

// 查看內部狀態
console.log(window.AutoRetryClicker);
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