const { google } = require('googleapis');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

async function clearSheet() {
  if (!SHEET_ID || !process.env.GOOGLE_PRIVATE_KEY) {
    console.error('Google Sheets credentials not found in .env');
    return;
  }

  try {
    // Clear everything from Row 2 downwards (preserving headers)
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A2:K1000',
    });
    console.log('Google Sheet data cleared (Rows 2-1000).');
  } catch (error) {
    console.error('Failed to clear Google Sheet data:', error.message);
  }
}

clearSheet();
