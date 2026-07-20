'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Network, 
  CalendarDays, 
  Receipt, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Directory', href: '/directory', icon: Users },
    { name: 'Org Chart', href: '/org-chart', icon: Network },
    { name: 'Leave Tracking', href: '/leave', icon: CalendarDays },
    { name: 'Expense Claims', href: '/expenses', icon: Receipt },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md text-white border-r border-slate-800 w-64 p-4 z-50 transition-all duration-300">
      {/* Brand Header */}
      <div className="flex items-center justify-between py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/30">
            K
          </div>
          <span className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            KaramcharHR
          </span>
        </div>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="md:hidden p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800">
          <X size={20} />
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-md shadow-indigo-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon size={20} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (always visible on md+) */}
      <aside className="hidden md:block h-screen fixed left-0 top-0 w-64 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (visible on mobile based on state) */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay */}
        <div 
          onClick={onClose} 
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
        />
        {/* Sliding Panel */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-64 transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
};
