import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Target, 
  Bell,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-black/20 backdrop-blur-md border-b border-white/5 px-10 flex items-center justify-between z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Target className="text-black w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight hidden md:block">Imihigo<span className="text-emerald-500">Tracker</span></span>
        </Link>

        {/* Centered Navigation Pill */}
        <nav className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-xl">
          <NavPillLink to="/" label="Dashboard" active={location.pathname === '/'} />
          <NavPillLink to="/indicators" label="Indicators" active={location.pathname === '/indicators'} />
          <NavPillLink to="/analytics" label="Analytics" active={location.pathname === '/analytics'} />
          <NavPillLink to="/members" label="Members" active={location.pathname === '/members'} />
          <NavPillLink to="/settings" label="Settings" active={location.pathname === '/settings'} />
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-4 pr-1 py-1">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold leading-none">Jean Doe</p>
            </div>
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-black text-[10px] font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}

function NavPillLink({ to, label, active = false }: { to: string, label: string, active?: boolean }) {
  return (
    <Link 
      to={to}
      className={`
      px-6 py-2 rounded-full text-[13px] font-bold transition-all
      ${active 
        ? 'bg-white/10 text-emerald-500 shadow-inner' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'}
    `}>
      {label}
    </Link>
  );
}
