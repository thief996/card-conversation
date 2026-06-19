# 有感連動套卡網站

越翔牌卡的產品介紹網站，主打「有感連動套卡」以及四套牌卡：

- 感覺卡
- 需要卡
- 我好卡
- 你卡好

網站目標是讓各級教師、輔導工作者、社工、心理師與講師快速理解牌卡用途，並透過 Google 表單完成訂購。

## 目前功能

- 首頁封面主視覺：`assets/有感連動套卡-封面.png`
- 四套牌卡介紹：感覺卡、需要卡、我好卡、你卡好
- 使用情境說明：情緒覺察、需要釐清、卡點轉念、團體互動
- 目標客群說明：教師、助人工作者、帶領者與講師
- 選購區三個入口：
  - 感覺卡需要卡：連到感覺卡／需要卡 Google 表單
  - 有感連動：連到我好卡／你卡好表單，可選有感連動套組
  - 我好卡你卡好：連到我好卡／你卡好 Google 表單
- 響應式版面：支援桌機與手機瀏覽
- 純靜態網站：沒有購物車、會員、後端或資料庫

## 專案結構

```text
牌卡/
  index.html
  styles.css
  assets/
    all-products.jpg
    feelings-cards.jpg
    pricing.jpg
    有感連動套卡-封面.png
    對話開始-標題圖.png
    好好聽見-標題圖.png
  docs/
    PROGRESS.md
  README.md
```

## 啟動方式

這是純 HTML/CSS 靜態網站，可以直接開啟 `index.html`。

建議用本機伺服器預覽，避免部分瀏覽器對本機檔案路徑有限制：

```powershell
cd "C:\Users\User\OneDrive\文件\.Codex\牌卡"
python -m http.server 4173 --bind 127.0.0.1
```

然後開啟：

```text
http://127.0.0.1:4173/
```

如果系統沒有全域 Python，可使用 Codex bundled Python：

```powershell
C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m http.server 4173 --bind 127.0.0.1
```

## 部署方式

目前部署在 GitHub Pages：

- 公開網站：https://thief996.github.io/card-conversation/
- GitHub 倉庫：https://github.com/thief996/card-conversation
- Pages source：`main` branch `/`

部署流程：

1. 修改本機檔案。
2. 確認 `index.html`、`styles.css` 與 `assets/` 圖片正常。
3. Commit 並 push 到 `main`。
4. GitHub Pages 會自動重新建置。
5. 到公開網址確認內容已更新。

目前這個工作環境主要透過 GitHub CLI (`gh`) 將檔案更新到遠端倉庫；若要改用一般 Git 流程，請先確認本機有可用的 `git` 指令。

## 環境變數

目前不需要任何環境變數。

網站沒有前端 build step，也沒有 API key、資料庫連線或後端服務。

## 重要外部連結

- 我好卡／你卡好／有感連動訂購表單：https://forms.gle/pJF5EZMwwSQ1Dfei9
- 感覺卡／需要卡訂購表單：https://forms.gle/RAubpzDNVLbu5bgW9

## 已知問題

- 訂購流程依賴 Google 表單，網站本身不會保存訂單資料。
- 表單品項、價格與運費若有調整，需要同步更新網站文案。
- 圖片檔名含中文；GitHub Pages 可正常顯示，但若移轉到其他平台，需確認編碼與檔案路徑支援。
- 目前沒有自動化測試；更新後需人工檢查桌機、手機版與表單連結。
- `人生牌庫/` 資料夾存在於本機資料夾內，但目前不是這個網站的主要頁面內容，若要納入版本控管或部署，需要另行確認用途。

## 下一步

- 檢查 Google 表單是否仍是最新訂購流程。
- 視需要新增「常見問題」區塊，例如出貨時間、運費、適合對象、玩法說明。
- 若未來需要更完整的銷售流程，可評估串接正式金流或表單後台。
- 為圖片補上更完整的壓縮版本，改善手機載入速度。
- 若要長期維護，建議把本機 `牌卡` 資料夾正式初始化為 Git repo，或 clone 目前 GitHub repo 回本機。
