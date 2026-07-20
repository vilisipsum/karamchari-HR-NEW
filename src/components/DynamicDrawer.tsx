'use client';

import React from 'react';
import { X } from 'lucide-react';

interface DynamicDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const DynamicDrawer: React.FC<DynamicDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Container sliding from right */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-full sm:w-[500px] md:w-[600px] bg-slate-900/95 dark:bg-slate-950/95 text-white border-l border-slate-800 shadow-2xl backdrop-blur-md transition-transform duration-300 transform flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80">
          <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};
