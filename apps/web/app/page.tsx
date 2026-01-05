"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  CloudRain, Droplets, ShieldCheck, Zap, Globe,
  Network, ArrowRight, Moon, Sun, Wallet, X, ChevronRight,
  AlertCircle, TrendingUp, Lock, Layers,
  Database, Cpu, Users, GitBranch
} from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    freighter?: {
      isConnected: () => Promise<boolean>;
      getAddress: () => Promise<{ address: string } | { error: string }>;
      getNetwork: () => Promise<{ network: string; networkPassphrase: string } | { error: string }>;
      requestAccess: () => Promise<{ address: string } | { error: string }>;
    };
  }
}

const MAINNET_PASSPHRASE = "Public Global Stellar Network ; September 2015";

function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (!window.freighter) {
        window.open("https://freighter.app", "_blank");
        setError("Freighter not found. Install it to continue.");
        return;
      }
      const result = await window.freighter.requestAccess();
      if ("error" in result) throw new Error(result.error);
      const net = await window.freighter.getNetwork();
      if ("error" in net) throw new Error(net.error);
      if (net.networkPassphrase !== MAINNET_PASSPHRASE) {
        setError("Switch to Stellar Mainnet in Freighter settings.");
        return;
      }
      setAddress(result.address);
    } catch (err: any) {
      setError(err.message || "Connection failed.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => setAddress(null);
  return { address, isConnecting, error, connect, disconnect };
}

const btn = (variant: string, size: string, extra = "") => {
  const v: Record<string, string> = {
    primary: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20",
    outline: "border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
    glass: "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 text-white",
    danger: "border border-red-500/40 text-red-400 hover:bg-red-500/10",
  };
  const s: Record<string, string> = {
    sm: "px-4 py-2 text-xs", md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-sm", xl: "px-12 py-5 text-base", icon: "p-2.5 w-10 h-10",
  };
  return cn(
    "rounded-xl font-bold uppercase tracking-widest transition-all duration-200 active:scale-95",
    "flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer",
    v[variant], s[size], extra
  );
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10" />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={btn("glass", "icon")}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Sun className="w-4 h-4 text-amber-400" />
          </motion.span>
        ) : (
          <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Moon className="w-4 h-4 text-cyan-600" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

const WalletModal = ({ isOpen, onClose, wallet }: {
  isOpen: boolean; onClose: () => void; wallet: ReturnType<typeof useWallet>;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-2xl"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-t-2xl" />
          <div className="flex items-center justify-between mb-7">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Connect Wallet</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-1">Stellar · Mainnet Only</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {wallet.error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-xs text-red-300">{wallet.error}</p>
            </div>
          )}

          {wallet.address ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Connected · Mainnet</p>
                </div>
                <p className="font-mono text-xs text-white break-all leading-relaxed">{wallet.address}</p>
              </div>
              <button className={btn("danger", "md", "w-full")} onClick={() => { wallet.disconnect(); onClose(); }}>
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={wallet.connect}
              disabled={wallet.isConnecting}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-500/30 transition-all text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                <Wallet className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="font-black text-white uppercase text-sm tracking-wide">Freighter</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Official Stellar Extension</p>
              </div>
              {wallet.isConnecting
                ? <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                : <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              }
            </button>
          )}
          <p className="text-center text-[10px] text-slate-700 mt-5 uppercase tracking-widest">Soroban Smart Contracts</p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const STATS = [
  { label: "Protocol TVL", value: "$4.2M", icon: TrendingUp, color: "text-cyan-400" },
  { label: "Active Pools", value: "24", icon: Layers, color: "text-blue-400" },
  { label: "Oracle Nodes", value: "87", icon: Network, color: "text-indigo-400" },
  { label: "Settlement", value: "< 1s", icon: Zap, color: "text-cyan-300" },
];

const PILLARS = [
  {
    icon: Cpu, title: "Policy Engine", tag: "contracts/policy-engine",
    desc: "Actuarial-grade smart contract logic calculates dynamic premiums from historical risk data and autonomously manages the full policy lifecycle—issuance, activation, automated expiry.",
    color: "border-cyan-500/20 hover:border-cyan-500/50",
  },
  {
    icon: Globe, title: "Oracle Network", tag: "contracts/weather-oracle",
    desc: "Aggregates cryptographically-verified telemetry from a decentralized mesh of weather stations. No single point of failure, no data manipulation—just pure climate truth.",
    color: "border-blue-500/20 hover:border-blue-500/50",
  },
  {
    icon: Database, title: "Risk Pool", tag: "contracts/risk-pool",
    desc: "Capital providers stake into regional liquidity pools, earning premiums while backing real-world climate risk. When triggers fire, payouts are instant and verifiable on-chain.",
    color: "border-indigo-500/20 hover:border-indigo-500/50",
  },
];

const HOW_IT_WORKS = [
  { n: "01", title: "Policy Issued", desc: "Farmer or cooperative purchases a parametric policy. Terms encoded immutably on Soroban." },
  { n: "02", title: "Oracle Monitors", desc: "Weather stations stream real-time rainfall and temperature data. Multi-node consensus prevents manipulation." },
  { n: "03", title: "Trigger Activated", desc: "If rainfall drops below threshold for X consecutive days, the trigger condition is met automatically." },
  { n: "04", title: "Instant Payout", desc: "Protocol executes settlement in <1 second. Funds land in the policy holder's Stellar wallet—no claims, no waiting." },
];

export default function RainSurePage() {
  const [walletOpen, setWalletOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wallet = useWallet();
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme !== "light";

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className={cn(
          "absolute inset-0",
          isDark ? "bg-slate-950" : "bg-slate-50"
        )} />
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full blur-[120px] opacity-30 bg-cyan-600/20 dark:bg-cyan-500/15" />
        <div className="absolute -bottom-60 -right-60 w-[700px] h-[700px] rounded-full blur-[120px] opacity-20 bg-blue-700/20 dark:bg-blue-600/10" />
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:64px_64px]"
            : "bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:64px_64px]"
        )} />
      </div>

      <WalletModal isOpen={walletOpen} onClose={() => setWalletOpen(false)} wallet={wallet} />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className={cn(
          "mx-4 mt-4 flex items-center justify-between px-5 py-3 rounded-2xl border backdrop-blur-xl",
          isDark
            ? "bg-slate-950/70 border-white/5"
            : "bg-white/70 border-slate-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <CloudRain className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className={cn("font-black text-lg uppercase tracking-tight leading-none block", isDark ? "text-white" : "text-slate-900")}>RainSure</span>
              <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.4em]">Soroban · Mainnet</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Protocol", href: "/" },
              { label: "Policies", href: "/policies" },
              { label: "Pools", href: "/pools" },
              { label: "Triggers", href: "/triggers" },
              { label: "Partners", href: "/partners" },
              { label: "Roadmap", href: "/roadmap" },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                className={cn("text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-cyan-400",
                  isDark ? "text-slate-500" : "text-slate-500")}
              >{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {wallet.address ? (
              <button
                onClick={() => setWalletOpen(true)}
                className={btn("glass", "sm", "gap-2")}
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono">{wallet.address.slice(0, 4)}…{wallet.address.slice(-4)}</span>
              </button>
            ) : (
              <button className={btn("primary", "sm")} onClick={() => setWalletOpen(true)}>
                <Wallet className="w-3.5 h-3.5" />
                Connect
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] mb-10",
              isDark ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" : "bg-cyan-50 border border-cyan-200 text-cyan-700"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Stellar Soroban · Mainnet Live
          </motion.div>

          <h1 className={cn(
            "text-[5rem] md:text-[9rem] lg:text-[12rem] font-black leading-[0.82] tracking-[-0.04em] uppercase mb-10",
            isDark ? "text-white" : "text-slate-900"
          )}>
            Rain<span className="text-cyan-400">.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500">
              Sure.
            </span>
          </h1>

          <p className={cn(
            "text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-14 font-medium",
            isDark ? "text-slate-400" : "text-slate-600"
          )}>
            The world&apos;s first fully autonomous parametric weather insurance engine.
            If rainfall drops below threshold, <strong className={isDark ? "text-white" : "text-slate-900"}>the protocol pays—automatically, instantly, verifiably.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={btn("primary", "lg", "shadow-xl shadow-cyan-500/20")} onClick={() => setWalletOpen(true)}>
              Launch Protocol <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#protocol" className={btn("glass", "lg")}>
              View Architecture
            </a>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-48 right-12 opacity-20 hidden lg:block"
        >
          <CloudRain className="w-24 h-24 text-cyan-400" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-12 left-16 opacity-10 hidden lg:block"
        >
          <Droplets className="w-20 h-20 text-blue-400" />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-5 rounded-2xl border transition-all",
                isDark
                  ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/30"
                  : "bg-white border-slate-200 hover:border-cyan-300"
              )}
            >
              <s.icon className={cn("w-5 h-5 mb-3", s.color)} />
              <div className={cn("text-3xl font-black tracking-tight mb-1", isDark ? "text-white" : "text-slate-900")}>
                {s.value}
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROTOCOL ARCHITECTURE */}
      <section id="protocol" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-4">Architecture</p>
            <h2 className={cn("text-4xl md:text-6xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-slate-900")}>
              Three Modules.<br />
              <span className="text-cyan-400">Zero Failure Points.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={cn(
                  "p-7 rounded-2xl border transition-all group",
                  isDark
                    ? cn("bg-slate-900/60 backdrop-blur-sm", p.color)
                    : "bg-white border-slate-200 hover:border-cyan-300",
                  "hover:shadow-xl"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                  isDark ? "bg-cyan-500/10" : "bg-cyan-50"
                )}>
                  <p.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-[9px] font-mono text-slate-500 mb-2 tracking-wider">{p.tag}</div>
                <h3 className={cn("text-xl font-black uppercase tracking-tight mb-3", isDark ? "text-white" : "text-slate-900")}>{p.title}</h3>
                <p className={cn("text-sm leading-relaxed", isDark ? "text-slate-400" : "text-slate-600")}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-4">Flow</p>
            <h2 className={cn("text-4xl md:text-5xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-slate-900")}>
              How Claims Disappear
            </h2>
          </div>

          <div className="relative">
            <div className={cn("absolute left-8 top-0 bottom-0 w-px", isDark ? "bg-slate-800" : "bg-slate-200")} />
            <div className="space-y-10">
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 pl-20 relative"
                >
                  <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center">
                    <div className={cn("w-4 h-4 rounded-full border-2", isDark ? "bg-slate-950 border-cyan-500" : "bg-white border-cyan-400")} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-cyan-500 mb-2 tracking-widest">{step.n}</div>
                    <h3 className={cn("text-lg font-black uppercase tracking-tight mb-2", isDark ? "text-white" : "text-slate-900")}>{step.title}</h3>
                    <p className={cn("text-sm leading-relaxed max-w-lg", isDark ? "text-slate-400" : "text-slate-600")}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY RAINSURE */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "rounded-3xl p-10 md:p-16 border relative overflow-hidden",
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          )}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.5em] mb-4">Advantages</p>
                  <h2 className={cn("text-4xl md:text-5xl font-black uppercase tracking-tight mb-6", isDark ? "text-white" : "text-slate-900")}>
                    Built for the<br />
                    <span className="text-cyan-400">Real World.</span>
                  </h2>
                  <p className={cn("text-sm leading-relaxed", isDark ? "text-slate-400" : "text-slate-600")}>
                    1.5 billion smallholder farmers have zero access to financial protection against climate volatility. RainSure removes every barrier—no banks, no paperwork, no middlemen.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: Zap, label: "Sub-second payouts", desc: "No manual adjustment. Trigger fires, settlement executes." },
                    { icon: ShieldCheck, label: "Cryptographic integrity", desc: "Every oracle reading, every policy, every payout on-chain." },
                    { icon: Users, label: "Open contributor model", desc: "Protocol governed by its community. Hundreds of contributors." },
                    { icon: Lock, label: "Non-custodial", desc: "Your policy, your keys. RainSure never holds your funds." },
                  ].map(f => (
                    <div key={f.label} className={cn(
                      "flex gap-4 p-4 rounded-xl border transition-all",
                      isDark ? "bg-slate-800/60 border-slate-700 hover:border-cyan-500/30" : "bg-slate-50 border-slate-200"
                    )}>
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                        <f.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className={cn("font-bold text-sm", isDark ? "text-white" : "text-slate-900")}>{f.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className={cn("text-5xl md:text-7xl font-black uppercase tracking-tight mb-6", isDark ? "text-white" : "text-slate-900")}>
            Protect the<br />
            <span className="text-cyan-400">Fields.</span>
          </h2>
          <p className={cn("text-lg mb-10", isDark ? "text-slate-400" : "text-slate-600")}>
            Join hundreds of contributors building the infrastructure that will protect billions from climate risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={btn("primary", "lg", "shadow-xl shadow-cyan-500/20")} onClick={() => setWalletOpen(true)}>
              <Wallet className="w-4 h-4" /> Launch Protocol
            </button>
            <a href="https://github.com/CoolFutures/RainSure" target="_blank" rel="noopener noreferrer"
              className={btn("glass", "lg")}>
              <GitBranch className="w-4 h-4" /> Contribute on GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className={cn("border-t px-6 py-12", isDark ? "border-slate-800" : "border-slate-200")}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500 flex items-center justify-center">
              <CloudRain className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <span className={cn("font-black text-base uppercase tracking-tight", isDark ? "text-white" : "text-slate-900")}>RainSure</span>
              <span className={cn("text-[10px] block uppercase tracking-widest", isDark ? "text-slate-600" : "text-slate-500")}>Parametric Climate Protocol</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {["GitHub", "Twitter", "Discord", "Docs"].map(l => (
              <a key={l} href="#" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">© 2026 CoolFutures · MIT License</p>
        </div>
      </footer>
    </div>
  );
}
