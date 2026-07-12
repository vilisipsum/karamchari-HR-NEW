"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import {
  LayoutDashboard,
  Users,
  Banknote,
  CalendarCheck,
  SearchCode,
  LineChart,
  GraduationCap,
  FolderLock,
  Smartphone,
  PieChart,
} from "lucide-react";

export default function Modules() {
  const modulesData = [
    {
      title: "Executive Dashboard",
      desc: "One central hub for headcounts, attrition, payroll disbursement status, and task lists.",
      icon: LayoutDashboard,
      features: ["Real-time widgets", "To-do checklists", "Critical compliance alerts"],
    },
    {
      title: "Core HR & Directory",
      desc: "Maintain profiles, reporting structure, custom fields, and employee document vault.",
      icon: Users,
      features: ["Org chart visualization", "Secure document locker", "Asset trackers"],
    },
    {
      title: "Indian Payroll (₹)",
      desc: "100% compliant automatic payroll with EPF, ESIC, Professional Tax, and TDS calculations.",
      icon: Banknote,
      features: ["One-click payslips", "Auto tax declarations", "Form 16 generation"],
    },
    {
      title: "Attendance & Rotations",
      desc: "Capture geofenced attendance, rotate schedules, and calculate accurate overtime hours.",
      icon: CalendarCheck,
      features: ["Biometric scanner sync", "Rotational roster builders", "Shift allowance"],
    },
    {
      title: "Recruitment Kanban",
      desc: "Source candidates, run resume parsers, and manage interviews using intuitive boards.",
      icon: SearchCode,
      features: ["Custom pipelines", "Automated interview booking", "SLA tracking"],
    },
    {
      title: "Performance & Appraisals",
      desc: "Run 360-degree reviews, track business OKRs, and gather continuous feedback.",
      icon: LineChart,
      features: ["Flexible review templates", "OKR alignment maps", "9-box grid matrix"],
    },
    {
      title: "Learning Management (LMS)",
      desc: "Deploy custom courses, track employee training, and reward completion certifications.",
      icon: GraduationCap,
      features: ["Video course players", "Interactive quiz modules", "Skill path tracking"],
    },
    {
      title: "Employee Self Service",
      desc: "Enable employees to download payslips, submit expenses, and declare taxes independently.",
      icon: FolderLock,
      features: ["Tax declaration declarations", "Expense claim snapping", "Leave applications"],
    },
    {
      title: "Employee Mobile App",
      desc: "Android and iOS applications for check-in, leave requests, and payslip downloads.",
      icon: Smartphone,
      features: ["Offline geofencing", "Face ID login support", "Push notifications"],
    },
    {
      title: "AI Reports & Analytics",
      desc: "Get deep metrics on hiring duration, employee costs, retention risk, and demographic diversity.",
      icon: PieChart,
      features: ["Custom query reports", "Auto csv export", "Predictive insights"],
    },
  ];

  return (
    <section id="modules" className="relative py-24 border-t border-white/5 bg-bg-light/20 dark:bg-bg-dark/20">
      <div className="absolute left-[10%] bottom-[10%] w-[350px] h-[350px] rounded-full bg-indigo/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gulal-rose font-heading">
            Modules Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
            Intelligent modules, <br />
            integrated out of the box.
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            Activate modules as you grow. Start with Core HR & Attendance and add Performance or LMS whenever you need.
          </p>
        </SectionReveal>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {modulesData.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <SectionReveal
                key={mod.title}
                direction="up"
                delay={index * 0.05}
              >
                <GlassCard className="p-6 md:p-8 h-full flex flex-col md:flex-row gap-6 hover:border-gulal-rose/30 dark:hover:border-gulal-rose/20 transition-all duration-300 group" hoverShimmer>
                  {/* Module Icon and Color block */}
                  <div className="p-4 rounded-2xl bg-indigo/10 text-indigo dark:bg-white/5 dark:text-marigold h-fit w-fit shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground dark:text-white">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>

                    {/* Features list bullet points */}
                    <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {mod.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-mint-teal" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
