"use client";

import React from "react";
import InteractiveLogo from "../ui/InteractiveLogo";
import { ArrowRight } from "lucide-react";
import GradientButton from "../ui/GradientButton";

interface FooterProps {
  onOpenDrawer: (id: string) => void;
}

export default function Footer({ onOpenDrawer }: FooterProps) {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-bg-light/40 dark:bg-bg-dark/40 backdrop-blur-md pt-16 pb-8">
      {/* Decorative Gradient Background behind footer */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-indigo/10 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-6 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <InteractiveLogo />
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-sm">
            India's AI-Powered HRMS Platform. Manage Payroll, Attendance, Recruitment, Leave, and Employee Experience on one intelligent cloud.
          </p>
          <div className="flex gap-4 items-center mt-4">
            <a href="#" className="p-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 hover:text-gulal-rose text-foreground/80 transition-colors">
              {/* X / Twitter SVG */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 hover:text-gulal-rose text-foreground/80 transition-colors">
              {/* LinkedIn SVG */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 hover:text-gulal-rose text-foreground/80 transition-colors">
              {/* GitHub SVG */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Modules Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Modules</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            <li><a href="#features" className="hover:text-gulal-rose transition-colors">Core HR & Directory</a></li>
            <li><a href="#showcase" className="hover:text-gulal-rose transition-colors">Indian Payroll (₹)</a></li>
            <li><a href="#showcase" className="hover:text-gulal-rose transition-colors">Smart Attendance</a></li>
            <li><a href="#ai-hr" className="hover:text-gulal-rose transition-colors">AI Recruitment</a></li>
            <li><a href="#features" className="hover:text-gulal-rose transition-colors">Performance & OKRs</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Company</h4>
          <div className="flex flex-col gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 font-medium items-start">
            <button onClick={() => onOpenDrawer("about-us")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">About Us</button>
            <button onClick={() => onOpenDrawer("careers")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">Careers</button>
            <button onClick={() => onOpenDrawer("press-kit")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">Press Kit</button>
            <button onClick={() => onOpenDrawer("support")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">Contact Support</button>
            <button onClick={() => onOpenDrawer("trust")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">Trust Center</button>
          </div>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Resources</h4>
          <div className="flex flex-col gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 font-medium items-start">
            <button onClick={() => onOpenDrawer("hr-glossary")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">HR Glossary (India)</button>
            <button onClick={() => onOpenDrawer("epf-esi-calc")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">EPF & ESI Calculator</button>
            <button onClick={() => onOpenDrawer("slab-tax-calc")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">Slab Tax Calculator</button>
            <button onClick={() => onOpenDrawer("developer-api")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">Developer API</button>
            <button onClick={() => onOpenDrawer("system-status")} className="hover:text-gulal-rose transition-colors cursor-pointer text-left">System Status</button>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Stay Updated</h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Subscribe to our weekly newsletter for compliance alerts and HR guides.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="hr@company.in"
              className="px-3.5 py-2.5 w-full rounded-xl bg-white dark:bg-white/5 border border-indigo/[0.12] dark:border-white/10 text-xs text-foreground focus:outline-none focus:border-gulal-rose"
            />
            <button className="p-2.5 rounded-xl bg-gradient-to-r from-marigold to-gulal-rose hover:scale-105 active:scale-95 transition-transform duration-200 text-white cursor-pointer">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <p className="text-xs text-zinc-500 font-medium">
            © {new Date().getFullYear()} KaramcharHR (karamcharhr.online). All rights reserved.
          </p>
          <div className="flex gap-3 text-xs text-zinc-500 font-medium">
            <button onClick={() => onOpenDrawer("terms")} className="hover:text-gulal-rose cursor-pointer transition-colors">Terms & Conditions</button>
            <span>•</span>
            <button onClick={() => onOpenDrawer("privacy")} className="hover:text-gulal-rose cursor-pointer transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onOpenDrawer("cookies")} className="hover:text-gulal-rose cursor-pointer transition-colors">Cookie Policy</button>
          </div>
        </div>
        <p className="text-xs text-zinc-500 flex items-center gap-1 font-medium">
          Made with ❤️ in India for the global workforce.
        </p>
      </div>
    </footer>
  );
}
