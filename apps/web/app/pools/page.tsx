"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Layers, TrendingUp, DollarSign, Users, X, ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/ui/page-shell";

const POOLS = [
  {
    name: "West Africa Rainfall Pool",
    region: "West Africa",
    flag: "🌍",
    tvl: "$1,240,000",
    tvlRaw: 1240000,
    apy: 9.4,
    utilization: 72,
    policies: 187,
    capacity: "$1,720,000",
    capacityRaw: 1720000,
    color: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/30",
    accent: "text-cyan-400",
    description: "Covers rainfall deficits across the Sahel, Niger Delta, and coastal West Africa. Seasonal rebalancing every quarter.",
  },
  {
    name: "South Asia Monsoon Pool",
    region: "South Asia",
    flag: "🌏",
    tvl: "$2,105,000",
    tvlRaw: 2105000,
    apy: 11.2,
    utilization: 88,
    policies: 341,
    capacity: "$2,390,000",
    capacityRaw: 2390000,
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    accent: "text-blue-400",
    description: "Monsoon-indexed coverage for India, Bangladesh, and Sri Lanka. High utilization during June–September season.",
  },
  {
    name: "East Africa Drought Pool",
    region: "East Africa",
    flag: "🌍",
    tvl: "$890,000",
    tvlRaw: 890000,
    apy: 8.1,
    utilization: 54,
    policies: 129,
    capacity: "$1,650,000",
    capacityRaw: 1650000,
    color: "from-indigo-500/20 to-indigo-500/5",
    borderColor: "border-indigo-500/30",
    accent: "text-indigo-400",
    description: "Drought protection for the Horn of Africa. Partners with FAO and WFP Digital for distribution.",
  },
  {
    name: "Latin America Pool",
    region: "Latin America",
    flag: "🌎",
    tvl: "$1,580,000",
    tvlRaw: 1580000,
    apy: 7.8,
    utilization: 61,
    policies: 208,
    capacity: "$2,590,000",
    capacityRaw: 2590000,
    color: "from-teal-500/20 to-teal-500/5",
    borderColor: "border-teal-500/30",
    accent: "text-teal-400",
    description: "Covers Brazil, Mexico, Peru, and Colombia. Indexed against ENSO patterns and regional station data.",
  },
  {
    name: "Southeast Asia Pool",
    region: "Southeast Asia",
    flag: "🌏",
    tvl: "$1,320,000",
    tvlRaw: 1320000,
    apy: 10.5,
    utilization: 79,
    policies: 274,
    capacity: "$1,672,000",
    capacityRaw: 1672000,
    color: "from-sky-500/20 to-sky-500/5",
    borderColor: "border-sky-500/30",
    accent: "text-sky-400",
    description: "Mekong basin, Irrawaddy Delta, and Philippines archipelago coverage. Typhoon and drought triggers.",
  },
  {
    name: "Mediterranean Pool",
    region: "Mediterranean",
    flag: "🌍",
    tvl: "$730,000",
    tvlRaw: 730000,
    apy: 6.9,
    utilization: 43,
    policies: 108,
    capacity: "$1,700,000",
    capacityRaw: 1700000,
    color: "from-violet-500/20 to-violet-500/5",
    borderColor: "border-violet-500/30",
    accent: "text-violet-400",
    description: "Summer drought coverage for Spain, Morocco, Tunisia, and Turkey. Early-stage pool with growth capacity.",
  },
];

const STATS = [
  { label: "Total TVL", value: "$7.86M", icon: DollarSign, color: "text-cyan-400" },
  { label: "Average APY", value: "9.0%", icon: TrendingUp, color: "text-blue-400" },
  { label: "Total Capacity", value: "$11.7M", icon: Layers, color: "text-indigo-400" },
  { label: "LP Providers", value: "1,843", icon: Users, color: "text-cyan-300" },
];

