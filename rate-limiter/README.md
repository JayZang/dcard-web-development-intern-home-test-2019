# Rate Limiter 

## 題目內容

### Dcard 每天午夜都有大量使用者湧入抽卡，為了不讓伺服器過載，請設計一個 middleware：
- 限制每小時來自同一個 IP 的請求數量不得超過 1000
- 在 response headers 中加入剩餘的請求數量 (X-RateLimit-Remaining) 以及 rate limit 歸零的時間 (X-RateLimit-Reset)
- 如果超過限制的話就回傳 429 (Too Many Requests)
- 可以使用各種資料庫達成

## 建置

### 前置條件
- 已安裝好 node 及 npm
- 開啟 Redis Server ( 使用預設設定 )

### 開始建置並啟用
下載並至此資料夾 ( rate-limiter )，執行下列命令:
```bash
npm install
npm run build
npm run start
```
server 預設監聽 8080 Port : [127.0.0.1:8080](127.0.0.1:8080) .