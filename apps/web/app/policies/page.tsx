"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ShieldCheck, MapPin, Wheat, DollarSign, Clock, Filter, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/ui/page-shell";

const POLICIES = [
  {
    id: "RSP-2026-0041",
    coop: "Kano Basin Cooperative",
    region: "Africa",
    country: "Nigeria",
    crop: "Sorghum",
    coverage: "$48,000",
    premium: "$1,920",
    threshold: "< 18mm for 21 days",
    status: "Active",
    daysLeft: 87,
    policyHolder: "242 smallholder farmers",
  },
  {
    id: "RSP-2026-0038",
    coop: "Bihar Grain Alliance",
    region: "Asia",
    country: "India",
    crop: "Rice",
    coverage: "$120,000",
    premium: "$4,800",
    threshold: "< 25mm for 14 days",
    status: "Triggered",
    daysLeft: 0,
    policyHolder: "531 smallholder farmers",
  },
  {
    id: "RSP-2026-0035",
    coop: "Rift Valley Growers",
    region: "Africa",
    country: "Kenya",
    crop: "Maize",
    coverage: "$67,500",
    premium: "$2,700",
    threshold: "< 20mm for 18 days",
    status: "Active",
    daysLeft: 112,
    policyHolder: "318 smallholder farmers",
  },
  {
    id: "RSP-2026-0031",
    coop: "São Francisco Basin Co.",
    region: "Americas",
    country: "Brazil",
    crop: "Soybeans",
    coverage: "$210,000",
    premium: "$8,400",
    threshold: "< 30mm for 21 days",
    status: "Active",
    daysLeft: 144,
    policyHolder: "89 commercial farms",
  },
  {
    id: "RSP-2026-0028",
    coop: "Punjab Wheat Collective",
    region: "Asia",
    country: "Pakistan",
    crop: "Wheat",
    coverage: "$94,000",
    premium: "$3,760",
    threshold: "< 15mm for 28 days",
    status: "Expired",
    daysLeft: 0,
    policyHolder: "412 smallholder farmers",
  },
  {
    id: "RSP-2026-0025",
    coop: "Mekong Delta Union",
    region: "Asia",
    country: "Vietnam",
    crop: "Rice",
    coverage: "$156,000",
    premium: "$6,240",
    threshold: "< 22mm for 14 days",
    status: "Active",
    daysLeft: 63,
    policyHolder: "701 smallholder farmers",
  },
  {
    id: "RSP-2026-0022",
    coop: "Oaxaca Highland Growers",
    region: "Americas",
    country: "Mexico",
    crop: "Maize",
    coverage: "$38,000",
    premium: "$1,520",
    threshold: "< 20mm for 10 days",
    status: "Triggered",
    daysLeft: 0,
    policyHolder: "194 indigenous cooperatives",
  },
  {
    id: "RSP-2026-0019",
    coop: "Tigray Resilience Fund",
    region: "Africa",
    country: "Ethiopia",
    crop: "Teff",
    coverage: "$52,000",
    premium: "$2,080",
    threshold: "< 12mm for 30 days",
    status: "Active",
    daysLeft: 201,
    policyHolder: "883 subsistence farmers",
  },
];

