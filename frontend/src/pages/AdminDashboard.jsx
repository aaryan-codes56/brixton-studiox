import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Search, LogOut, LayoutDashboard, Users, CheckCircle, XCircle, Edit3, X, Save, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editStatus, setEditStatus] = useState('open');

  const fetchLeads = async (showToast = false) => {
    setLoading(true);
    try {
      const response = await api.get('/admin/leads');
      if (response.data.success) {
        setLeads(response.data.leads || []);
        if (showToast) toast.success('Leads refreshed');
      }
    } catch (_err) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    // Optimistic update
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    try {
      await api.patch(`/admin/leads/${id}`, { status: newStatus });
      toast.success(`Lead marked as ${newStatus}`);
    } catch (_err) {
      toast.error('Failed to update status');
      fetchLeads(); // Revert
    }
  };

  const startEdit = (lead) => {
    setEditingId(lead.id);
    setEditComment(lead.comment || '');
    setEditStatus(lead.status);
  };

  const saveEdit = async (id) => {
    try {
      await api.patch(`/admin/leads/${id}`, { status: editStatus, comment: editComment });
      toast.success('Lead updated successfully');
      setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: editStatus, comment: editComment, updatedAt: new Date().toISOString() } : lead));
    } catch (_err) {
      toast.error('Failed to update lead');
    } finally {
      setEditingId(null);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = [lead.name, lead.email, lead.phone, lead.service].some(val => 
      val?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filter === 'All' ? true : lead.status === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const openCount = leads.filter(l => l.status === 'open').length;
  const closedCount = leads.filter(l => l.status === 'closed').length;

  return (
    <div className="min-h-screen bg-void flex flex-col md:flex-row text-text-white selection:bg-accent-violet/30">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-base border-r border-y-0 border-l-0 border-border-subtle p-6 flex flex-col flex-shrink-0 z-10">
        <div className="flex items-baseline gap-1.5 mb-12">
           <span className="font-display font-bold text-2xl tracking-wide gradient-text">BRIXTON</span>
           <span className="font-body opacity-50 text-sm tracking-[0.3em] text-text-white">admin</span>
        </div>
        
        <nav className="flex-1 space-y-2 font-body">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.08)] text-text-white font-medium border border-[rgba(255,255,255,0.05)]">
            <LayoutDashboard size={18} className="text-accent-ice" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-[rgba(255,255,255,0.03)] hover:text-text-white transition-colors border border-transparent hover:border-border-subtle">
            <Users size={18} />
            Leads
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-border-subtle font-body">
          <div className="flex items-center gap-3 mb-6 px-4">
             <div className="w-8 h-8 rounded-full bg-accent-violet/20 flex items-center justify-center text-accent-violet-light font-bold border border-accent-violet/30">
               {user?.username?.charAt(0).toUpperCase()}
             </div>
             <span className="text-sm font-medium text-text-white/80">{user?.username}</span>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:text-rose-300 transition-colors text-sm font-medium">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 relative overflow-hidden h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
            <div>
               <h1 className="font-display text-4xl mb-2 text-text-white font-bold">Lead Management</h1>
               <p className="text-text-secondary font-body">View and update incoming inquiries.</p>
            </div>
            
            <div className="flex flex-wrap gap-4 font-body text-sm">
               <div className="bg-card border border-border-subtle px-4 py-2 rounded-xl flex items-center gap-2">
                 <span className="text-text-muted">Total:</span> 
                 <span className="font-bold text-text-white">{leads.length}</span>
               </div>
               <div className="bg-card border border-[rgba(34,197,94,0.2)] px-4 py-2 rounded-xl flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <span className="text-text-muted">Open:</span> 
                 <span className="font-bold text-text-white">{openCount}</span>
               </div>
               <div className="bg-card border border-border-subtle px-4 py-2 rounded-xl flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                 <span className="text-text-muted">Closed:</span> 
                 <span className="font-bold text-text-white">{closedCount}</span>
               </div>
            </div>
          </div>

          <div className="bg-card border border-border-medium p-6 rounded-3xl flex flex-col mb-8 shadow-2xl relative z-10 backdrop-blur-sm">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4 font-body">
               <div className="flex items-center gap-3">
                 <div className="relative w-full md:w-64">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search size={16} className="text-text-muted" />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Search leads..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-lg pl-10 pr-4 py-2 text-sm text-text-white focus:border-accent-ice outline-none transition-colors"
                   />
                 </div>
                 <select 
                   value={filter}
                   onChange={(e) => setFilter(e.target.value)}
                   className="bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-white focus:border-accent-ice outline-none appearance-none"
                 >
                   <option value="All" className="bg-void">All Statuses</option>
                   <option value="Open" className="bg-void">Open Only</option>
                   <option value="Closed" className="bg-void">Closed Only</option>
                 </select>
               </div>
               
               <button 
                 onClick={() => fetchLeads(true)}
                 className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-border-subtle hover:bg-[rgba(255,255,255,0.08)] text-sm font-medium transition-colors text-text-white"
               >
                 <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                 Refresh
               </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px] font-body">
                <thead>
                  <tr className="border-b border-border-subtle text-text-secondary text-xs uppercase tracking-wider">
                    <th className="pb-3 px-4 font-semibold">Name & Contact</th>
                    <th className="pb-3 px-4 font-semibold">Service</th>
                    <th className="pb-3 px-4 font-semibold max-w-xs">Message / Comment</th>
                    <th className="pb-3 px-4 font-semibold w-32">Status</th>
                    <th className="pb-3 px-4 font-semibold w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredLeads.length === 0 && !loading && (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-text-muted">No leads found.</td>
                      </tr>
                    )}
                    {filteredLeads.map((lead) => (
                      <motion.tr 
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`border-b border-border-subtle/50 hover:bg-[rgba(255,255,255,0.02)] transition-colors group ${lead.status === 'closed' ? 'opacity-60' : ''}`}
                      >
                        <td className="py-4 px-4 align-top">
                          <div className="font-semibold text-text-white mb-1">{lead.name}</div>
                          <div className="text-sm text-text-secondary">{lead.email}</div>
                          <div className="text-sm text-text-secondary">{lead.phone}</div>
                          <div className="text-xs text-text-muted mt-1">{new Date(lead.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="py-4 px-4 align-top">
                          <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-lg text-xs font-mono text-accent-ice break-words shadow-sm">
                            {lead.service}
                          </span>
                        </td>
                        <td className="py-4 px-4 align-top max-w-xs">
                          {editingId === lead.id ? (
                            <div className="flex flex-col gap-2">
                              <textarea 
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                                className="w-full bg-void border border-accent-violet/50 rounded p-2 text-sm text-text-white resize-none h-20 outline-none"
                                placeholder="Add admin comment..."
                              />
                              <select 
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                                className="bg-void border border-border-subtle rounded p-1 text-sm text-text-white outline-none w-max"
                              >
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                              </select>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-3">
                              {lead.message && (
                                <div>
                                  <span className="text-[10px] uppercase tracking-wider text-text-muted block mb-0.5">Message</span>
                                  <p className="text-sm text-text-secondary line-clamp-2" title={lead.message}>{lead.message}</p>
                                </div>
                              )}
                              {lead.comment && (
                                <div>
                                  <span className="text-[10px] uppercase tracking-wider text-accent-violet block mb-0.5">Admin Comment</span>
                                  <p className="text-sm text-accent-violet-light italic">{lead.comment}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 align-top">
                          {editingId !== lead.id && (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                              lead.status === 'open' ? 'bg-[rgba(34,197,94,0.1)] text-green-400 border-[rgba(34,197,94,0.2)]' : 'bg-[rgba(107,114,128,0.1)] text-gray-400 border-[rgba(107,114,128,0.2)]'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${lead.status === 'open' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                              {lead.status.toUpperCase()}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 align-top">
                          {editingId === lead.id ? (
                            <div className="flex gap-2">
                              <button onClick={() => saveEdit(lead.id)} className="p-1.5 rounded bg-[rgba(34,197,94,0.2)] text-green-400 hover:bg-[rgba(34,197,94,0.3)] transition-colors border border-[rgba(34,197,94,0.3)]" title="Save">
                                <Save size={16} />
                              </button>
                              <button onClick={() => setEditingId(null)} className="p-1.5 rounded bg-[rgba(244,63,94,0.2)] text-rose-400 hover:bg-[rgba(244,63,94,0.3)] transition-colors border border-[rgba(244,63,94,0.3)]" title="Cancel">
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => startEdit(lead)} className="p-1.5 rounded bg-[rgba(255,255,255,0.03)] border border-border-subtle hover:text-accent-ice hover:border-accent-ice/50 transition-colors" title="Edit Lead">
                                <Edit3 size={16} />
                              </button>
                              <button 
                                onClick={() => handleToggleStatus(lead.id, lead.status)} 
                                className={`p-1.5 rounded border transition-colors ${
                                  lead.status === 'open' ? 'bg-[rgba(255,255,255,0.03)] border-border-subtle hover:bg-[rgba(244,63,94,0.2)] hover:text-rose-400 hover:border-[rgba(244,63,94,0.3)]' : 'bg-[rgba(255,255,255,0.03)] border-border-subtle hover:bg-[rgba(34,197,94,0.2)] hover:text-green-400 hover:border-[rgba(34,197,94,0.3)]'
                                }`} 
                                title={lead.status === 'open' ? "Close Lead" : "Re-open Lead"}
                              >
                                {lead.status === 'open' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                              </button>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {loading && <div className="absolute inset-0 bg-base/50 backdrop-blur-sm flex items-center justify-center z-20"><Loader2 className="w-8 h-8 animate-spin text-accent-ice" /></div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
