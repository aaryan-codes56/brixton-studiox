const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const TEAM_FILE = path.join(DATA_DIR, 'team.json');

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(TEAM_FILE);
  } catch {
    await fs.writeFile(TEAM_FILE, JSON.stringify([], null, 2));
  }
}

async function getTeam() {
  await ensureFile();
  const data = await fs.readFile(TEAM_FILE, 'utf8');
  return JSON.parse(data);
}

async function addMember({ name, role }) {
  await ensureFile();
  const team = await getTeam();
  const member = {
    id: `member-${Date.now()}`,
    name: name.trim(),
    role: role?.trim() || '',
    createdAt: new Date().toISOString()
  };
  team.push(member);
  await fs.writeFile(TEAM_FILE, JSON.stringify(team, null, 2));
  return member;
}

async function deleteMember(id) {
  await ensureFile();
  const team = await getTeam();
  const filtered = team.filter(m => m.id !== id);
  if (filtered.length === team.length) throw new Error('Member not found');
  await fs.writeFile(TEAM_FILE, JSON.stringify(filtered, null, 2));
}

async function clearTeam() {
  await ensureFile();
  await fs.writeFile(TEAM_FILE, JSON.stringify([], null, 2));
}

module.exports = { getTeam, addMember, deleteMember, clearTeam };
