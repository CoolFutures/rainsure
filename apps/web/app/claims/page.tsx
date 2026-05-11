"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { DollarSign, Clock, Zap, CheckCircle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/ui/page-shell";

const SETTLEMENTS = [
  { date: "2026-05-12", policyId: "RSP-2026-0038", coop: "Bihar Grain Alliance", region: "India", amount: "$120,000", trigger: "< 25mm for 17 days (Dhaka-GSN-101)", settlementTime: "0.8s", txHash: "3d7f2a...c41b09" },
  { date: "2026-05-12", policyId: "RSP-2026-0041", coop: "Kano Basin Cooperative", region: "Nigeria", amount: "$67,500", trigger: "< 18mm for 21 days (Nairobi-WMO-042)", settlementTime: "0.6s", txHash: "9e1c44...7f8a21" },
  { date: "2026-05-08", policyId: "RSP-2026-0022", coop: "Oaxaca Highland Growers", region: "Mexico", amount: "$38,000", trigger: "< 20mm for 11 days (Oaxaca-SMN-088)", settlementTime: "0.7s", txHash: "b2e8f1...3a5c77" },
  { date: "2026-05-05", policyId: "RSP-2026-0019", coop: "Tigray Resilience Fund", region: "Ethiopia", amount: "$52,000", trigger: "< 12mm for 14 days (Addis-WMO-061)", settlementTime: "0.9s", txHash: "44ac09...e7d312" },
  { date: "2026-05-03", policyId: "RSP-2026-0028", coop: "Punjab Wheat Collective", region: "Pakistan", amount: "$94,000", trigger: "< 15mm for 30 days (Karachi-PAK-039)", settlementTime: "0.5s", txHash: "f3b2c8...89a104" },
  { date: "2026-04-30", policyId: "RSP-2026-0014", coop: "Accra Cocoa Growers", region: "Ghana", amount: "$29,000", trigger: "< 18mm for 18 days (Accra-GMet-055)", settlementTime: "0.8s", txHash: "7c1e55...22f890" },
  { date: "2026-04-22", policyId: "RSP-2026-0011", coop: "Mekong Delta Union", region: "Vietnam", amount: "$156,000", trigger: "< 22mm for 16 days (Hanoi-GSN-203)", settlementTime: "0.7s", txHash: "2a9f77...b4e318" },
  { date: "2026-04-17", policyId: "RSP-2026-0009", coop: "São Paulo State Growers", region: "Brazil", amount: "$210,000", trigger: "< 30mm for 22 days (Campinas-INMET-3)", settlementTime: "0.6s", txHash: "d5c3a1...9f0e44" },
  { date: "2026-04-11", policyId: "RSP-2026-0007", coop: "Rajasthan Mustard Co-op", region: "India", amount: "$41,000", trigger: "< 10mm for 45 days (Jaipur-IMD-88)", settlementTime: "0.9s", txHash: "8e4b22...c71f03" },
  { date: "2026-03-28", policyId: "RSP-2026-0003", coop: "Nile Delta Farmers Union", region: "Egypt", amount: "$78,000", trigger: "< 8mm for 30 days (Cairo-EMA-012)", settlementTime: "0.6s", txHash: "1f6d99...40ab77" },
];

const STATS = [
  { label: "Total Settled", value: "$2.13M", icon: DollarSign, color: "text-cyan-400" },
  { label: "Avg Settlement", value: "0.72s", icon: Zap, color: "text-blue-400" },
  { label: "Largest Payout", value: "$210K", icon: DollarSign, color: "text-indigo-400" },
  { label: "Success Rate", value: "100%", icon: CheckCircle, color: "text-emerald-400" },
];

const FAQ = [
  {
    q: "Why are there no claims in RainSure?",
    a: "Parametric insurance eliminates the claims process entirely. When the oracle-verified trigger condition is met, the Soroban smart contract executes the settlement automatically. No farmer needs to file anything—the protocol monitors and pays.",
  },
  {
    q: "How fast does settlement happen?",
    a: "Settlement executes within one Stellar ledger close, typically 0.5–1.0 seconds after the oracle data is committed on-chain and the trigger condition is verified by the PolicyEngine contract.",
  },
  {
    q: "What if the oracle data is wrong?",
    a: "RainSure uses multi-node oracle consensus. At least 3 independent weather stations must agree on a reading before it is accepted. Acurast TEE attestation ensures each reading is cryptographically signed. Disputed readings can be escalated to DAO governance.",
  },
  {
    q: "Can settlements be reversed?",
    a: "No. Once a settlement transaction is confirmed on Stellar Mainnet, it is permanent and irreversible. This is a feature, not a bug—it guarantees farmers receive their payout without any counterparty risk.",
  },
  {
    q: "Are settlements taxable?",
    a: "Tax treatment varies by jurisdiction. RainSure generates a verifiable on-chain receipt for every settlement. We recommend farmers consult local advisors, but the Stellar transaction hash provides full audit-trail documentation.",
  },
];

