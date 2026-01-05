"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CheckCircle, Circle, Clock, Rocket, Globe, GitBranch, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/ui/page-shell";

const PHASES = [
  {
    period: "Q2 2026",
    title: "Testnet Launch",
    status: "COMPLETED",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    dotColor: "bg-emerald-400",
    lineColor: "bg-emerald-500/30",
    icon: CheckCircle,
    iconColor: "text-emerald-400",
    milestones: [
      { text: "Deploy PolicyEngine v1.0 Soroban contract to Stellar Testnet", done: true },
      { text: "Integrate WeatherXM oracle adapter with multi-node consensus logic", done: true },
      { text: "Launch RiskPool contract with XLM staking and premium distribution", done: true },
      { text: "Publish open-source contract audit by Halborn Security", done: true },
    ],
  },
  {
    period: "Q3 2026",
    title: "Mainnet Alpha",
    status: "IN PROGRESS",
    statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    dotColor: "bg-cyan-400 animate-pulse",
    lineColor: "bg-cyan-500/20",
    icon: Clock,
    iconColor: "text-cyan-400",
    milestones: [
      { text: "Migrate all contracts to Stellar Mainnet with upgraded Soroban runtime", done: true },
      { text: "Onboard 500+ smallholder farmers across West Africa and South Asia pilots", done: true },
      { text: "Deploy Acurast TEE attestation layer for tamper-proof oracle signing", done: false },
      { text: "Launch LP interface and first $1M TVL milestone", done: false },
    ],
  },
  {
    period: "Q4 2026",
    title: "Protocol v2",
    status: "UPCOMING",
    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    dotColor: "bg-blue-400/40",
    lineColor: "bg-blue-500/10",
    icon: Rocket,
    iconColor: "text-blue-400",
    milestones: [
      { text: "Multi-peril triggers: drought, frost, and excess rainfall in a single policy", done: false },
      { text: "Satellite NDVI integration for crop health as secondary verification layer", done: false },
      { text: "DAO governance module: LP token holders vote on pool parameters", done: false },
      { text: "Cross-chain bridge enabling USDC liquidity into Stellar risk pools", done: false },
    ],
  },
  {
    period: "Q1 2027",
    title: "Global Scale",
    status: "FUTURE",
    statusColor: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    dotColor: "bg-slate-600",
    lineColor: "bg-slate-700",
    icon: Globe,
    iconColor: "text-slate-400",
    milestones: [
      { text: "100 oracle node network with node staking rewards and slashing conditions", done: false },
      { text: "Mobile-first PWA for offline policy enrollment in low-connectivity regions", done: false },
      { text: "Reinsurance integration with institutional capital via ILS token tranches", done: false },
      { text: "10M farmer coverage target with World Bank partnership for data validation", done: false },
    ],
  },
];

const OPEN_ISSUES = [
  { id: 142, title: "Add support for satellite rainfall data (NASA GPM) as oracle source", label: "enhancement", priority: "high" },
  { id: 138, title: "Implement rolling 30-day window calculation in PolicyEngine contract", label: "contract", priority: "high" },
  { id: 131, title: "Build LP withdrawal queue mechanism to handle large simultaneous exits", label: "contract", priority: "medium" },
  { id: 124, title: "Create Soroban event indexer for trigger event history page", label: "frontend", priority: "medium" },
  { id: 117, title: "Add multi-language support (Swahili, Hindi, Portuguese) to PWA interface", label: "frontend", priority: "low" },
];

const LABEL_COLORS: Record<string, string> = {
  enhancement: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  contract: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  frontend: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "text-red-400",
  medium: "text-amber-400",
  low: "text-slate-500",
};