const STATS = [
  { label: "Total Policies", value: "1,247", icon: ShieldCheck, color: "text-cyan-400" },
  { label: "Total Coverage", value: "$18.4M", icon: DollarSign, color: "text-blue-400" },
  { label: "Total Payouts", value: "$2.1M", icon: TrendingUp, color: "text-indigo-400" },
  { label: "Avg Premium", value: "4.0%", icon: CheckCircle, color: "text-cyan-300" },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  Active: { color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", icon: CheckCircle },
  Triggered: { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: AlertTriangle },
  Expired: { color: "text-slate-500", bg: "bg-slate-500/10 border-slate-500/20", icon: XCircle },
};

export default function PoliciesPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [statusFilter, setStatusFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");

  const filtered = POLICIES.filter(p => {
    const statusMatch = statusFilter === "All" || p.status === statusFilter;
    const regionMatch = regionFilter === "All" || p.region === regionFilter;
    return statusMatch && regionMatch;
  });

  return (
    <PageShell>
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* PAGE HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-3">contracts/policy-engine</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
              Active <span className="text-cyan-400">Policies</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-slate-400" : "text-slate-600")}>
              Parametric policies are fully on-chain. Triggers are automatic. Browse active coverage protecting farming communities worldwide.
            </p>
          </motion.div>

          {/* STATS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "p-5 rounded-2xl border",
                  isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                )}
              >
                <s.icon className={cn("w-5 h-5 mb-3", s.color)} />
                <div className={cn("text-3xl font-black tracking-tight mb-1", isDark ? "text-white" : "text-slate-900")}>{s.value}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* FILTER BAR */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={cn(
              "flex flex-wrap items-center gap-4 p-4 rounded-2xl border mb-8",
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
            )}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Filter</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Status:</span>
              {["All", "Active", "Triggered", "Expired"].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                    statusFilter === s
                      ? "bg-cyan-500 text-slate-950"
                      : isDark ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Region:</span>
              {["All", "Africa", "Asia", "Americas"].map(r => (
                <button
                  key={r}
                  onClick={() => setRegionFilter(r)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                    regionFilter === r
                      ? "bg-cyan-500 text-slate-950"
                      : isDark ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </motion.div>

          {/* POLICY GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((policy, i) => {
              const StatusIcon = STATUS_CONFIG[policy.status].icon;
              return (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={cn(
                    "p-6 rounded-2xl border transition-all hover:shadow-xl group",
                    isDark
                      ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/30"
                      : "bg-white border-slate-200 hover:border-cyan-300"
                  )}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-mono text-[10px] text-slate-500 mb-1">{policy.id}</p>
                      <h3 className={cn("font-black text-base uppercase tracking-tight", isDark ? "text-white" : "text-slate-900")}>{policy.coop}</h3>
                    </div>
                    <span className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      STATUS_CONFIG[policy.status].bg,
                      STATUS_CONFIG[policy.status].color
                    )}>
                      <StatusIcon className="w-3 h-3" />
                      {policy.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className={cn("text-xs", isDark ? "text-slate-400" : "text-slate-600")}>{policy.country} · {policy.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wheat className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className={cn("text-xs", isDark ? "text-slate-400" : "text-slate-600")}>{policy.crop} · {policy.policyHolder}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-xs font-mono text-amber-500">{policy.threshold}</span>
                    </div>
                  </div>

                  {/* Financials */}
                  <div className={cn(
                    "grid grid-cols-2 gap-3 p-3 rounded-xl mb-4",
                    isDark ? "bg-slate-800/60" : "bg-slate-50"
                  )}>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Coverage</p>
                      <p className={cn("font-black text-sm", isDark ? "text-white" : "text-slate-900")}>{policy.coverage}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Premium</p>
                      <p className={cn("font-black text-sm", isDark ? "text-white" : "text-slate-900")}>{policy.premium}</p>
                    </div>
                  </div>

                  {/* Days remaining */}
                  {policy.status === "Active" && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-500" />
                      <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider">{policy.daysLeft} days remaining</span>
                    </div>
                  )}
                  {policy.status === "Triggered" && (
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Settlement in progress</span>
                    </div>
                  )}
                  {policy.status === "Expired" && (
                    <div className="flex items-center gap-2">
                      <XCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Policy term ended</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "mt-16 rounded-3xl p-10 border text-center relative overflow-hidden",
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            )}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-3">Open Source</p>
              <h2 className={cn("text-3xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
                Help Build the Policy Engine
              </h2>
              <p className={cn("text-sm mb-7 max-w-lg mx-auto", isDark ? "text-slate-400" : "text-slate-600")}>
                The policy engine is open source on Stellar Soroban. Actuaries, developers, and risk analysts are welcome to contribute.
              </p>
              <a
                href="https://github.com/CoolFutures/RainSure"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Contribute on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function Zap({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
