// ──────────────────────────────────────────────────────────
// RANK Homes — Contact Form → Google Sheets
// Deploy as: Extensions > Apps Script > Deploy > Web App
//   Execute as: Me
//   Who has access: Anyone
// Copy the Web App URL into index.html (SHEET_URL constant)
// ──────────────────────────────────────────────────────────

const SHEET_NAME = "Enquiries"; // tab name in your spreadsheet

function doPost(e) {
  try {
    const data = e.parameter;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Type", "First Name", "Last Name", "Email",
        "Phone", "Interest", "Message"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    }

    sheet.appendRow([
      new Date().toLocaleString("en-AU", { timeZone: "Australia/Melbourne" }),
      data.type      || "Full",
      data.firstName || "",
      data.lastName  || "",
      data.email     || "",
      data.phone     || "",
      data.interest  || "",
      data.message   || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles preflight CORS checks from the browser
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
