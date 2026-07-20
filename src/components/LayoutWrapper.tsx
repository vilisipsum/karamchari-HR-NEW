'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { RealtimeProvider } from '@/context/RealtimeContext';

export const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage) {
    return (
      <RealtimeProvider>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
          {children}
        </div>
      </RealtimeProvider>
    );
  }

  return (
    <RealtimeProvider>
      <div className="min-h-screen bg-slate-900 dark:bg-slate-950 text-white transition-all duration-300">
        {/* Sidebar */}
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        {/* Topbar */}
        <Topbar onMenuToggle={() => setIsMobileMenuOpen(true)} />

        {/* Main Content Area */}
        <div className="md:pl-64 pt-16 min-h-screen flex flex-col">
          <main className="flex-1 p-6 max-w-7xl w-full mx-auto animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </RealtimeProvider>
  );
};
