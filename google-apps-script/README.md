# RSVP → Google Sheets setup

Hai thiệp (`/thanhpb` nhà trai, `/linhbd` nhà gái) gửi RSVP tới **hai Google Sheet khác nhau**. Mỗi sheet cần một bản Apps Script + một URL web app riêng.

## 1. Create two sheets
Tạo 2 file Google Sheet (https://sheets.new), ví dụ:
- `RSVP — Nhà trai (thanhpb)`
- `RSVP — Nhà gái (linhbd)`

## 2. Add the script (làm 2 lần, mỗi sheet một lần)
Trên từng file:
- Extensions → Apps Script
- Xóa code mặc định, dán nội dung `Code.gs`, lưu (Ctrl/Cmd+S).

## 3. Deploy (làm 2 lần, mỗi project Apps Script một lần)
- Deploy → New deployment → Select type: Web app
- Description: `RSVP nhà trai` hoặc `RSVP nhà gái`
- Execute as: **Me**
- Who has access: **Anyone**
- Click Deploy, approve the permissions prompt (Google will warn it's unverified —
  click Advanced → Go to project). This grants the script access to your Google
  Sheets spreadsheets, which is required to write rows.
- Copy the web app URL (looks like
  `https://script.google.com/macros/s/AKfycb.../exec`).

Hai URL sẽ **khác nhau**. Đừng dùng chung một URL cho cả hai nhà.

## 4. Connect the site
Mở `src/config/invitation.ts`, dán URL vào `RSVP_SHEETS`:

```ts
const RSVP_SHEETS = {
  thanhpb: 'https://script.google.com/macros/s/...nha-trai.../exec',
  linhbd: 'https://script.google.com/macros/s/...nha-gai.../exec',
}
```

- Rebuild/redeploy the site.

## 5. Test
- Gửi form trên `/thanhpb` → chỉ sheet nhà trai có dòng mới.
- Gửi form trên `/linhbd` → chỉ sheet nhà gái có dòng mới.
- Mỗi sheet có tab `RSVP`: Timestamp | Name | Attending | Transport | Wish.
- You don't need to create the `RSVP` tab yourself — the script creates it with
  headers on the first submission. If the sheet still has old columns
  (`Guests`, `Event`, …), the next request rewrites the header row.

## Updating the script later
After editing Code.gs in the Apps Script editor, you must deploy a **new version**
on **cả hai** project (Deploy → Manage deployments → Edit (pencil) → New version)
or the old code keeps running.
