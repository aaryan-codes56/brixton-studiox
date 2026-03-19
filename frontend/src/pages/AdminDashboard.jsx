import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw, Search, LogOut, LayoutDashboard, Users, Edit3, X,
  Save, Loader2, Download, MessageSquarePlus, ChevronDown, ChevronUp,
  Clock, UserPlus, Trash2, UserCheck
} from 'lucide-react';

// ─── Status Config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  open:        { label: 'Open',        dot: 'bg-green-400',   badge: 'bg-green-400/10 text-green-400 border-green-400/20' },
  contacted:   { label: 'Contacted',   dot: 'bg-blue-400',    badge: 'bg-blue-400/10 text-blue-400 border-blue-400/20' },
  in_progress: { label: 'In Progress', dot: 'bg-yellow-400',  badge: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
  won:         { label: 'Won',         dot: 'bg-emerald-400', badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' },
  lost:        { label: 'Lost',        dot: 'bg-rose-400',    badge: 'bg-rose-400/10 text-rose-400 border-rose-400/20' },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.open;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

// ─── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="border-b border-border-subtle/50 animate-pulse">
    {[1,2,3,4,5,6].map(i => (
      <td key={i} className="py-4 px-4">
        <div className="h-4 bg-white/5 rounded-lg w-full" />
        {i === 1 && <div className="h-3 bg-white/5 rounded-lg w-3/4 mt-2" />}
      </td>
    ))}
  </tr>
);

// ─── Autocomplete Input for Assigned To ────────────────────────────────────────
const AssignedToInput = ({ value, onChange, team }) => {
  const [query, setQuery] = useState(value || '');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = team.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (name) => {
    setQuery(name);
    onChange(name);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={query}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        className="w-full bg-void border border-accent-violet/50 rounded p-2 text-xs text-text-white outline-none"
        placeholder="Assign to..."
      />
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute z-50 top-full mt-1 left-0 w-full bg-[#111] border border-white/10 rounded-xl shadow-xl overflow-hidden"
          >
            {filtered.map(m => (
              <button
                key={m.id}
                onMouseDown={() => select(m.name)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 text-left transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-accent-violet/20 flex items-center justify-center text-[10px] text-accent-violet-light font-bold border border-accent-violet/30 shrink-0">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs text-text-white font-medium">{m.name}</div>
                  {m.role && <div className="text-[10px] text-text-muted">{m.role}</div>}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Notes Panel ───────────────────────────────────────────────────────────────
const NotesPanel = ({ lead, onNoteAdded }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const notes = lead.notes || [];

  const handleAddNote = async () => {
    if (!text.trim()) return;
    setSaving(true);
    try {
      await api.post(`/admin/leads/${lead.id}/notes`, { text });
      toast.success('Note added');
      setText('');
      onNoteAdded(lead.id);
    } catch {
      toast.error('Failed to add note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-2">
      <button onClick={() => setOpen(p => !p)} className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-ice transition-colors">
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {notes.length} {notes.length === 1 ? 'note' : 'notes'}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden mt-2">
            {notes.length > 0 && (
              <div className="space-y-2 mb-3 max-h-40 overflow-y-auto pr-1">
                {notes.map(note => (
                  <div key={note.id} className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5">
                    <p className="text-xs text-text-secondary">{note.text}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Clock size={10} className="text-text-muted" />
                      <span className="text-[10px] text-text-muted">{note.author} · {new Date(note.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input type="text" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddNote()} placeholder="Add a note..." className="flex-1 bg-void border border-white/10 rounded-lg px-3 py-1.5 text-xs text-text-white outline-none focus:border-accent-violet/50 placeholder:text-text-muted" />
              <button onClick={handleAddNote} disabled={saving || !text.trim()} className="p-1.5 rounded-lg bg-accent-violet/20 border border-accent-violet/30 text-accent-violet-light hover:bg-accent-violet/30 transition-colors disabled:opacity-40">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <MessageSquarePlus size={14} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Team Panel (sidebar section) ─────────────────────────────────────────────
const TeamPanel = ({ team, onTeamChange }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [saving, setSaving] = useState(false);

  const addMember = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await api.post('/admin/team', { name, role });
      toast.success('Team member added');
      setName(''); setRole('');
      onTeamChange();
    } catch {
      toast.error('Failed to add member');
    } finally {
      setSaving(false);
    }
  };

  const removeMember = async (id) => {
    try {
      await api.delete(`/admin/team/${id}`);
      toast.success('Member removed');
      onTeamChange();
    } catch {
      toast.error('Failed to remove member');
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-border-subtle font-body">
      <div className="flex items-center gap-2 px-4 mb-4">
        <UserCheck size={15} className="text-accent-ice" />
        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Team</span>
      </div>

      {/* Member list */}
      <div className="px-4 space-y-2 mb-3 max-h-40 overflow-y-auto">
        {team.length === 0 && <p className="text-xs text-text-muted italic">No members yet.</p>}
        {team.map(m => (
          <div key={m.id} className="flex items-center justify-between gap-2 group">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-accent-violet/20 flex items-center justify-center text-[10px] text-accent-violet-light font-bold border border-accent-violet/30 shrink-0">
                {m.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs text-text-white font-medium truncate">{m.name}</div>
                {m.role && <div className="text-[10px] text-text-muted truncate">{m.role}</div>}
              </div>
            </div>
            <button onClick={() => removeMember(m.id)} className="opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-300 transition-all shrink-0">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Add member */}
      <div className="px-4 space-y-2">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-white outline-none focus:border-accent-violet/50 placeholder:text-text-muted" />
        <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="Role (e.g. Editor)" className="w-full bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-white outline-none focus:border-accent-violet/50 placeholder:text-text-muted" />
        <button onClick={addMember} disabled={saving || !name.trim()} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-accent-violet/20 border border-accent-violet/30 text-accent-violet-light text-xs font-semibold hover:bg-accent-violet/30 transition-colors disabled:opacity-40">
          {saving ? <Loader2 size={13} className="animate-spin" /> : <UserPlus size={13} />}
          Add Member
        </button>
      </div>
    </div>
  );
};

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('leads'); // 'leads' | 'team'
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editStatus, setEditStatus] = useState('open');
  const [editAssignedTo, setEditAssignedTo] = useState('');

  const fetchLeads = async (showToast = false) => {
    setLoading(true);
    try {
      const response = await api.get('/admin/leads');
      if (response.data.success) {
        setLeads(response.data.leads || []);
        if (showToast) toast.success('Leads refreshed');
      }
    } catch { toast.error('Failed to fetch leads'); }
    finally { setLoading(false); }
  };

  const fetchTeam = async () => {
    try {
      const res = await api.get('/admin/team');
      if (res.data.success) setTeam(res.data.team || []);
    } catch { /* silent */ }
  };

  useEffect(() => { fetchLeads(); fetchTeam(); }, []);

  const startEdit = (lead) => {
    setEditingId(lead.id);
    setEditComment(lead.comment || '');
    setEditStatus(lead.status || 'open');
    setEditAssignedTo(lead.assignedTo || '');
  };

  const saveEdit = async (id) => {
    try {
      await api.patch(`/admin/leads/${id}`, { status: editStatus, comment: editComment, assignedTo: editAssignedTo });
      toast.success('Lead updated');
      setLeads(prev => prev.map(l => l.id === id
        ? { ...l, status: editStatus, comment: editComment, assignedTo: editAssignedTo, updatedAt: new Date().toISOString() }
        : l
      ));
    } catch { toast.error('Failed to update lead'); }
    finally { setEditingId(null); }
  };

  const handleRefreshAfterNote = async () => {
    try {
      const res = await api.get('/admin/leads');
      if (res.data.success) setLeads(res.data.leads || []);
    } catch { /* silent */ }
  };

  const exportCSV = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = import.meta.env.VITE_API_URL || '/api';
      const res = await fetch(`${baseUrl}/admin/leads/export/csv`, { headers: { Authorization: `Bearer ${token}` } });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `brixton-leads-${Date.now()}.csv`; a.click();
      URL.revokeObjectURL(url);
      toast.success('CSV exported!');
    } catch { toast.error('Failed to export CSV'); }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = [lead.name, lead.email, lead.phone, lead.service, lead.assignedTo]
      .some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'All' ? true : lead.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statCounts = Object.keys(STATUS_CONFIG).reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-void flex flex-col md:flex-row text-text-white selection:bg-accent-violet/30">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-base border-r border-border-subtle p-6 flex flex-col flex-shrink-0 z-10 overflow-y-auto">
        <div className="flex items-baseline gap-1.5 mb-10">
          <span className="font-display font-bold text-2xl tracking-wide gradient-text">BRIXTON</span>
          <span className="font-body opacity-50 text-sm tracking-[0.3em] text-text-white">admin</span>
        </div>
        <nav className="space-y-2 font-body">
          <button onClick={() => setActiveView('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium border transition-colors ${activeView === 'leads' ? 'bg-[rgba(255,255,255,0.08)] text-text-white border-[rgba(255,255,255,0.05)]' : 'text-text-secondary hover:bg-[rgba(255,255,255,0.03)] border-transparent'}`}>
            <LayoutDashboard size={18} className={activeView === 'leads' ? 'text-accent-ice' : ''} /> Dashboard
          </button>
          <button onClick={() => setActiveView('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium border transition-colors ${activeView === 'leads' ? 'text-text-secondary border-transparent' : 'text-text-secondary hover:bg-[rgba(255,255,255,0.03)] border-transparent'}`}>
            <Users size={18} /> Leads
          </button>
        </nav>

        {/* Team panel in sidebar */}
        <TeamPanel team={team} onTeamChange={fetchTeam} />

        <div className="mt-auto pt-6 border-t border-border-subtle font-body">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 rounded-full bg-accent-violet/20 flex items-center justify-center text-accent-violet-light font-bold border border-accent-violet/30">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-text-white/80">{user?.username}</span>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:text-rose-300 transition-colors text-sm font-medium">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl mb-1 text-text-white font-bold">Lead Management</h1>
              <p className="text-text-secondary font-body text-sm">View, update and manage incoming inquiries.</p>
            </div>
            <div className="flex flex-wrap gap-2 font-body text-xs">
              {Object.entries(statCounts).map(([status, count]) => {
                const cfg = STATUS_CONFIG[status];
                return (
                  <div key={status} className={`bg-card border px-3 py-2 rounded-xl flex items-center gap-2 ${cfg.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    <span className="text-text-muted">{cfg.label}:</span>
                    <span className="font-bold">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-card border border-border-medium p-4 md:p-6 rounded-3xl shadow-2xl relative backdrop-blur-sm">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-3 font-body">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full md:w-56">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input type="text" placeholder="Search leads..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-white focus:border-accent-ice outline-none" />
                </div>
                <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-white focus:border-accent-ice outline-none appearance-none">
                  <option value="All" className="bg-void">All Statuses</option>
                  {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                    <option key={k} value={k} className="bg-void">{v.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-gold-light/10 border border-accent-gold-light/20 hover:bg-accent-gold-light/20 text-sm font-medium text-accent-gold-light transition-colors">
                  <Download size={15} /> Export CSV
                </button>
                <button onClick={() => fetchLeads(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-border-subtle hover:bg-[rgba(255,255,255,0.08)] text-sm font-medium transition-colors">
                  <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px] font-body">
                <thead>
                  <tr className="border-b border-border-subtle text-text-secondary text-xs uppercase tracking-wider">
                    <th className="pb-3 px-3 font-semibold">Name & Contact</th>
                    <th className="pb-3 px-3 font-semibold">Service</th>
                    <th className="pb-3 px-3 font-semibold">Assigned To</th>
                    <th className="pb-3 px-3 font-semibold max-w-xs">Message / Notes</th>
                    <th className="pb-3 px-3 font-semibold w-36">Status</th>
                    <th className="pb-3 px-3 font-semibold w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && [1,2,3].map(i => <SkeletonRow key={i} />)}
                  {!loading && filteredLeads.length === 0 && (
                    <tr><td colSpan="6" className="py-12 text-center text-text-muted">No leads found.</td></tr>
                  )}
                  <AnimatePresence>
                    {!loading && filteredLeads.map(lead => (
                      <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-border-subtle/50 hover:bg-[rgba(255,255,255,0.02)] transition-colors group">

                        {/* Name */}
                        <td className="py-4 px-3 align-top">
                          <div className="font-semibold text-text-white text-sm">{lead.name}</div>
                          <div className="text-xs text-text-secondary mt-0.5">{lead.email}</div>
                          <div className="text-xs text-text-secondary">{lead.phone}</div>
                          <div className="text-[10px] text-text-muted mt-1">{new Date(lead.createdAt).toLocaleDateString('en-IN')}</div>
                        </td>

                        {/* Service */}
                        <td className="py-4 px-3 align-top">
                          <span className="inline-block px-2.5 py-1 bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-lg text-xs font-mono text-accent-ice">{lead.service}</span>
                        </td>

                        {/* Assigned To */}
                        <td className="py-4 px-3 align-top">
                          {editingId === lead.id ? (
                            <AssignedToInput value={editAssignedTo} onChange={setEditAssignedTo} team={team} />
                          ) : lead.assignedTo ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-accent-violet/20 flex items-center justify-center text-[10px] text-accent-violet-light font-bold border border-accent-violet/30">{lead.assignedTo.charAt(0).toUpperCase()}</div>
                              <span className="text-xs text-text-white">{lead.assignedTo}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-text-muted italic">Unassigned</span>
                          )}
                        </td>

                        {/* Message / Notes */}
                        <td className="py-4 px-3 align-top max-w-xs">
                          {editingId === lead.id ? (
                            <textarea value={editComment} onChange={e => setEditComment(e.target.value)} className="w-full bg-void border border-accent-violet/50 rounded p-2 text-xs text-text-white resize-none h-20 outline-none" placeholder="Admin comment..." />
                          ) : (
                            <div className="space-y-2">
                              {lead.message && <p className="text-xs text-text-secondary line-clamp-2" title={lead.message}>{lead.message}</p>}
                              {lead.comment && <p className="text-xs text-accent-violet-light italic">{lead.comment}</p>}
                              <NotesPanel lead={lead} onNoteAdded={handleRefreshAfterNote} />
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-3 align-top">
                          {editingId === lead.id ? (
                            <select value={editStatus} onChange={e => setEditStatus(e.target.value)} className="bg-void border border-border-subtle rounded p-1 text-xs text-text-white outline-none">
                              {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                                <option key={k} value={k} className="bg-void">{v.label}</option>
                              ))}
                            </select>
                          ) : (
                            <StatusBadge status={lead.status} />
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-3 align-top">
                          {editingId === lead.id ? (
                            <div className="flex gap-2">
                              <button onClick={() => saveEdit(lead.id)} className="p-1.5 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30" title="Save"><Save size={14} /></button>
                              <button onClick={() => setEditingId(null)} className="p-1.5 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30" title="Cancel"><X size={14} /></button>
                            </div>
                          ) : (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEdit(lead)} className="p-1.5 rounded bg-[rgba(255,255,255,0.03)] border border-border-subtle hover:text-accent-ice hover:border-accent-ice/50 transition-colors" title="Edit"><Edit3 size={14} /></button>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