export default function RoadmapPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <PageShell>
      <div className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          {/* PAGE HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-3">protocol roadmap</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
              Protocol <span className="text-cyan-400">Roadmap</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-slate-400" : "text-slate-600")}>
              RainSure is built iteratively in public. Every phase is tracked on-chain where possible. Track our progress, pick up open issues, and help us reach global scale.
            </p>
          </motion.div>

          {/* TIMELINE */}
          <div className="relative mb-20">
            {/* Vertical Line */}
            <div className={cn(
              "absolute left-8 top-4 bottom-4 w-0.5",
              isDark ? "bg-slate-800" : "bg-slate-200"
            )} />

            <div className="space-y-8">
              {PHASES.map((phase, phaseIdx) => {
                const PhaseIcon = phase.icon;
                const isExpanded = expanded === phaseIdx;

                return (
                  <motion.div
                    key={phase.period}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: phaseIdx * 0.1 }}
                    className="relative pl-20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-5 -translate-x-1/2 -translate-y-1/2">
                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", isDark ? "bg-slate-950 border-2 border-slate-800" : "bg-white border-2 border-slate-200")}>
                        <div className={cn("w-2.5 h-2.5 rounded-full", phase.dotColor)} />
                      </div>
                    </div>

                    <div className={cn(
                      "rounded-2xl border overflow-hidden transition-all",
                      isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                    )}>
                      {/* Phase Header */}
                      <button
                        className="w-full p-6 text-left"
                        onClick={() => setExpanded(isExpanded ? null : phaseIdx)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", isDark ? "bg-slate-800" : "bg-slate-100")}>
                              <PhaseIcon className={cn("w-5 h-5", phase.iconColor)} />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">{phase.period}</span>
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border",
                                  phase.statusColor
                                )}>
                                  {phase.status}
                                </span>
                              </div>
                              <h3 className={cn("text-xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-slate-900")}>{phase.title}</h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={cn("text-[10px] font-bold", isDark ? "text-slate-600" : "text-slate-400")}>
                              {phase.milestones.filter(m => m.done).length}/{phase.milestones.length}
                            </span>
                            {isExpanded
                              ? <ChevronUp className="w-4 h-4 text-slate-500" />
                              : <ChevronDown className="w-4 h-4 text-slate-500" />
                            }
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className={cn("mt-4 h-1.5 rounded-full overflow-hidden", isDark ? "bg-slate-800" : "bg-slate-200")}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(phase.milestones.filter(m => m.done).length / phase.milestones.length) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: phaseIdx * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          />
                        </div>
                      </button>

                      {/* Milestones */}
                      {isExpanded && (
                        <div className={cn("px-6 pb-6 border-t", isDark ? "border-slate-800" : "border-slate-100")}>
                          <div className="space-y-3 pt-5">
                            {phase.milestones.map((milestone, mIdx) => (
                              <motion.div
                                key={mIdx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: mIdx * 0.06 }}
                                className="flex items-start gap-3"
                              >
                                {milestone.done ? (
                                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <Circle className={cn("w-4 h-4 shrink-0 mt-0.5", isDark ? "text-slate-700" : "text-slate-300")} />
                                )}
                                <span className={cn(
                                  "text-sm leading-relaxed",
                                  milestone.done
                                    ? isDark ? "text-slate-300" : "text-slate-700"
                                    : isDark ? "text-slate-500" : "text-slate-500"
                                )}>
                                  {milestone.text}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* OPEN ISSUES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              <h2 className={cn("text-2xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                Open Issues
              </h2>
              <a
                href="https://github.com/CoolFutures/RainSure/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[11px] font-bold uppercase tracking-wider text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                View All on GitHub →
              </a>
            </div>

            <div className={cn("rounded-2xl border overflow-hidden", isDark ? "border-slate-800" : "border-slate-200")}>
              {OPEN_ISSUES.map((issue, i) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 border-b last:border-b-0 transition-colors cursor-pointer group",
                    isDark ? "border-slate-800 hover:bg-slate-800/40" : "border-slate-100 hover:bg-slate-50"
                  )}
                >
                  <span className={cn("text-[11px] font-mono font-bold", isDark ? "text-slate-600" : "text-slate-400")}>#{issue.id}</span>
                  <p className={cn("text-sm flex-1 group-hover:text-cyan-400 transition-colors", isDark ? "text-slate-300" : "text-slate-700")}>{issue.title}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider", LABEL_COLORS[issue.label])}>
                      {issue.label}
                    </span>
                    <span className={cn("text-[10px] font-bold uppercase", PRIORITY_COLORS[issue.priority])}>
                      {issue.priority}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-3xl p-10 border text-center relative overflow-hidden",
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            )}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h2 className={cn("text-3xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
                Help Shape the Roadmap
              </h2>
              <p className={cn("text-sm mb-7 max-w-lg mx-auto", isDark ? "text-slate-400" : "text-slate-600")}>
                RainSure is built in public. Join the GitHub Discussions to propose features, vote on priorities, and contribute to the protocol that will protect billions from climate risk.
              </p>
              <a
                href="https://github.com/CoolFutures/RainSure"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <GitBranch className="w-4 h-4" /> Contribute on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
