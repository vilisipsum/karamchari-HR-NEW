"use client";

import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import GradientProgressRing from "../ui/GradientProgressRing";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, DollarSign, Calendar, ClipboardList, TrendingUp, AlertCircle, CheckCircle, 
  MapPin, Phone, Mail, Award, Check, FileText, CheckCircle2, UserPlus, Play 
} from "lucide-react";

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "heatmap", label: "Attendance Heatmap" },
    { id: "payroll", label: "Payroll Screen" },
    { id: "directory", label: "Employee Directory" },
    { id: "kanban", label: "Recruitment Kanban" },
    { id: "leave", label: "Leave Dashboard" },
    { id: "analytics", label: "AI Analytics" },
    { id: "profile", label: "Profile Screen" },
    { id: "payslip", label: "Payslip Preview" },
  ];

  return (
    <section id="showcase" className="relative py-24 border-t border-white/5 bg-bg-light/20 dark:bg-bg-dark/20 overflow-hidden">
      <div className="absolute right-[5%] bottom-[15%] w-[450px] h-[450px] bg-marigold/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo dark:text-marigold font-heading">
            Live Interface
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
            Experience KaramcharHR
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            Take a tour of our core dashboard modules. Built using clean design components with rapid performance logic.
          </p>
        </SectionReveal>

        {/* Tab selection menu (Scrollable on mobile) */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 justify-start lg:justify-center no-scrollbar">
          <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-2xl border border-indigo/[0.12] dark:border-white/5 backdrop-blur-md shrink-0 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-heading font-bold rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer
                  ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-marigold to-gulal-rose text-white shadow-sm"
                      : "text-foreground/80 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-white/5"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mockup Display Box */}
        <GlassCard className="w-full h-auto p-4 sm:p-6 flex flex-col overflow-hidden shadow-2xl relative" hoverShimmer>
          {/* Top fake bar */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 font-mono tracking-widest uppercase">
                karamchar_cloud // portal_v2
              </span>
            </div>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo/10 dark:bg-white/5 text-[9px] font-bold text-indigo dark:text-zinc-300">
                Hub: Mumbai (MH)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-green-500/10 text-[9px] font-bold text-[#1A8A70] dark:text-mint-teal">
                Active Session
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto pr-1 no-scrollbar">
            <div className="min-w-[780px] lg:min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="h-auto"
              >
                {/* 1. Dashboard View */}
                {activeTab === "dashboard" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-4">
                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { title: "Total Employees", val: "142", sub: "+3 this month" },
                          { title: "Avg Daily Present", val: "94.2%", sub: "Last 30d avg" },
                          { title: "Disbursed (June)", val: "₹42,56,800", sub: "Done on 28th" },
                        ].map((stat, i) => (
                          <div key={i} className="p-3 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl">
                            <span className="text-[9px] text-zinc-500 dark:text-zinc-400 font-bold uppercase">{stat.title}</span>
                            <h4 className="text-sm md:text-base font-bold font-numbers mt-1">{stat.val}</h4>
                            <span className="text-[8px] text-zinc-500">{stat.sub}</span>
                          </div>
                        ))}
                      </div>
                      {/* Main Chart Card */}
                      <div className="p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400">Payroll Growth Comparison</span>
                          <span className="text-[9px] text-[#1A8A70] dark:text-mint-teal font-extrabold flex items-center gap-0.5">
                            <TrendingUp className="w-3 h-3" /> +12.4% vs Q1
                          </span>
                        </div>
                        <div className="h-32 flex items-end gap-2 pt-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                          {[25, 40, 35, 55, 60, 50, 75, 65, 80, 95].map((val, idx) => (
                            <div key={idx} className="flex-1 bg-gradient-to-t from-indigo to-gulal-rose rounded-t relative group" style={{ height: `${val}%` }}>
                              <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-bg-dark text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                ₹{val * 50}k
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-[8px] text-zinc-500 font-bold">
                          <span>Jan</span>
                          <span>Mar</span>
                          <span>May</span>
                          <span>Jul</span>
                          <span>Sep</span>
                          <span>Nov</span>
                        </div>
                      </div>
                    </div>
                    {/* Activity Column */}
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl space-y-4">
                        <span className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400">Critical HR Actions</span>
                        <div className="space-y-3 mt-4">
                          {[
                            { text: "Confirm June TDS file submission", alert: true },
                            { text: "Review 3 sick leave approvals", alert: false },
                            { text: "KYC validation pending for 2 new joiners", alert: true },
                            { text: "EPF challan download available", alert: false },
                          ].map((act, i) => (
                            <div key={i} className="flex gap-2 text-xs">
                              {act.alert ? (
                                <AlertCircle className="w-4 h-4 text-coral shrink-0" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-[#1A8A70] dark:text-mint-teal shrink-0" />
                              )}
                              <span className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">{act.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Heatmap View */}
                {activeTab === "heatmap" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-zinc-500">Employee Attendance Grid (July 2026)</span>
                      <div className="flex gap-4 text-[9px] font-semibold text-zinc-500">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-500" /> Present</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-500" /> Absent</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-yellow-500" /> SL/CL</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-indigo" /> Holiday</span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-200 dark:border-zinc-800/80">
                            <th className="py-2 font-bold text-zinc-500 dark:text-zinc-400">Employee</th>
                            {Array.from({ length: 15 }, (_, i) => (
                              <th key={i} className="py-2 text-center text-[9px] text-zinc-500 dark:text-zinc-400 w-8">{i + 1}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: "Aditya Sharma", dept: "Tech", pattern: [1, 1, 1, 3, 1, 4, 4, 1, 1, 1, 1, 1, 4, 4, 1] },
                            { name: "Priya Nair", dept: "HR", pattern: [1, 1, 2, 1, 1, 4, 4, 1, 1, 3, 1, 1, 4, 4, 1] },
                            { name: "Rohan Das", dept: "Finance", pattern: [1, 1, 1, 1, 1, 4, 4, 2, 2, 1, 1, 1, 4, 4, 1] },
                            { name: "Neha Sen", dept: "Design", pattern: [3, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 4, 4, 3] },
                          ].map((emp, i) => (
                            <tr key={i} className="border-b border-zinc-100 dark:border-zinc-800/20">
                              <td className="py-3 font-semibold">
                                <div>{emp.name}</div>
                                <div className="text-[9px] text-zinc-500 dark:text-zinc-400">{emp.dept}</div>
                              </td>
                              {emp.pattern.map((type, idx) => {
                                const bg = 
                                  type === 1 ? "bg-green-500" : 
                                  type === 2 ? "bg-red-500" : 
                                  type === 3 ? "bg-yellow-500" : "bg-indigo";
                                return (
                                  <td key={idx} className="py-3 text-center">
                                    <div className={`w-5 h-5 rounded mx-auto ${bg} opacity-80 hover:opacity-100 transition-opacity`} />
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. Payroll Screen */}
                {activeTab === "payroll" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 space-y-4">
                      <div className="p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold">Salary Slip Calculations (Per Month)</h4>
                          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 font-numbers">PAN: APNPSXXXXF</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                          <div className="space-y-3">
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">Earnings</span>
                            <div className="flex justify-between"><span>Basic Salary</span><span className="font-numbers">₹50,000</span></div>
                            <div className="flex justify-between"><span>HRA</span><span className="font-numbers">₹25,000</span></div>
                            <div className="flex justify-between"><span>Special Allowance</span><span className="font-numbers">₹12,500</span></div>
                          </div>
                          <div className="space-y-3 border-l border-zinc-200 dark:border-zinc-800/80 pl-4">
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">Deductions</span>
                            <div className="flex justify-between"><span>EPF Contribution</span><span className="font-numbers">₹1,800</span></div>
                            <div className="flex justify-between"><span>Professional Tax (PT)</span><span className="font-numbers">₹200</span></div>
                            <div className="flex justify-between text-red-600 dark:text-red-400"><span>TDS / Income Tax</span><span className="font-numbers">₹4,500</span></div>
                          </div>
                        </div>
                        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between items-center">
                          <span className="text-xs font-bold">Net Take Home Pay</span>
                          <span className="text-base font-extrabold font-numbers text-[#1A8A70] dark:text-mint-teal">₹81,000</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-4 space-y-4">
                      <div className="p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl space-y-4">
                        <span className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400">Statutory Compliance Status</span>
                        <div className="space-y-3.5 mt-4">
                          {[
                            { label: "EPF E-Challan Filed", date: "July 12" },
                            { label: "ESIC E-Challan Filed", date: "July 12" },
                            { label: "Professional Tax Paid", date: "July 10" },
                            { label: "Form 24Q (TDS) Drafted", date: "Pending" },
                          ].map((comp, idx) => (
                            <div key={idx} className="flex justify-between text-xs font-semibold">
                              <span className="text-zinc-600 dark:text-zinc-300">{comp.label}</span>
                              <span className={`text-[10px] uppercase font-bold ${comp.date === "Pending" ? "text-amber" : "text-[#1A8A70] dark:text-mint-teal"}`}>
                                {comp.date}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Employee Directory */}
                {activeTab === "directory" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: "Ananya Iyer", role: "Principal UX Designer", email: "ananya.i@company.in", loc: "Bengaluru", status: "Active" },
                      { name: "Kabir Mehta", role: "Backend Architect", email: "kabir.m@company.in", loc: "Noida", status: "On Leave" },
                      { name: "Diya Rao", role: "HR Executive", email: "diya.r@company.in", loc: "Mumbai", status: "Active" },
                    ].map((emp, i) => (
                      <div key={i} className="p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold">{emp.name}</h4>
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">{emp.role}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${emp.status === "Active" ? "bg-green-500/20 text-[#1A8A70] dark:text-mint-teal" : "bg-yellow-500/20 text-marigold"}`}>
                            {emp.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                          <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {emp.email}</div>
                          <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {emp.loc} Hub</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. Recruitment Kanban */}
                {activeTab === "kanban" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { title: "Sourced (4)", list: ["Vikram - SDE-2", "Pooja - Designer"] },
                      { title: "Screened (2)", list: ["Rohan - HR Manager"] },
                      { title: "Interviewing (3)", list: ["Sneha - React Lead"] },
                      { title: "Offered (1)", list: ["Kunal - Product Owner"] },
                    ].map((col, idx) => (
                      <div key={idx} className="p-3 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/5 rounded-xl flex flex-col gap-3">
                        <span className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400">{col.title}</span>
                        <div className="flex-1 space-y-2">
                          {col.list.map((card, i) => (
                            <div key={i} className="p-2.5 bg-white dark:bg-white/10 border border-indigo/[0.08] dark:border-white/5 rounded-lg text-xs font-semibold hover:border-gulal-rose transition-colors shadow-sm">
                              {card}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 6. Leave Dashboard */}
                {activeTab === "leave" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Leave Balances</span>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Casual Leave (CL)", left: 6, max: 12, color: "bg-marigold" },
                          { label: "Sick Leave (SL)", left: 8, max: 10, color: "bg-gulal-rose" },
                          { label: "Earned Leave (EL)", left: 14, max: 18, color: "bg-mint-teal" },
                        ].map((leave, i) => (
                          <div key={i} className="p-3 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl space-y-2">
                            <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400">{leave.label}</span>
                            <div className="flex justify-between items-baseline">
                              <span className="text-lg font-bold font-numbers">{leave.left}</span>
                              <span className="text-[9px] text-zinc-500 font-bold">/ {leave.max} Available</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div className={`h-full ${leave.color} rounded-full`} style={{ width: `${(leave.left/leave.max)*100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Approvals */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Leave Requests</span>
                      {[
                        { name: "Rahul Sen", type: "CL Request", duration: "14 Jul - 15 Jul" },
                      ].map((req, i) => (
                        <div key={i} className="p-3 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl flex flex-col justify-between gap-3">
                          <div>
                            <h4 className="text-xs font-bold">{req.name}</h4>
                            <span className="text-[9px] text-zinc-500 dark:text-zinc-400 font-semibold">{req.type} ({req.duration})</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 py-1 rounded bg-green-500/20 text-[#1A8A70] dark:text-mint-teal text-[10px] font-bold hover:bg-green-500/35 transition-colors cursor-pointer">
                              Approve
                            </button>
                            <button className="flex-1 py-1 rounded bg-red-500/20 text-red-700 dark:text-red-400 text-[10px] font-bold hover:bg-red-500/35 transition-colors cursor-pointer">
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. AI Analytics */}
                {activeTab === "analytics" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    <div className="md:col-span-8 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Attrition Risk Model</span>
                          <div className="h-16 flex items-end gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-1 mt-4">
                            {[15, 20, 30, 22, 10, 8].map((v, i) => (
                              <div key={i} className="flex-1 bg-red-400/80 hover:bg-red-400 transition-colors rounded-t" style={{ height: `${v * 2}px` }} />
                            ))}
                          </div>
                          <span className="text-[9px] text-zinc-500 mt-2 font-semibold uppercase">Risk Score decreased by 4.2%</span>
                        </div>
                        <div className="p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Hiring Source Efficiency</span>
                          <div className="h-16 flex items-end gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-1 mt-4">
                            {[40, 60, 85, 30].map((v, i) => (
                              <div key={i} className="flex-1 bg-indigo/80 hover:bg-indigo transition-colors rounded-t" style={{ height: `${v * 0.7}px` }} />
                            ))}
                          </div>
                          <span className="text-[9px] text-zinc-500 mt-2 font-semibold uppercase">LinkedIn leading at 85% matches</span>
                        </div>
                      </div>
                    </div>
                    {/* Right column with Progress Ring */}
                    <div className="md:col-span-4 flex items-center justify-center">
                      <div className="p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl w-full flex flex-col items-center justify-center gap-3 py-6">
                        <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Overall Team Health</span>
                        <GradientProgressRing progress={88} label="88%" sublabel="Healthy" size={100} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. Profile Screen */}
                {activeTab === "profile" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-zinc-800 rounded-xl text-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-marigold to-gulal-rose flex items-center justify-center text-white font-heading font-extrabold text-xl">
                        NS
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">Nikhil Sharma</h4>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">Tech Lead // Bengaluru</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-mint-teal/20 text-[#1A8A70] dark:text-mint-teal flex items-center gap-1">
                        <Check className="w-3 h-3" /> KYC Verified
                      </span>
                    </div>
                    <div className="md:col-span-8 p-4 bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 rounded-xl space-y-4">
                      <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Indian Statutory Details</span>
                      <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">PAN</span>
                          <p className="font-numbers mt-0.5">AFKPSXXXXG</p>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Masked Aadhaar</span>
                          <p className="font-numbers mt-0.5">XXXX-XXXX-9842</p>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">UAN (Provident Fund)</span>
                          <p className="font-numbers mt-0.5">100984XXXX21</p>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase">Bank Details</span>
                          <p className="mt-0.5">HDFC Bank // A/C ending in 4056</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. Payslip */}
                {activeTab === "payslip" && (
                  <div className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-4 max-w-xl mx-auto shadow-sm">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
                      <div>
                        <h4 className="text-sm font-extrabold tracking-tight">KaramcharHR Demo Corp</h4>
                        <span className="text-[8px] text-zinc-500">Regd. Office: Sec 62, Noida, India</span>
                      </div>
                      <span className="px-3 py-1 rounded bg-indigo/10 dark:bg-white/5 text-[9px] font-bold text-indigo dark:text-zinc-300">
                        June 2026 Payslip
                      </span>
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-medium border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
                      <div>
                        <span className="text-[8px] text-zinc-500 uppercase">Employee Details</span>
                        <p className="font-bold mt-0.5">Ananya Iyer (Principal Designer)</p>
                        <p className="text-zinc-500">UAN: 10129XXXX098</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-zinc-500 uppercase">Bank Account</span>
                        <p className="font-bold mt-0.5">ICICI Bank A/C ending 9801</p>
                        <p className="text-zinc-500">IFSC: ICIC0000104</p>
                      </div>
                    </div>
                    {/* Calculation details */}
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-medium">
                      <div className="space-y-1.5">
                        <span className="text-[8px] text-zinc-500 uppercase">Earnings</span>
                        <div className="flex justify-between"><span>Basic Salary</span><span className="font-numbers">₹60,000</span></div>
                        <div className="flex justify-between"><span>HRA</span><span className="font-numbers">₹30,000</span></div>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[8px] text-zinc-500 uppercase">Deductions</span>
                        <div className="flex justify-between"><span>EPF</span><span className="font-numbers">₹1,800</span></div>
                        <div className="flex justify-between"><span>TDS</span><span className="font-numbers">₹5,200</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
