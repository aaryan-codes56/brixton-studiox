const { google } = require('googleapis');

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// Header row format
const HEADERS = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Comment', 'CreatedAt', 'UpdatedAt', 'AssignedTo'];

/**
 * Ensures the header row exists on the sheet to avoid blank headers or offset data.
 */
async function initializeSheet() {
  if (!SHEET_ID || !process.env.GOOGLE_PRIVATE_KEY) return;
  
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1:K1',
    });
    
    if (!res.data.values || res.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A1:K1',
        valueInputOption: 'USER_ENTERED',
        resource: { values: [HEADERS] },
      });
      console.log('Google Sheet headers initialized.');
    }
  } catch (error) {
    console.warn('Failed to initialize Google Sheet headers:', error.message);
  }
}

/**
 * Appends a new lead to the spreadsheet
 */
async function appendLead(lead) {
  const row = [
    lead.id,
    lead.name,
    lead.email,
    lead.phone,
    lead.service,
    lead.message,
    lead.status || 'open',
    lead.comment || '',
    lead.createdAt,
    lead.updatedAt,
    lead.assignedTo || ''
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A:K',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: { values: [row] },
  });
}

/**
 * Gets all leads from the spreadsheet
 */
async function getAllLeads() {
  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A2:K',
  });

  const rows = getRes.data.values || [];
  return rows.map((row) => ({
    id: row[0] || '',
    name: row[1] || '',
    email: row[2] || '',
    phone: row[3] || '',
    service: row[4] || '',
    message: row[5] || '',
    status: row[6] || '',
    comment: row[7] || '',
    createdAt: row[8] || '',
    updatedAt: row[9] || '',
    assignedTo: row[10] || ''
  })).reverse(); // newest first
}

/**
 * Updates a lead by ID (updates Status, Comment, UpdatedAt, AssignedTo)
 */
async function updateLead(id, updates) {
  // First, find the row index where this ID resides
  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A:K',
  });

  const rows = getRes.data.values;
  if (!rows) throw new Error('Sheet is empty');

  // row indices in Sheets API are 1-based. 
  // rows[0] is typically Header. So index 0 -> row 1.
  const rowIndex = rows.findIndex((row) => row[0] === id);
  if (rowIndex === -1) throw new Error('Lead not found');

  const sheetRow = rowIndex + 1;
  const existingRow = rows[rowIndex];

  const updatedStatus = updates.status !== undefined ? updates.status : existingRow[6];
  const updatedComment = updates.comment !== undefined ? updates.comment : existingRow[7];
  const updatedAssignedTo = updates.assignedTo !== undefined ? updates.assignedTo : existingRow[10];
  const updatedDate = new Date().toISOString();

  // We are updating columns G, H, J, K (Status, Comment, UpdatedAt, AssignedTo) -> indices 6, 7, 9, 10
  const newRow = [...existingRow];
  // ensure array has 11 elements
  while(newRow.length < 11) newRow.push('');
  newRow[6] = updatedStatus;
  newRow[7] = updatedComment;
  newRow[9] = updatedDate;
  newRow[10] = updatedAssignedTo;

  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `Sheet1!A${sheetRow}:K${sheetRow}`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [newRow] },
  });

  return { id, status: updatedStatus, comment: updatedComment, updatedAt: updatedDate };
}

// Call on startup
// if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY')) {
//     initializeSheet();
// }

module.exports = {
  initializeSheet,
  appendLead,
  getAllLeads,
  updateLead
};
