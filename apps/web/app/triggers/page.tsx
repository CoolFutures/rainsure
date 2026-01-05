"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Radio, Zap, AlertTriangle, CheckCircle, Activity, Globe, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/ui/page-shell";

const TRIGGER_EVENTS = [
  { date: "2026-05-12", station: "Nairobi-WMO-042", location: "Nairobi, Kenya", reading: "8.2mm", threshold: "20mm", duration: "21 days", status: "Triggered", payout: "$67,500" },
  { date: "2026-05-10", station: "Dhaka-GSN-101", location: "Dhaka, Bangladesh", reading: "14.1mm", threshold: "25mm", duration: "17 days", status: "Triggered", payout: "$120,000" },
  { date: "2026-05-09", station: "Lagos-SYNOP-114", location: "Lagos, Nigeria", reading: "31.5mm", threshold: "18mm", duration: "N/A", status: "Normal", payout: "—" },
  { date: "2026-05-08", station: "Oaxaca-SMN-088", location: "Oaxaca, Mexico", reading: "4.7mm", threshold: "20mm", duration: "11 days", status: "Triggered", payout: "$38,000" },
  { date: "2026-05-07", station: "Patna-IMD-076", location: "Bihar, India", reading: "19.8mm", threshold: "25mm", duration: "N/A", status: "Normal", payout: "—" },
  { date: "2026-05-06", station: "Hanoi-GSN-203", location: "Hanoi, Vietnam", reading: "27.3mm", threshold: "22mm", duration: "N/A", status: "Normal", payout: "—" },
  { date: "2026-05-05", station: "Addis-WMO-061", location: "Addis Ababa, Ethiopia", reading: "5.1mm", threshold: "12mm", duration: "14 days", status: "Triggered", payout: "$52,000" },
  { date: "2026-05-03", station: "Karachi-PAK-039", location: "Karachi, Pakistan", reading: "2.3mm", threshold: "15mm", duration: "30 days", status: "Triggered", payout: "$94,000" },
  { date: "2026-05-02", station: "Manila-PAGASA-017", location: "Manila, Philippines", reading: "41.2mm", threshold: "22mm", duration: "N/A", status: "Normal", payout: "—" },
  { date: "2026-04-30", station: "Accra-GMet-055", location: "Accra, Ghana", reading: "9.4mm", threshold: "18mm", duration: "18 days", status: "Triggered", payout: "$29,000" },
];

const ORACLE_NODES = [
  { id: "NODE-001", name: "Nairobi-WMO-042", location: "Nairobi, Kenya", status: "Active", lastReading: "8.2mm", uptime: 99.7, provider: "WeatherXM" },
  { id: "NODE-002", name: "Dhaka-GSN-101", location: "Dhaka, Bangladesh", status: "Active", lastReading: "14.1mm", uptime: 99.2, provider: "Meteomatics" },
  { id: "NODE-003", name: "Lagos-SYNOP-114", location: "Lagos, Nigeria", status: "Active", lastReading: "31.5mm", uptime: 98.8, provider: "NOAA Integration" },
  { id: "NODE-004", name: "Oaxaca-SMN-088", location: "Oaxaca, Mexico", status: "Degraded", lastReading: "4.7mm", uptime: 91.4, provider: "WeatherXM" },
  { id: "NODE-005", name: "Patna-IMD-076", location: "Bihar, India", status: "Active", lastReading: "19.8mm", uptime: 99.9, provider: "Meteomatics" },
  { id: "NODE-006", name: "Addis-WMO-061", location: "Addis Ababa, Ethiopia", status: "Active", lastReading: "5.1mm", uptime: 97.3, provider: "NOAA Integration" },
];

