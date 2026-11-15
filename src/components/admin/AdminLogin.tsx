import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToSite }) => {
  const { login } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-grid-notebook flex flex-col items-center justify-center p-4">
      {/* Return to website */}
      <button
        onClick={onBackToSite}
        className="mb-6 btn-neo text-xs flex items-center gap-2 bg-white"
      >
        <ArrowLeft size={16} />
        <span>BACK TO PUBLIC PORTFOLIO</span>
      </button>

      {/* Main Neo-Brutalist Authentication Window */}
      <div className="w-full max-w-md bg-white border-4 border-retro-black shadow-neo-xl overflow-hidden">
        {/* Retro Header Bar */}
        <div className="bg-retro-black text-white px-4 py-3 flex items-center justify-between border-b-4 border-retro-black">
          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <span className="w-3 h-3 bg-retro-lime inline-block" />
            <span>ADMIN_AUTHENTICATION.EXE</span>
          </div>
          <span className="text-[10px] font-mono bg-retro-purple px-2 py-0.5 text-white">RESTRICTED</span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-retro-yellow border-3 border-retro-black mx-auto flex items-center justify-center shadow-neo">
              <ShieldCheck size={30} className="text-retro-black" />
            </div>
            <h1 className="font-display text-2xl font-black uppercase tracking-wider text-retro-black">
              ADMINISTRATOR LOGIN
            </h1>
            <p className="font-mono text-xs text-gray-600">
              Sign in with your authorized administrator account to manage portfolio content.
            </p>
          </div>

          {error && (
            <div className="bg-retro-pink/20 border-2 border-retro-pink p-3 font-mono text-xs font-bold text-retro-black">
              ⚠️ {error}
            </div>
          )}

          {/* Clean Login Form: Email, Password, Show/Hide Password, Login Button */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase text-retro-black mb-1">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input-neo pl-10"
                  autoComplete="email"
                />
                <Mail size={16} className="absolute left-3.5 top-3 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase text-retro-black mb-1">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-neo pl-10 pr-10"
                  autoComplete="current-password"
                />
                <Lock size={16} className="absolute left-3.5 top-3 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-retro-black focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-neo-lime w-full py-3 text-sm font-black flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>AUTHENTICATING WITH SUPABASE...</span>
              ) : (
                <>
                  <span>LOGIN TO DASHBOARD</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-retro-cream border-t-2 border-retro-black px-6 py-2.5 text-center font-mono text-[10px] text-gray-500">
          Protected by Supabase Auth & Row Level Security (RLS)
        </div>
      </div>
    </div>
  );
};
