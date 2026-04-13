"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CheckCircle, Clock, ExternalLink, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/ui/page-shell";

const ORACLE_PARTNERS = [
  {
    initial: "WX",
    name: "WeatherXM",
    description: "Decentralized weather station network providing hyperlocal rainfall and temperature data. 6,500+ stations across 80 countries feed directly into RainSure oracle contracts.",
    integration: "Live",
    integrationColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    url: "https://weatherxm.com",
    accent: "bg-cyan-500",
    detail: "REST API + WebSocket stream · Updated every 5 minutes",
  },
  {
    initial: "MM",
    name: "Meteomatics",
    description: "Institutional-grade weather data provider with 50 years of historical records. Used for actuarial risk modeling and premium calculation within the RainSure policy engine.",
    integration: "Live",
    integrationColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    url: "https://meteomatics.com",
    accent: "bg-blue-500",
    detail: "API Integration · Historical + Forecast Data",
  },
  {
    initial: "NO",
    name: "NOAA Integration",
    description: "US National Oceanic and Atmospheric Administration open data feeds. Global Synoptic Network (GSN) station data serves as a secondary verification layer for oracle readings.",
    integration: "Live",
    integrationColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    url: "https://noaa.gov",
    accent: "bg-indigo-500",
    detail: "Open Data Feed · GSN Station Network",
  },
];

const NGO_PARTNERS = [
  {
    initial: "FA",
    name: "FAO",
    description: "Food and Agriculture Organization of the United Nations. Collaborating on index-based parametric insurance frameworks for smallholder farmers across Sub-Saharan Africa and South Asia.",
    integration: "MOU Signed",
    integrationColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    url: "https://fao.org",
    accent: "bg-emerald-600",
    detail: "Partnership · Distribution + Farmer Onboarding",
  },
  {
    initial: "WF",
    name: "WFP Digital",
    description: "World Food Programme digital innovation arm. Integrating RainSure payouts with WFP's SCOPE beneficiary management platform to route climate settlements to registered households.",
    integration: "In Progress",
    integrationColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    url: "https://wfp.org",
    accent: "bg-sky-600",
    detail: "SCOPE Integration · Beneficiary Routing",
  },
  {
    initial: "CG",
    name: "CGIAR",
    description: "Global agricultural research consortium. Providing peer-reviewed rainfall index methodologies and historical climate datasets to calibrate parametric trigger thresholds.",
    integration: "Research",
    integrationColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    url: "https://cgiar.org",
    accent: "bg-purple-600",
    detail: "Research Agreement · Index Calibration",
  },
];

const TECH_PARTNERS = [
  {
    initial: "SF",
    name: "Stellar Foundation",
    description: "Core infrastructure partner. RainSure is built entirely on Stellar Soroban smart contracts. SCF grant recipient for Q1 2026. Collaborating on Soroban contract standards for DeFi insurance.",
    integration: "Core",
    integrationColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    url: "https://stellar.org",
    accent: "bg-slate-700",
    detail: "Soroban Contracts · SCF Grantee",
  },
  {
    initial: "AC",
    name: "Acurast Oracle Network",
    description: "Decentralized confidential compute layer for oracle data attestation. Used to cryptographically sign weather oracle readings before they are committed on-chain, ensuring tamper-proof data provenance.",
    integration: "Live",
    integrationColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    url: "https://acurast.com",
    accent: "bg-violet-600",
    detail: "TEE Attestation · Data Signing",
  },
  {
    initial: "IP",
    name: "IPFS",
    description: "Decentralized storage for policy metadata, oracle calibration documents, and settlement audit logs. All policy terms are pinned to IPFS with CIDs stored on-chain for immutability.",
    integration: "Live",
    integrationColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    url: "https://ipfs.io",
    accent: "bg-slate-600",
    detail: "Content Addressing · Policy Metadata Storage",
  },
];

const PARTNER_SECTIONS = [
  { title: "Oracle Data Providers", subtitle: "The data backbone of parametric triggers", partners: ORACLE_PARTNERS },
  { title: "NGO Integrations", subtitle: "Bridging DeFi to the last mile", partners: NGO_PARTNERS },
  { title: "Technical Partners", subtitle: "Infrastructure enabling autonomous settlement", partners: TECH_PARTNERS },
];

