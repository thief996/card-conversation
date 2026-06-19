# 進度紀錄

## 2026-06-19

### 今天完成什麼

- 新增專案交接文件 `README.md`。
- 新增 AI 與後續維護用進度文件 `docs/PROGRESS.md`。
- 整理目前網站用途、功能、啟動方式、部署方式、環境變數、已知問題與下一步。
- 確認目前 GitHub Pages 最新公開網址為：
  - https://thief996.github.io/card-conversation/

### 改了哪些重要檔案

- `README.md`
  - 新增完整專案說明與維護指南。
- `docs/PROGRESS.md`
  - 新增日期式進度紀錄，方便下一次 AI 或人工接手。

### 做了哪些決策

- 專案定位維持為純靜態網站，不加入購物車、後端或資料庫。
- 訂購流程維持導向 Google 表單：
  - 感覺卡／需要卡：https://forms.gle/RAubpzDNVLbu5bgW9
  - 我好卡／你卡好／有感連動：https://forms.gle/pJF5EZMwwSQ1Dfei9
- 文件以 GitHub 與 AI 交接為優先，不改動網站版面與素材。
- 在 README 中明確標註 `人生牌庫/` 目前不是主要網站內容，避免後續接手者誤判。

### 目前卡在哪裡

- 本機資料夾目前不是標準 Git checkout 狀態；之前主要透過 GitHub CLI (`gh`) API 將檔案推到 GitHub。
- 若未來要使用一般 `git status`、`git commit`、`git push` 流程，需要先確認本機有 Git，並將遠端 repo clone 或初始化到正確資料夾。
- 沒有自動化測試，發布後仍需人工檢查主要畫面與表單連結。

### 下次接手要先看什麼

1. 先讀 `README.md`，確認專案用途、部署方式與已知問題。
2. 檢查 `index.html` 的表單連結是否仍與最新銷售流程一致。
3. 檢查 `styles.css` 的響應式設定，尤其是封面圖與選購區在手機版的呈現。
4. 若要更新素材，先看 `assets/` 裡目前使用的圖片檔名，避免改名後造成 GitHub Pages 路徑失效。
5. 若要部署，確認 GitHub Pages 狀態為 built，並到公開網址實際打開頁面。
