const sheets = require('./sheets');

async function getTeam() {
  if (process.env.GOOGLE_SHEET_ID) {
    return await sheets.getTeam();
  }
  return [];
}

async function addMember({ name, role }) {
  const member = {
    id: `member-${Date.now()}`,
    name: name.trim(),
    role: role?.trim() || '',
    createdAt: new Date().toISOString()
  };
  
  if (process.env.GOOGLE_SHEET_ID) {
    await sheets.addTeamMember(member);
  }
  return member;
}

async function deleteMember(id) {
  if (process.env.GOOGLE_SHEET_ID) {
    await sheets.deleteTeamMember(id);
  }
}

async function clearTeam() {
  // Not needed for production sheet workflow
}

module.exports = { getTeam, addMember, deleteMember, clearTeam };
