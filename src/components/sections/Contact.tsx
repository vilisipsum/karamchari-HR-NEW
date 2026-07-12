"use client";

import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import GradientButton from "../ui/GradientButton";
import { MessageSquare, PhoneCall, Mail, MapPin, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companySize: "10-50",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorDetail(null);

    try {
      // Local self-sufficient API submission
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          companySize: "10-50",
          phone: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorDetail(data.code === "MISSING_CREDENTIALS" ? "SMTP_CONFIG_MISSING" : data.error || "UNKNOWN_ERROR");
      }
    } catch (err) {
      setStatus("error");
      setErrorDetail("NETWORK_ERROR");
    }
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/5 bg-bg-light/20 dark:bg-bg-dark/20 overflow-hidden">
      <div className="absolute left-[10%] bottom-[15%] w-[400px] h-[400px] bg-marigold/10 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <SectionReveal direction="up">
              <span className="text-xs font-bold uppercase tracking-widest text-gulal-rose font-heading">
                Book a Demo
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2 mb-6">
                Transform your HR operations today
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                Schedule a 15-minute product walk-through with an HR specialist. See how KaramcharHR can automate your payroll compliance and streamline attendance.
              </p>

              {/* Direct channels */}
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="p-3 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">WhatsApp Quick Connect</span>
                    <a
                      href="https://wa.me/917017813285?text=Interested%20in%20KaramcharHR%20Demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-foreground dark:text-white hover:text-gulal-rose block transition-colors mt-0.5"
                    >
                      +91 70178 13285
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="p-3 rounded-xl bg-indigo/10 text-indigo border border-indigo/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Sales Enquiries</span>
                    <a
                      href="mailto:sales@karamcharhr.online"
                      className="text-sm font-bold text-foreground dark:text-white hover:text-gulal-rose block transition-colors mt-0.5"
                    >
                      sales@karamcharhr.online
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="p-3 rounded-xl bg-marigold/10 text-marigold border border-marigold/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">HQ Office Hub</span>
                    <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 mt-0.5">
                      Sec 62 Noida, India
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <SectionReveal direction="none" delay={0.2}>
              <GlassCard className="p-6 md:p-8 border-white/60 dark:border-white/5 shadow-2xl" hoverShimmer>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Nikhil Sharma"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 text-xs focus:outline-none focus:border-gulal-rose"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase">Work Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="nikhil@company.in"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 text-xs focus:outline-none focus:border-gulal-rose"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 text-xs focus:outline-none focus:border-gulal-rose"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase">Company Size</label>
                      <select
                        value={form.companySize}
                        onChange={(e) => setForm({ ...form, companySize: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/40 dark:bg-[#15102a] border border-white/60 dark:border-white/10 text-xs focus:outline-none focus:border-gulal-rose appearance-none text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="1-10">1 - 10 employees</option>
                        <option value="10-50">10 - 50 employees</option>
                        <option value="50-250">50 - 250 employees</option>
                        <option value="250+">250+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase">Message / Requirements</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your shift rosters or custom payroll needs..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 text-xs focus:outline-none focus:border-gulal-rose resize-none"
                    />
                  </div>

                  {status === "success" && (
                    <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-[#1A8A70] dark:text-mint-teal flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Demo request submitted! We will email you details shortly.</span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 flex items-start gap-2 font-semibold">
                      <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">Oops! Submission Failed.</p>
                        {errorDetail === "SMTP_CONFIG_MISSING" ? (
                          <p className="mt-0.5 leading-relaxed font-medium text-zinc-400">
                            The server's SMTP mail settings are not configured. Please add the <code className="text-white px-1 py-0.5 rounded bg-white/5">SMTP_PASS</code> variable to your environment configuration.
                          </p>
                        ) : (
                          <p className="mt-0.5 leading-relaxed font-medium text-zinc-400">
                            Failed to deliver the mail payload. Details: <code className="text-white px-1 py-0.5 rounded bg-white/5">{errorDetail}</code>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <GradientButton 
                    type="submit" 
                    variant="primary" 
                    className="w-full justify-center py-3.5"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending Request..." : "Book My Demo Walkthrough"}
                  </GradientButton>
                </form>
              </GlassCard>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
