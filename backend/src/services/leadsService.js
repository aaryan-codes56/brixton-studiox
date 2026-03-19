const fs = require('fs').promises;
const path = require('path');

const LEADS_FILE = path.join(__dirname, '../../data/leads.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dir = path.dirname(LEADS_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2));
  }
}

/**
 * Generates the next sequential BX ID (BX01, BX02, ...)
 */
async function generateId() {
  await ensureDataDir();
  const data = await fs.readFile(LEADS_FILE, 'utf8');
  const leads = JSON.parse(data);
  const next = leads.length + 1;
  return `BX${String(next).padStart(2, '0')}`;
}

/**
 * Saves a new lead to the local JSON file
 */
async function saveLead(lead) {
  await ensureDataDir();
  const data = await fs.readFile(LEADS_FILE, 'utf8');
  const leads = JSON.parse(data);
  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  return lead;
}

/**
 * Gets all leads from the local JSON file
 */
async function getLeads() {
  await ensureDataDir();
  const data = await fs.readFile(LEADS_FILE, 'utf8');
  return JSON.parse(data).reverse(); // Newest first
}

/**
 * Updates a lead by ID in the local JSON file
 */
async function updateLead(id, updates) {
  await ensureDataDir();
  const data = await fs.readFile(LEADS_FILE, 'utf8');
  let leads = JSON.parse(data);
  
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) throw new Error('Lead not found');
  
  const updatedLead = {
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  leads[index] = updatedLead;
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  return updatedLead;
}

/**
 * Adds a timestamped note to a lead by ID
 */
async function addNote(id, { text, author = 'Admin' }) {
  await ensureDataDir();
  const data = await fs.readFile(LEADS_FILE, 'utf8');
  let leads = JSON.parse(data);

  const index = leads.findIndex(l => l.id === id);
  if (index === -1) throw new Error('Lead not found');

  const note = {
    id: `note-${Date.now()}`,
    text,
    author,
    createdAt: new Date().toISOString()
  };

  if (!leads[index].notes) leads[index].notes = [];
  leads[index].notes.push(note);
  leads[index].updatedAt = new Date().toISOString();

  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  return note;
}

/**
 * Clears all leads from the local JSON file
 */
async function clearAllLeads() {
  await ensureDataDir();
  await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2));
}

module.exports = {
  generateId,
  saveLead,
  getLeads,
  updateLead,
  addNote,
  clearAllLeads
};
