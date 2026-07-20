'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  User,
  Trash2
} from 'lucide-react';
import { useRealtime } from '@/context/RealtimeContext';

interface TopbarProps {
  onMenuToggle: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuToggle }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showNotifications, setShowNotifications] = useState(false);
  const { alerts, clearAlerts, perspective, setPerspective } = useRealtime();

  useEffect(() => {
    // Initial theme set to dark on load (dark-mode-first styling)
    const currentTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (currentTheme) {
      setTheme(currentTheme);
      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-slate-900/60 dark:bg-slate-950/60 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-20 transition-all duration-300">
      {/* Left items: Mobile Hamburger and Page Identifier */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle} 
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>
        <div className="hidden sm:flex items-center bg-slate-800/40 rounded-xl px-3 py-1.5 border border-slate-800/80 w-64">
          <Search size={16} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search directory, leaves..." 
            className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Right items: Actions, Theme Toggle, Notification Bell */}
      <div className="flex items-center gap-3">
        {/* Perspective Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800/40 border border-slate-800/80 rounded-xl px-2.5 py-1.5 select-none text-[11px] font-bold text-slate-300 hover:border-indigo-500/50 transition-all duration-300">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider pl-1">Role:</span>
          <select
            value={perspective}
            onChange={(e) => setPerspective(e.target.value as any)}
            className="bg-transparent text-white font-extrabold focus:outline-none cursor-pointer pr-1"
          >
            <option value="admin" className="bg-slate-950 text-white font-bold">Admin Panel</option>
            <option value="payroll" className="bg-slate-955 text-white font-bold">Payroll Desk</option>
            <option value="employee" className="bg-slate-955 text-white font-bold">Employee Portal</option>
          </select>
        </div>

        {/* Global Theme Switcher */}
        <button 
          onClick={toggleTheme} 
          className="p-2.5 rounded-xl bg-slate-800/30 border border-slate-800/60 hover:bg-slate-800/60 text-indigo-400 dark:text-amber-400 transition-all duration-200"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-slate-800/30 border border-slate-800/60 hover:bg-slate-800/60 text-slate-300 hover:text-white transition-all duration-200 relative"
          >
            <Bell size={18} />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                {alerts.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900/95 dark:bg-slate-950/95 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden z-50">
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <span className="font-semibold text-white text-sm">Real-time alerts</span>
                {alerts.length > 0 && (
                  <button 
                    onClick={clearAlerts}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Clear all
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/40">
                {alerts.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-400">
                    No active notifications.
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="p-4 hover:bg-slate-800/20 transition-all duration-200">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-xs font-semibold ${
                          alert.type === 'success' ? 'text-teal-400' : alert.type === 'warning' ? 'text-amber-400' : 'text-indigo-400'
                        }`}>
                          {alert.title}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown button */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-indigo-500/10">
            HR
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-white">HR Manager</p>
            <p className="text-[10px] text-slate-400">Delhi Branch</p>
          </div>
        </div>
      </div>
    </header>
  );
};
