# Google Sheets Contact Form Script Documentation

## Overview
This script handles form submissions and saves the data into a Google Sheet. When a user fills out the contact form and submits it, the script processes the data and records it in the designated spreadsheet.

## Setup Instructions
1. **Open Google Sheets:** Create a new Google Sheet where form data will be stored.
2. **Go to Extensions > Apps Script:** Open the Apps Script editor.
3. **Paste the Script:** Copy and paste the provided script into the editor.
4. **Save and Deploy:** Click the "Deploy" button and choose "Web app."
   - Set access to "Anyone" if needed for public submissions.
5. **Copy the Web App URL:** Use this URL in your form’s `action` attribute for submissions.

## Script Workflow
1. The form sends a `POST` request containing user input.
2. The script extracts form data.
3. Data is appended to the Google Sheet.
4. (Optional) A confirmation email is sent to the user.

## Key Functions
- `doPost(e)`: Handles form submissions and saves data.
- `LockService.getScriptLock()`: Prevents concurrent script execution issues.
- `sheet.getRange().setValues()`: Writes submitted form data into the sheet.

## Code Implementation
```javascript
var sheetName = 'contact form';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  finally {
    lock.releaseLock();
  }
}
```

## Troubleshooting
- **No data appearing?** Check script permissions and redeploy.
- **Errors in submission?** Verify form field names match script expectations.

This documentation ensures smooth integration and usage of the contact form script with Google Sheets.
