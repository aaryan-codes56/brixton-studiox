import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Lock, User, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        toast.success(`Welcome back, ${username}!`);
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (_error) {
       toast.error('Failed to login. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center p-6 relative">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-violet/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="flex flex-col items-center mb-8">
         <div className="flex items-baseline gap-1.5 mb-2">
            <span className="font-display font-bold text-3xl tracking-wide gradient-text">BRIXTON</span>
            <span className="font-body opacity-50 text-xl tracking-[0.3em] text-text-white">studiox</span>
         </div>
         <span className="font-mono text-sm tracking-widest text-text-muted uppercase border-t border-border-subtle pt-2 mt-2 w-full text-center">Admin Portal</span>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-card border border-border-subtle backdrop-blur-md p-8 rounded-3xl relative overflow-hidden">
        
        <h2 className="text-2xl font-display font-bold text-text-white mb-8 text-center">Secure Login</h2>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-text-secondary mb-2">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User size={18} className="text-text-muted" />
            </div>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-xl pl-12 pr-4 py-3 text-text-white focus:outline-none focus:border-accent-violet transition-all"
              placeholder="Enter username"
            />
          </div>
        </div>

        <div className="mb-8 relative">
          <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={18} className="text-text-muted" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-border-subtle rounded-xl pl-12 pr-4 py-3 text-text-white focus:outline-none focus:border-accent-violet transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[var(--gradient-brand)] text-text-white font-semibold shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Authenticate'}
        </button>
      </form>
      
      <a href="/" className="mt-8 text-text-muted hover:text-text-white transition-colors text-sm underline decoration-white/20 underline-offset-4">
        &larr; Return to main site
      </a>
    </div>
  );
};

export default AdminLogin;
