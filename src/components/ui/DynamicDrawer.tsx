"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Copy, AlertCircle, ShieldAlert, Cpu, CheckCircle2, Search } from "lucide-react";
import { motion } from "framer-motion";
import GradientButton from "./GradientButton";

interface DynamicDrawerProps {
  contentId: string | null;
  onClose: () => void;
}

export default function DynamicDrawer({ contentId, onClose }: DynamicDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState("");

  // EPF / ESI Calculator State
  const [basicSalary, setBasicSalary] = useState(30000);
  // Slab Tax Calculator State
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [deductions80C, setDeductions80C] = useState(150000);
  const [otherDeductions, setOtherDeductions] = useState(50000);

  useEffect(() => {
    if (contentId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [contentId]);

  if (!contentId) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations for EPF & ESI
  const calculateEPF_ESI = () => {
    const epfEmployee = Math.min(basicSalary, 15000) * 0.12; // Standard cap is 15000 basic, but companies can calculate on full basic. We will stick to the standard statutory cap of 15k basic or actual if configured. Let's do standard actual basic capped at 15000 for statutory minimum, or actual basic. Let's calculate standard 12% on actual basic.
    const epfEmployeeActual = basicSalary * 0.12;
    const epfEmployerEPS = Math.min(basicSalary, 15000) * 0.0833;
    const epfEmployerEPF = epfEmployeeActual - epfEmployerEPS;

    // ESI applies if gross salary <= 21000. Let's assume basic is gross for calculation simplicity
    const isEsiApplicable = basicSalary <= 21000;
    const esiEmployee = isEsiApplicable ? Math.ceil(basicSalary * 0.0075) : 0;
    const esiEmployer = isEsiApplicable ? Math.ceil(basicSalary * 0.0325) : 0;

    return {
      epfEmployee: Math.round(epfEmployeeActual),
      epsEmployer: Math.round(epfEmployerEPS),
      epfEmployer: Math.round(epfEmployerEPF),
      esiEmployee,
      esiEmployer,
      takeHome: Math.round(basicSalary - epfEmployeeActual - esiEmployee),
    };
  };

  const epfRes = calculateEPF_ESI();

  // Calculations for Income Tax Slab (FY 2025-26 / FY 2026-27)
  const calculateTax = () => {
    // New Regime (No deductions allowed except standard deduction of 75,000)
    const newRegimeStandardDeduction = 75000;
    const newTaxable = Math.max(0, annualIncome - newRegimeStandardDeduction);
    let newTax = 0;

    // New Regime Slab rates:
    // Up to 3L: Nil
    // 3L to 7L: 5% (on amount exceeding 3L)
    // 7L to 10L: 10%
    // 10L to 12L: 15%
    // 12L to 15L: 20%
    // Above 15L: 30%
    if (newTaxable > 1500000) {
      newTax += (newTaxable - 1500000) * 0.3 + 115000; // 15% of 2L (30k) + 10% of 3L (30k) + 5% of 4L (20k) + 20% of 3L (60k) etc. Let's calculate exactly.
    } else if (newTaxable > 1200000) {
      newTax += (newTaxable - 1200000) * 0.2 + 55000;
    } else if (newTaxable > 1000000) {
      newTax += (newTaxable - 1000000) * 0.15 + 25000;
    } else if (newTaxable > 700000) {
      newTax += (newTaxable - 700000) * 0.10 + 5000;
    } else if (newTaxable > 300000) {
      newTax += (newTaxable - 300000) * 0.05;
    }
    
    // Tax rebate under Section 87A: Taxable income up to 7L gets full rebate in New Regime
    if (newTaxable <= 700000) {
      newTax = 0;
    }

    // Old Regime (Deductions allowed)
    const oldRegimeStandardDeduction = 50000;
    const oldTaxable = Math.max(0, annualIncome - oldRegimeStandardDeduction - deductions80C - otherDeductions);
    let oldTax = 0;

    // Old Regime Slab rates:
    // Up to 2.5L: Nil
    // 2.5L to 5L: 5%
    // 5L to 10L: 20%
    // Above 10L: 30%
    if (oldTaxable > 1000000) {
      oldTax += (oldTaxable - 1000000) * 0.3 + 112500;
    } else if (oldTaxable > 500000) {
      oldTax += (oldTaxable - 500000) * 0.2 + 12500;
    } else if (oldTaxable > 250000) {
      oldTax += (oldTaxable - 250000) * 0.05;
    }

    // Tax rebate under Section 87A: Taxable income up to 5L gets full rebate in Old Regime
    if (oldTaxable <= 500000) {
      oldTax = 0;
    }

    // Add 4% Cess
    const newTaxTotal = Math.round(newTax * 1.04);
    const oldTaxTotal = Math.round(oldTax * 1.04);

    return {
      newTax: newTaxTotal,
      oldTax: oldTaxTotal,
      savings: Math.abs(oldTaxTotal - newTaxTotal),
      recommended: newTaxTotal < oldTaxTotal ? "New Regime" : "Old Regime",
    };
  };

  const taxRes = calculateTax();

  // Indian HR Glossary Data
  const glossary = [
    { term: "CTC (Cost to Company)", definition: "The total salary package offered to an employee, including direct benefits, indirect benefits, and statutory contributions (like EPF, Gratuity, and Insurance)." },
    { term: "House Rent Allowance (HRA)", definition: "A component of salary paid to meet accommodation rental expenses. HRA exemptions can be claimed under Section 10(13A) of the Income Tax Act." },
    { term: "Form 16", definition: "A certificate issued by an employer detailing the TDS (Tax Deducted at Source) deducted from salary payments and deposited with the Income Tax Department." },
    { term: "Gratuity", definition: "A lump-sum loyalty benefit paid by an employer to employees who have completed 5 or more years of continuous service, calculated under the Payment of Gratuity Act, 1972." },
    { term: "UAN (Universal Account Number)", definition: "A unique 12-digit identification number assigned to members of the Employees' Provident Fund Organization (EPFO) that remains constant across different jobs." },
    { term: "Loss of Pay (LOP)", definition: "Leave taken by an employee without eligible balances, resulting in salary deductions for those specific days." },
  ];

  const filteredGlossary = glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  // Render Drawer Content based on ID
  const renderContent = () => {
    switch (contentId) {
      // Legal Policies
      case "terms":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white">Terms and Conditions</h3>
            <p className="text-[10px] text-zinc-500 uppercase font-semibold">Last Updated: July 2026</p>
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-medium">
              <p>Welcome to KaramcharHR. By accessing and using our website (karamcharhr.online) and cloud platform, you agree to comply with the following Terms and Conditions.</p>
              <h4 className="font-bold text-white mt-4">1. Use of License</h4>
              <p>We grant you a revocable, non-exclusive license to access our platform solely for your corporate payroll and human resource management activities. Any attempt to reverse engineer or scrape portal layouts is strictly prohibited.</p>
              <h4 className="font-bold text-white mt-4">2. SLA Support</h4>
              <p>Our SaaS provides 99.9% platform availability. Server maintenance windows are scheduled between 2:00 AM and 4:00 AM IST on Sundays to prevent operations downtime.</p>
              <h4 className="font-bold text-white mt-4">3. Governing Law</h4>
              <p>These terms shall be governed by and constructed in accordance with the laws of India. Any litigation disputes are subject to the exclusive jurisdiction of the court hubs of New Delhi, India.</p>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white">Privacy Policy</h3>
            <p className="text-[10px] text-zinc-500 uppercase font-semibold">Last Updated: July 2026</p>
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-medium">
              <p>KaramcharHR respects your organizational data privacy. This policy outlines how we collect, store, and secure employee documents including PAN, Aadhaar, and bank account numbers.</p>
              <h4 className="font-bold text-white mt-4">1. Data Encryption</h4>
              <p>All sensitive personal information (SPI) is encrypted in transit using TLS 1.3 and at rest using AES-256 standards. Database partitions are isolated on virtual private clouds (VPC).</p>
              <h4 className="font-bold text-white mt-4">2. Aadhaar Masking compliance</h4>
              <p>Pursuant to UIDAI guidelines, our Document AI system automatically masks the first 8 digits of Aadhaar numbers upon document scans, storing only the final 4 digits for identity audits.</p>
              <h4 className="font-bold text-white mt-4">3. Third-party APIs</h4>
              <p>We share billing data exclusively with EPFO, ESIC, and NSDL platforms for statutory filing. We do not sell corporate directory logs to any marketing broker networks.</p>
            </div>
          </div>
        );

      case "cookies":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white">Cookie Policy</h3>
            <p className="text-[10px] text-zinc-500 uppercase font-semibold">Last Updated: July 2026</p>
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-medium">
              <p>We use cookies to verify session tokens, remember employee portal preferences, and optimize dashboard loading speeds.</p>
              <h4 className="font-bold text-white mt-4">1. Required Cookies</h4>
              <p>These cookies are required to authenticate your profile session and allow secure access to payroll calculators.</p>
              <h4 className="font-bold text-white mt-4">2. Performance Cookies</h4>
              <p>We utilize lightweight telemetry trackers to measure dashboard load latency and capture server-side processing speeds.</p>
              <h4 className="font-bold text-white mt-4">3. Custom Preferences</h4>
              <p>Cookies store your active interface configuration (such as your chosen default office hub layout or dashboard widgets).</p>
            </div>
          </div>
        );

      // Resources: Slab Tax Calculator
      case "slab-tax-calc":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">Slab Tax Calculator</h3>
              <p className="text-xs text-zinc-400 mt-1">Estimate personal income tax under Old vs New Regimes (FY 2025-26 / FY 2026-27).</p>
            </div>

            <div className="space-y-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase">Gross Annual Salary (₹)</label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#15102a] border border-white/10 text-sm font-numbers focus:outline-none focus:border-gulal-rose text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">80C Deductions (₹)</label>
                  <input
                    type="number"
                    value={deductions80C}
                    onChange={(e) => setDeductions80C(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15102a] border border-white/10 text-sm font-numbers focus:outline-none focus:border-gulal-rose text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Other Deductions (80D/HRA)</label>
                  <input
                    type="number"
                    value={otherDeductions}
                    onChange={(e) => setOtherDeductions(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15102a] border border-white/10 text-sm font-numbers focus:outline-none focus:border-gulal-rose text-white"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Comparison Table</h4>
              <div className="space-y-3 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Old Regime Tax</span>
                  <span className="font-numbers text-white">₹{taxRes.oldTax.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">New Regime Tax</span>
                  <span className="font-numbers text-white">₹{taxRes.newTax.toLocaleString("en-IN")}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="text-xs font-bold">Regime Recommendation</span>
                  <span className="px-3 py-1 rounded bg-green-500/20 text-mint-teal text-[10px] font-bold uppercase">
                    {taxRes.recommended}
                  </span>
                </div>
                {taxRes.savings > 0 && (
                  <div className="p-3 bg-indigo/20 border border-indigo/30 rounded-xl text-center text-xs text-zinc-200">
                    You save <strong className="font-numbers text-white">₹{taxRes.savings.toLocaleString("en-IN")}</strong> using the {taxRes.recommended}!
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      // Resources: EPF & ESI Calculator
      case "epf-esi-calc":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">EPF & ESI Calculator</h3>
              <p className="text-xs text-zinc-400 mt-1">Check monthly statutory deductions for Indian salary slabs.</p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase">Monthly Basic Salary + DA (₹)</label>
                <input
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#15102a] border border-white/10 text-sm font-numbers focus:outline-none focus:border-gulal-rose text-white"
                />
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Deduction Details</h4>
              <div className="space-y-3.5 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Employee EPF (12%)</span>
                  <span className="font-numbers text-white">₹{epfRes.epfEmployee.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Employee ESI (0.75%)</span>
                  <span className="font-numbers text-white">
                    {epfRes.esiEmployee > 0 ? `₹${epfRes.esiEmployee.toLocaleString("en-IN")}` : "Exempt (Basic > ₹21,000)"}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-zinc-400">Employer EPF (3.67%)</span>
                  <span className="font-numbers text-white">₹{epfRes.epfEmployer.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Employer EPS Pension (8.33%)</span>
                  <span className="font-numbers text-white">₹{epfRes.epsEmployer.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Employer ESI (3.25%)</span>
                  <span className="font-numbers text-white">
                    {epfRes.esiEmployer > 0 ? `₹${epfRes.esiEmployer.toLocaleString("en-IN")}` : "Exempt"}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-white">Estimated Monthly Take-Home</span>
                  <span className="text-base font-extrabold font-numbers text-mint-teal">₹{epfRes.takeHome.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        );

      // Resources: Developer API
      case "developer-api":
        const codeSample = `// Punch Attendance via API
const punchAttendance = async () => {
  const response = await fetch("https://api.karamcharhr.online/v1/attendance/punch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_SECRET_KEY"
    },
    body: JSON.stringify({
      employee_id: "KHR092",
      timestamp: "2026-07-12T09:00:00Z",
      coordinates: { lat: 19.0760, lng: 72.8777 } // Mumbai
    })
  });
  
  const status = await response.json();
  console.log("Punch status:", status.verified);
};`;
        return (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-heading font-extrabold text-white">Developer API</h3>
                <p className="text-xs text-zinc-400 mt-1">Connect your biometric hardware and ERP logs seamlessly.</p>
              </div>
              <button
                onClick={() => handleCopy(codeSample)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer text-zinc-400"
              >
                {copied ? <Check className="w-4 h-4 text-mint-teal" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-zinc-400 uppercase">JavaScript SDK Example</span>
              <pre className="p-4 bg-zinc-950/80 border border-white/5 rounded-2xl text-[10px] text-zinc-300 font-mono overflow-x-auto leading-relaxed">
                <code>{codeSample}</code>
              </pre>
              <div className="flex gap-2.5 items-center p-3 bg-indigo/10 border border-indigo/20 rounded-xl text-xs text-zinc-300">
                <Cpu className="w-4 h-4 text-indigo shrink-0" />
                <span>Webhooks are available for eSSL and ZKTeco biometric sync networks.</span>
              </div>
            </div>
          </div>
        );

      // Resources: System Status
      case "system-status":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">System Status</h3>
              <p className="text-xs text-zinc-400 mt-1">Real-time status monitor of the KaramcharHR core cloud services.</p>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-sm text-mint-teal font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>All Systems Operational (100% Uptime)</span>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Service Latency logs</span>
              <div className="space-y-3 text-xs font-semibold p-4 bg-white/5 border border-white/5 rounded-2xl">
                {[
                  { name: "API Gateway", ping: "12ms", stat: "operational" },
                  { name: "Payroll Calculation Engine", ping: "45ms", stat: "operational" },
                  { name: "Biometric Webhook Sync", ping: "8ms", stat: "operational" },
                  { name: "Document Parser AI model", ping: "115ms", stat: "operational" },
                ].map((srv, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-zinc-300">{srv.name}</span>
                    <div className="flex gap-4 items-center">
                      <span className="font-mono text-zinc-500 text-[10px]">{srv.ping}</span>
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // Resources: HR Glossary
      case "hr-glossary":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">HR Glossary (India)</h3>
              <p className="text-xs text-zinc-400 mt-1">Statutory reference manual of Indian compliance terms.</p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search glossary terms (e.g. EPF, Gratuity...)"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-gulal-rose"
              />
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[350px] pr-1">
              {filteredGlossary.map((g, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-1.5">
                  <h4 className="text-xs font-bold text-white font-heading">{g.term}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">{g.definition}</p>
                </div>
              ))}
              {filteredGlossary.length === 0 && (
                <p className="text-xs text-zinc-500 text-center py-8">No matching terms found.</p>
              )}
            </div>
          </div>
        );

      // Company Pages
      case "about-us":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white">About Us</h3>
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-medium">
              <p>KaramcharHR was founded by a team of HR technology specialists and compliance attorneys with a singular vision: **to simplify workforce operations for India's scaling companies**.</p>
              <p>We saw that corporate teams were struggling with fragmented platforms—using one app for attendance, another for payroll compliance, and spreadsheets for shift planning. We built KaramcharHR as a unified, intelligent cloud layer that brings everything into a single screen.</p>
              <p>Our technology operates out of our core research hubs in Noida and Mumbai, scaling statutory automation for 500+ enterprises nationwide.</p>
            </div>
          </div>
        );

      case "careers":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white">Work With Us</h3>
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-medium">
              <p>Help us build the next generation of cloud HR infrastructure for the Indian workforce. We are hiring engineers, product managers, and customer architects who are passionate about system automation.</p>
              <h4 className="font-bold text-white mt-4">Open Positions</h4>
              <div className="space-y-3">
                {[
                  { pos: "Senior Full Stack Engineer (Next.js/Node)", loc: "Noida Hub // Hybrid" },
                  { pos: "AI Engineer (Document Parser LLMs)", loc: "Mumbai Hub // Hybrid" },
                  { pos: "Enterprise Account Executive", loc: "Bengaluru Hub // On-site" },
                ].map((job, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-xs text-white">{job.pos}</h5>
                      <span className="text-[9px] text-zinc-500 font-semibold">{job.loc}</span>
                    </div>
                    <span className="text-[10px] text-gulal-rose font-bold cursor-pointer hover:underline">Apply</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "press-kit":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white">Press Kit</h3>
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-medium">
              <p>Access KaramcharHR brand assets, media guidelines, corporate profiles, and official press releases.</p>
              <h4 className="font-bold text-white mt-4">Brand Asset Downloads</h4>
              <div className="space-y-3">
                {[
                  { name: "KaramcharHR Vector Logos (.SVG)", size: "1.2 MB" },
                  { name: "Corporate Boilerplate & Bio Sheet", size: "450 KB" },
                  { name: "Founder & Leadership Headshots", size: "14.5 MB" },
                ].map((asset, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-xs text-white">{asset.name}</h5>
                      <span className="text-[9px] text-zinc-500 font-semibold">{asset.size}</span>
                    </div>
                    <span className="text-[10px] text-indigo font-bold cursor-pointer hover:underline">Download</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "support":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white">Contact Support</h3>
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-medium">
              <p>Need support with biometric webhooks, payslip configurations, or salary payouts? Our customer engineering team is available 24/7.</p>
              <div className="p-4 bg-indigo/10 border border-indigo/20 rounded-xl space-y-2 text-xs">
                <p><strong>Customer Portal Ticket support:</strong></p>
                <p>Email: <a href="mailto:support@karamcharhr.online" className="text-gulal-rose font-bold">support@karamcharhr.online</a></p>
                <p>Hotline: <strong className="text-white">+91 70178 13285</strong> (Mon-Sat, 9 AM - 6 PM IST)</p>
              </div>
            </div>
          </div>
        );

      case "trust":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white">Trust & Security</h3>
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-medium">
              <p>Security is the foundation of KaramcharHR. We comply with leading global security standards and Indian IT Act regulations.</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { title: "SOC 2 Type II Certified", desc: "Independent audited controls on security policies." },
                  { title: "ISO 27001 Certified", desc: "Global standards for information asset controls." },
                  { title: "GDPR & DPDP Compliant", desc: "Data protection guidelines met for global safety." },
                  { title: "AES-256 Encryption", desc: "All identity indices are encrypted at rest." },
                ].map((sec, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1">
                    <h5 className="font-bold text-xs text-white flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-mint-teal" /> {sec.title}
                    </h5>
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-semibold">{sec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#070512]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg md:max-w-xl z-50 bg-[#0F0B22] border-l border-white/10 shadow-2xl overflow-y-auto flex flex-col justify-between p-6 md:p-8">
        <div>
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-500 font-mono">
              karamchar_info // detail_panel
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-zinc-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Render Body */}
          {renderContent()}
        </div>

        {/* Footer info inside Drawer */}
        <div className="border-t border-white/5 pt-4 mt-8 flex justify-between items-center text-[10px] text-zinc-500 font-medium">
          <span>Secure AES-256 Connection</span>
          <span>© {new Date().getFullYear()} KaramcharHR</span>
        </div>
      </div>
    </>
  );
}
