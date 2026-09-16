/**
 * RSVP → Google Sheets
 *
 * Setup:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this file, save
 * 3. Deploy → New deployment → Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the web app URL into src/config/invitation.ts
 *      RSVP_SHEETS.thanhpb  (nhà trai) hoặc RSVP_SHEETS.linhbd (nhà gái)
 */

const HEADERS = ['Timestamp', 'Name', 'Attending', 'Guests', 'Wish', 'Event']

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName('RSVP')
  if (!sheet) sheet = ss.insertSheet('RSVP')
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    return sheet
  }

  const lastCol = Math.max(sheet.getLastColumn(), 1)
  const existing = sheet.getRange(1, 1, 1, lastCol).getValues()[0]
  const headerMismatch = HEADERS.some((label, i) => String(existing[i] || '') !== label)
  if (headerMismatch) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold')
  }
  return sheet
}

function wishFrom_(data) {
  if (data.wish) return String(data.wish).trim()
  const answers = Array.isArray(data.answers) ? data.answers : []
  const wishAnswer = answers.find((a) => /lời chúc|wish/i.test(String(a.question || '')))
  return wishAnswer ? String(wishAnswer.answer || '').trim() : ''
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const name = String(data.name || '').trim()
    const attending = data.attending === 'no' ? 'no' : 'yes'
    const guests = ''
    const wish = wishFrom_(data)
    const event = String(data.event || '').trim()

    getSheet_().appendRow([new Date(), name, attending, guests, wish, event])

    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}
