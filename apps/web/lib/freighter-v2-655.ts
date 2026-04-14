/**
 * Freighter Wallet v2 Integration — #655
 * Author: Kunle Badmus (2026-04-14)
 *
 * Wraps the Freighter browser extension API for RainSure transactions.
 * Handles network validation, signing, and submission to Soroban testnet.
 */

export const TESTNET_PASSPHRASE =
  "Test SDF Network ; September 2015";

export const MAINNET_PASSPHRASE =
  "Public Global Stellar Network ; September 2015";

export type NetworkType = "testnet" | "mainnet";

export interface FreighterState {
  address: string | null;
  network: NetworkType | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export interface SignedTransaction {
  signedXDR: string;
  network: string;
  networkPassphrase: string;
}

/**
 * Detect whether Freighter extension is installed.
 * Returns false in SSR context (window is undefined).
 */
export function isFreighterInstalled(): boolean {
  if (typeof window === "undefined") return false;
  return typeof (window as any).freighter !== "undefined";
}

/**
 * Connect to Freighter and validate the user is on the correct network.
 * Throws if Freighter is not installed or network does not match.
 */
export async function connectFreighter(
  expectedNetwork: NetworkType = "testnet"
): Promise<{ address: string; network: string }> {
  if (!isFreighterInstalled()) {
    throw new Error(
      "Freighter not found. Install from https://freighter.app to continue."
    );
  }

  const freighter = (window as any).freighter;

  const result = await freighter.requestAccess();
  if ("error" in result) {
    throw new Error(`Freighter access denied: ${result.error}`);
  }

  const net = await freighter.getNetwork();
  if ("error" in net) {
    throw new Error(`Network check failed: ${net.error}`);
  }

  const expectedPassphrase =
    expectedNetwork === "mainnet" ? MAINNET_PASSPHRASE : TESTNET_PASSPHRASE;

  if (net.networkPassphrase !== expectedPassphrase) {
    throw new Error(
      `Wrong network. Expected ${expectedNetwork} — ` +
      `switch in Freighter settings and reconnect.`
    );
  }

  return { address: result.address, network: net.network };
}

/**
 * Sign a Stellar XDR transaction envelope using Freighter.
 * Returns the signed XDR ready for submission to Soroban RPC.
 */
export async function signTransaction(
  xdr: string,
  networkPassphrase: string
): Promise<string> {
  if (!isFreighterInstalled()) {
    throw new Error("Freighter not installed");
  }

  const freighter = (window as any).freighter;
  const result = await freighter.signTransaction(xdr, {
    networkPassphrase,
  });

  if ("error" in result) {
    throw new Error(`Transaction signing failed: ${result.error}`);
  }

  return result.signedTxXdr;
}

/**
 * Format a Stellar address for display (first 4 + last 4 chars).
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