export default function PoolsPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<typeof POOLS[0] | null>(null);

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
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-3">contracts/risk-pool</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
              Liquidity <span className="text-cyan-400">Pools</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-slate-400" : "text-slate-600")}>
              Capital providers stake into regional risk pools, earning premiums while backing real-world parametric coverage. All positions are non-custodial and on-chain.
            </p>
          </motion.div>

          {/* STATS */}
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

          {/* POOL GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-16">
            {POOLS.map((pool, i) => (
              <motion.div
                key={pool.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "p-6 rounded-2xl border transition-all hover:shadow-xl group cursor-pointer",
                  isDark
                    ? `bg-slate-900/60 ${pool.borderColor} hover:border-opacity-60`
                    : "bg-white border-slate-200 hover:border-cyan-300"
                )}
                onClick={() => { setSelectedPool(pool); setModalOpen(true); }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="text-2xl mb-2 block">{pool.flag}</span>
                    <h3 className={cn("font-black text-base uppercase tracking-tight leading-tight", isDark ? "text-white" : "text-slate-900")}>{pool.name}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{pool.region}</p>
                  </div>
                  <div className={cn(
                    "px-3 py-1.5 rounded-xl text-sm font-black",
                    isDark ? "bg-slate-800" : "bg-slate-100"
                  )}>
                    <span className={pool.accent}>{pool.apy}%</span>
                    <span className="text-slate-500 text-[10px] font-bold ml-1">APY</span>
                  </div>
                </div>

                {/* TVL */}
                <div className={cn(
                  "grid grid-cols-2 gap-3 p-3 rounded-xl mb-4",
                  isDark ? "bg-slate-800/60" : "bg-slate-50"
                )}>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">TVL</p>
                    <p className={cn("font-black text-sm", isDark ? "text-white" : "text-slate-900")}>{pool.tvl}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Policies</p>
                    <p className={cn("font-black text-sm", isDark ? "text-white" : "text-slate-900")}>{pool.policies}</p>
                  </div>
                </div>

                {/* Utilization Bar */}
                <div className="mb-5">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Utilization</span>
                    <span className={cn("text-[10px] font-bold", pool.accent)}>{pool.utilization}%</span>
                  </div>
                  <div className={cn("h-2 rounded-full overflow-hidden", isDark ? "bg-slate-800" : "bg-slate-200")}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pool.utilization}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", `bg-gradient-to-r ${pool.color.replace("/20", "").replace("/5", "")}`)}
                      style={{
                        background: pool.utilization > 80
                          ? "linear-gradient(to right, #f59e0b, #ef4444)"
                          : pool.utilization > 60
                          ? "linear-gradient(to right, #06b6d4, #3b82f6)"
                          : "linear-gradient(to right, #06b6d4, #22d3ee)"
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-slate-600">0</span>
                    <span className="text-[9px] text-slate-600">{pool.capacity}</span>
                  </div>
                </div>

                <button
                  onClick={e => { e.stopPropagation(); setSelectedPool(pool); setModalOpen(true); }}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                    "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
                  )}
                >
                  Provide Liquidity <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-3xl p-10 border relative overflow-hidden",
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            )}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-4">Pool Mechanics</p>
              <h2 className={cn("text-3xl font-black uppercase tracking-tight mb-8", isDark ? "text-white" : "text-slate-900")}>
                How Liquidity Provision Works
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { n: "01", title: "Stake XLM", desc: "Deposit Stellar Lumens into a regional pool. Your capital backs parametric coverage for farmers in that region." },
                  { n: "02", title: "Earn Premiums", desc: "Premium payments from policyholders are distributed pro-rata to liquidity providers. APY varies by pool utilization." },
                  { n: "03", title: "Auto Settlement", desc: "If a trigger fires, the smart contract automatically deducts from the pool and settles to the policyholder. No manual steps." },
                ].map((step) => (
                  <div key={step.n} className={cn(
                    "p-5 rounded-2xl border",
                    isDark ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-200"
                  )}>
                    <div className="text-[10px] font-mono text-cyan-500 mb-2 tracking-widest">{step.n}</div>
                    <h3 className={cn("font-black uppercase text-sm tracking-tight mb-2", isDark ? "text-white" : "text-slate-900")}>{step.title}</h3>
                    <p className={cn("text-xs leading-relaxed", isDark ? "text-slate-400" : "text-slate-600")}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* LIQUIDITY MODAL */}
      <AnimatePresence>
        {modalOpen && selectedPool && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-t-2xl" />
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Provide Liquidity</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-1">{selectedPool.name}</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-cyan-300 font-bold mb-1">Current APY: {selectedPool.apy}%</p>
                    <p className="text-xs text-slate-400">Connect your Freighter wallet to stake XLM into this pool. Minimum deposit: 100 XLM.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className={cn("p-3 rounded-xl", "bg-slate-800/60 border border-slate-700")}>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-2">Deposit Amount (XLM)</label>
                  <input
                    type="number"
                    placeholder="1000"
                    className="w-full bg-transparent text-white font-mono text-lg outline-none placeholder-slate-700"
                    readOnly
                  />
                </div>
              </div>
              <button
                className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors"
                onClick={() => setModalOpen(false)}
              >
                Connect Wallet to Continue
              </button>
              <p className="text-center text-[10px] text-slate-700 mt-4 uppercase tracking-widest">Non-custodial · Soroban Smart Contract</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
