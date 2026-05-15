"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  CloudRain, Moon, Sun, Wallet, X, ChevronRight, AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    } catch (err: unknown) {
      setError((err as Error).message || "Connection failed.");
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
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-sm",
    xl: "px-12 py-5 text-base",
    icon: "p-2.5 w-10 h-10",
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
  isOpen: boolean;
  onClose: () => void;
  wallet: ReturnType<typeof useWallet>;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
        />
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
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
            >
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
              <button
                className={btn("danger", "md", "w-full")}
                onClick={() => { wallet.disconnect(); onClose(); }}
              >
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

const NAV_LINKS = [
  { label: "Protocol", href: "/" },
  { label: "Policies", href: "/policies" },
  { label: "Pools", href: "/pools" },
  { label: "Triggers", href: "/triggers" },
  { label: "Partners", href: "/partners" },
  { label: "Roadmap", href: "/roadmap" },
];

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const [walletOpen, setWalletOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wallet = useWallet();
  const { theme } = useTheme();
  const pathname = usePathname();

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
        <div className={cn("absolute inset-0", isDark ? "bg-slate-950" : "bg-slate-50")} />
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
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <CloudRain className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className={cn("font-black text-lg uppercase tracking-tight leading-none block", isDark ? "text-white" : "text-slate-900")}>RainSure</span>
              <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.4em]">Soroban · Mainnet</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-cyan-400",
                    isActive ? "text-cyan-400" : isDark ? "text-slate-500" : "text-slate-500"
                  )}
                >
                  {label}
                </Link>
              );
            })}
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

      {/* PAGE CONTENT */}
      <main className="pt-28">
        {children}
      </main>

      {/* FOOTER */}
      <footer className={cn("border-t px-6 py-12 mt-24", isDark ? "border-slate-800" : "border-slate-200")}>
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