export default function PartnersPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ org: "", contact: "", type: "", message: "" });

  return (
    <PageShell>
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* PAGE HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-3">ecosystem</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
              Ecosystem <span className="text-cyan-400">Partners</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-slate-400" : "text-slate-600")}>
              RainSure is built on a network of data providers, humanitarian organizations, and infrastructure partners committed to accessible climate finance.
            </p>
          </motion.div>

          {/* PARTNER SECTIONS */}
          {PARTNER_SECTIONS.map((section, sectionIdx) => (
            <div key={section.title} className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.4em] mb-2">{section.subtitle}</p>
                <h2 className={cn("text-3xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-slate-900")}>{section.title}</h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-5">
                {section.partners.map((partner, i) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "p-6 rounded-2xl border transition-all hover:shadow-xl group",
                      isDark ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/20" : "bg-white border-slate-200 hover:border-cyan-300"
                    )}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0",
                          partner.accent
                        )}>
                          {partner.initial}
                        </div>
                        <div>
                          <h3 className={cn("font-black text-base uppercase tracking-tight", isDark ? "text-white" : "text-slate-900")}>{partner.name}</h3>
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border mt-1",
                            partner.integrationColor
                          )}>
                            {partner.integration === "Live" && <CheckCircle className="w-2.5 h-2.5" />}
                            {partner.integration !== "Live" && <Clock className="w-2.5 h-2.5" />}
                            {partner.integration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className={cn("text-sm leading-relaxed mb-4", isDark ? "text-slate-400" : "text-slate-600")}>{partner.description}</p>
                    <div className={cn(
                      "px-3 py-2 rounded-lg text-[10px] font-mono mb-4",
                      isDark ? "bg-slate-800 text-slate-500" : "bg-slate-50 text-slate-600"
                    )}>
                      {partner.detail}
                    </div>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors",
                        "text-cyan-500 hover:text-cyan-400"
                      )}
                    >
                      Visit Partner <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* BECOME A PARTNER FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-3xl p-10 md:p-14 border relative overflow-hidden",
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            )}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-4">Partner Program</p>
                  <h2 className={cn("text-4xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
                    Become a<br />
                    <span className="text-cyan-400">Partner</span>
                  </h2>
                  <p className={cn("text-sm leading-relaxed mb-6", isDark ? "text-slate-400" : "text-slate-600")}>
                    We partner with data providers, humanitarian organizations, institutional capital managers, and technical infrastructure providers. If your work intersects with climate risk, agricultural finance, or decentralized infrastructure, we want to hear from you.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Dedicated integration support",
                      "Co-marketing opportunities",
                      "Access to protocol governance",
                      "Revenue sharing for data providers",
                    ].map(item => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className={cn("text-sm", isDark ? "text-slate-300" : "text-slate-700")}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {!submitted ? (
                  <div className="space-y-4">
                    {[
                      { label: "Organization Name", key: "org", placeholder: "CGIAR · WFP · Meteomatics..." },
                      { label: "Contact Email", key: "contact", placeholder: "partnerships@yourorg.org" },
                      { label: "Partnership Type", key: "type", placeholder: "Oracle · NGO · Technical · Capital" },
                    ].map(field => (
                      <div key={field.key}>
                        <label className={cn("block text-[10px] font-bold uppercase tracking-widest mb-2", isDark ? "text-slate-500" : "text-slate-500")}>{field.label}</label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors",
                            isDark
                              ? "bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-cyan-500/50"
                              : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-400"
                          )}
                        />
                      </div>
                    ))}
                    <div>
                      <label className={cn("block text-[10px] font-bold uppercase tracking-widest mb-2", isDark ? "text-slate-500" : "text-slate-500")}>Brief Description</label>
                      <textarea
                        rows={3}
                        placeholder="Describe your organization and how you'd like to collaborate..."
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none",
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-cyan-500/50"
                            : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-400"
                        )}
                      />
                    </div>
                    <button
                      onClick={() => setSubmitted(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                    >
                      <Send className="w-4 h-4" /> Submit Partnership Inquiry
                    </button>
                  </div>
                ) : (
                  <div className={cn(
                    "flex flex-col items-center justify-center text-center p-10 rounded-2xl border",
                    isDark ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"
                  )}>
                    <CheckCircle className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className={cn("text-xl font-black uppercase tracking-tight mb-2", isDark ? "text-white" : "text-slate-900")}>Inquiry Received</h3>
                    <p className={cn("text-sm", isDark ? "text-slate-400" : "text-slate-600")}>We&apos;ll review your partnership inquiry and respond within 3 business days.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