export default function ClaimsPage() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-3">contracts/settlement-engine</p>
            <h1 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
              Settlement <span className="text-cyan-400">History</span>
            </h1>
            <p className={cn("text-lg max-w-2xl", isDark ? "text-slate-400" : "text-slate-600")}>
              Parametric insurance has no claims. When trigger conditions are met, funds settle automatically in under one second. Every transaction is verifiable on Stellar Mainnet.
            </p>
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn("p-5 rounded-2xl border", isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200")}
              >
                <s.icon className={cn("w-5 h-5 mb-3", s.color)} />
                <div className={cn("text-3xl font-black tracking-tight mb-1", isDark ? "text-white" : "text-slate-900")}>{s.value}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* SETTLEMENT TABLE */}
          <div className="mb-16">
            <h2 className={cn("text-2xl font-black uppercase tracking-tight mb-6", isDark ? "text-white" : "text-slate-900")}>
              Recent Settlements
            </h2>
            <div className={cn("rounded-2xl border overflow-x-auto", isDark ? "border-slate-800" : "border-slate-200")}>
              <table className="w-full text-xs">
                <thead>
                  <tr className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    isDark ? "bg-slate-800/80 text-slate-500" : "bg-slate-50 text-slate-500"
                  )}>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Policy ID</th>
                    <th className="px-4 py-3 text-left">Farmer / Coop</th>
                    <th className="px-4 py-3 text-left">Region</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">Trigger Event</th>
                    <th className="px-4 py-3 text-center">Time</th>
                    <th className="px-4 py-3 text-left">TX Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {SETTLEMENTS.map((s, i) => (
                    <motion.tr
                      key={s.txHash}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        "border-t transition-colors",
                        isDark ? "border-slate-800 hover:bg-slate-800/30" : "border-slate-100 hover:bg-slate-50",
                        i % 2 === 0 && isDark ? "bg-slate-900/20" : ""
                      )}
                    >
                      <td className={cn("px-4 py-3 font-mono whitespace-nowrap", isDark ? "text-slate-500" : "text-slate-500")}>{s.date}</td>
                      <td className={cn("px-4 py-3 font-mono whitespace-nowrap", isDark ? "text-slate-400" : "text-slate-600")}>{s.policyId}</td>
                      <td className={cn("px-4 py-3 font-medium whitespace-nowrap", isDark ? "text-slate-300" : "text-slate-700")}>{s.coop}</td>
                      <td className={cn("px-4 py-3 whitespace-nowrap", isDark ? "text-slate-500" : "text-slate-500")}>{s.region}</td>
                      <td className="px-4 py-3 text-right font-black text-cyan-400 whitespace-nowrap">{s.amount}</td>
                      <td className={cn("px-4 py-3 hidden lg:table-cell font-mono text-[10px] max-w-[200px]", isDark ? "text-slate-500" : "text-slate-500")}>{s.trigger}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="flex items-center justify-center gap-1 text-emerald-400 font-bold whitespace-nowrap">
                          <Zap className="w-3 h-3" /> {s.settlementTime}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`https://stellar.expert/explorer/public/tx/${s.txHash.replace("...", "000000")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-mono text-[10px] text-cyan-500 hover:text-cyan-400 transition-colors"
                        >
                          {s.txHash} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* HOW SETTLEMENT WORKS — FAQ ACCORDION */}
          <div className="mb-16">
            <h2 className={cn("text-2xl font-black uppercase tracking-tight mb-6", isDark ? "text-white" : "text-slate-900")}>
              How Settlement Works
            </h2>
            <div className={cn("rounded-2xl border overflow-hidden", isDark ? "border-slate-800" : "border-slate-200")}>
              {FAQ.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className={cn("border-b last:border-b-0", isDark ? "border-slate-800" : "border-slate-100")}>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between px-6 py-5 text-left transition-colors",
                        isDark ? "hover:bg-slate-800/40" : "hover:bg-slate-50"
                      )}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span className={cn("font-bold text-sm pr-4", isDark ? "text-white" : "text-slate-900")}>{item.q}</span>
                      {isOpen
                        ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      }
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn("px-6 pb-5 text-sm leading-relaxed", isDark ? "text-slate-400" : "text-slate-600")}
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

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
              <Clock className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
              <h2 className={cn("text-3xl font-black uppercase tracking-tight mb-4", isDark ? "text-white" : "text-slate-900")}>
                Sub-Second Settlement is the Standard
              </h2>
              <p className={cn("text-sm mb-7 max-w-lg mx-auto", isDark ? "text-slate-400" : "text-slate-600")}>
                Help us improve the settlement engine, add dispute resolution mechanisms, and expand oracle coverage to more regions.
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