export default function TriggersPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

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
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-3">contracts/weather-oracle</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
              Oracle <span className="text-cyan-400">Triggers</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-slate-400" : "text-slate-600")}>
              Every settlement is triggered by verified weather oracle data. No adjuster, no appeals, no delay—just climate truth and automatic execution.
            </p>
          </motion.div>

          {/* HOW TRIGGERS WORK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "grid md:grid-cols-3 gap-4 mb-12 p-6 rounded-2xl border",
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
            )}
          >
            {[
              {
                icon: Activity,
                title: "Continuous Monitoring",
                desc: "87 oracle nodes report rainfall readings every 6 hours. Data is aggregated via multi-node consensus to prevent manipulation.",
                color: "text-cyan-400",
                bg: isDark ? "bg-cyan-500/10" : "bg-cyan-50",
              },
              {
                icon: AlertTriangle,
                title: "Threshold Evaluation",
                desc: "The policy contract checks if accumulated rainfall over the trigger window falls below the insured threshold. Pure on-chain logic.",
                color: "text-amber-400",
                bg: isDark ? "bg-amber-500/10" : "bg-amber-50",
              },
              {
                icon: Zap,
                title: "Instant Settlement",
                desc: "Trigger confirmed → settlement fires in <1 second. XLM transferred directly to the policyholder's Stellar address. No human in the loop.",
                color: "text-indigo-400",
                bg: isDark ? "bg-indigo-500/10" : "bg-indigo-50",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.bg)}>
                  <item.icon className={cn("w-5 h-5", item.color)} />
                </div>
                <div>
                  <h3 className={cn("font-black text-sm uppercase tracking-tight mb-1", isDark ? "text-white" : "text-slate-900")}>{item.title}</h3>
                  <p className={cn("text-xs leading-relaxed", isDark ? "text-slate-400" : "text-slate-600")}>{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* LIVE FEED */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className={cn("text-2xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-slate-900")}>Live Trigger Feed</h2>
              <span className={cn(
                "ml-auto px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-600"
              )}>Last 10 Events</span>
            </div>

            <div className={cn("rounded-2xl border overflow-hidden", isDark ? "border-slate-800" : "border-slate-200")}>
              <div className={cn(
                "grid grid-cols-8 gap-3 px-5 py-3 text-[10px] font-bold uppercase tracking-widest",
                isDark ? "bg-slate-800/80 text-slate-500" : "bg-slate-50 text-slate-500"
              )}>
                <span>Date</span>
                <span className="col-span-2">Station</span>
                <span>Reading</span>
                <span>Threshold</span>
                <span>Duration</span>
                <span>Status</span>
                <span className="text-right">Payout</span>
              </div>

              {TRIGGER_EVENTS.map((event, i) => (
                <motion.div
                  key={`${event.date}-${event.station}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "grid grid-cols-8 gap-3 px-5 py-4 border-t text-xs transition-colors",
                    isDark ? "border-slate-800 hover:bg-slate-800/40" : "border-slate-100 hover:bg-slate-50",
                    i % 2 === 0 && isDark ? "bg-slate-900/30" : ""
                  )}
                >
                  <span className={cn("font-mono", isDark ? "text-slate-500" : "text-slate-500")}>{event.date}</span>
                  <div className="col-span-2">
                    <p className={cn("font-mono font-bold text-xs", isDark ? "text-slate-300" : "text-slate-700")}>{event.station}</p>
                    <p className={cn("text-[10px]", isDark ? "text-slate-600" : "text-slate-500")}>{event.location}</p>
                  </div>
                  <span className={cn("font-mono font-bold", event.status === "Triggered" ? "text-amber-400" : isDark ? "text-slate-300" : "text-slate-700")}>{event.reading}</span>
                  <span className={cn("font-mono", isDark ? "text-slate-500" : "text-slate-500")}>{event.threshold}</span>
                  <span className={cn("font-mono", isDark ? "text-slate-500" : "text-slate-500")}>{event.duration}</span>
                  <span>
                    {event.status === "Triggered" ? (
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <AlertTriangle className="w-3 h-3" /> Triggered
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle className="w-3 h-3" /> Normal
                      </span>
                    )}
                  </span>
                  <span className={cn("text-right font-mono font-bold", event.status === "Triggered" ? "text-cyan-400" : isDark ? "text-slate-600" : "text-slate-400")}>{event.payout}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ORACLE NODES */}
          <div className="mb-14">
            <h2 className={cn("text-2xl font-black uppercase tracking-tight mb-6", isDark ? "text-white" : "text-slate-900")}>
              Oracle Network <span className="text-cyan-400">— {ORACLE_NODES.length} Nodes</span>
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {ORACLE_NODES.map((node, i) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={cn(
                    "p-5 rounded-2xl border transition-all",
                    isDark ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/20" : "bg-white border-slate-200 hover:border-cyan-300"
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", isDark ? "bg-slate-800" : "bg-slate-100")}>
                        <Server className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-slate-500">{node.id}</p>
                        <p className={cn("font-bold text-xs", isDark ? "text-white" : "text-slate-900")}>{node.name}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider",
                      node.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    )}>
                      {node.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className={isDark ? "text-slate-500" : "text-slate-500"}>Location</span>
                      <span className={cn("font-medium", isDark ? "text-slate-300" : "text-slate-700")}>{node.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? "text-slate-500" : "text-slate-500"}>Provider</span>
                      <span className="font-medium text-cyan-400">{node.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? "text-slate-500" : "text-slate-500"}>Last Reading</span>
                      <span className={cn("font-mono font-bold", isDark ? "text-white" : "text-slate-900")}>{node.lastReading}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={isDark ? "text-slate-500" : "text-slate-500"}>Uptime</span>
                      <span className={cn("font-bold", node.uptime > 98 ? "text-emerald-400" : "text-amber-400")}>{node.uptime}%</span>
                    </div>
                    <div className={cn("h-1 rounded-full mt-2", isDark ? "bg-slate-800" : "bg-slate-200")}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${node.uptime}%`, background: node.uptime > 98 ? "#10b981" : "#f59e0b" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn("rounded-3xl p-10 border text-center relative overflow-hidden", isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <Radio className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
              <h2 className={cn("text-3xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
                Run an Oracle Node
              </h2>
              <p className={cn("text-sm mb-7 max-w-lg mx-auto", isDark ? "text-slate-400" : "text-slate-600")}>
                Help decentralize the oracle network by running a verified weather station node. Earn oracle fees for accurate data submissions.
              </p>
              <a
                href="https://github.com/CoolFutures/RainSure"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <Globe className="w-4 h-4" /> Join Oracle Network
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
