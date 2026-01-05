# RainSure — Parametric Climate Insurance Protocol

> Autonomous. Trustless. Instant settlement on Stellar Soroban.

RainSure is a decentralized parametric weather insurance protocol that delivers financial protection to farmers, cooperatives, and agricultural enterprises without claims, adjusters, or delays. When a verified weather oracle reports that rainfall fell below a defined threshold for a consecutive number of days, the smart contract executes an immediate payout—automatically and verifiably on-chain.

**No claims process. No manual review. No bias.**

---

## Why This Exists

Over 1.5 billion smallholder farmers have no access to climate risk protection. Traditional crop insurance is gatekept by bureaucratic claims processes, manual loss adjustment, and high administrative overhead that makes premiums unaffordable at the scale of small farms. Climate volatility is accelerating; the cost of inaction is a humanitarian crisis.

RainSure removes every barrier: a farmer in Kenya or a cooperative in Bangladesh can be covered, verified, and paid out in under a second—with full on-chain proof of every transaction.

---

## Protocol Architecture

The protocol is composed of three independent Soroban modules that work in concert.

### Policy Engine · `contracts/policy-engine`

Manages the full lifecycle of a parametric insurance policy.

- **Dynamic Pricing** — Premiums are calculated from historical weather risk data and pool liquidity depth, producing actuarially sound rates without a centralized underwriter.
- **Lifecycle Automation** — Handles policy issuance, activation, trigger monitoring, and automated expiry. No human touchpoints in the happy path.
- **Trigger Parameters** — Each policy encodes its own trigger conditions: rainfall threshold (mm), consecutive days, geographic bounding box, and payout denominator.

### Weather Oracle · `contracts/weather-oracle`

A secure, resilient interface for verified climate data ingestion.

- **Multi-Source Aggregation** — Combines data from multiple independent weather stations and satellite feeds. A single compromised node cannot manipulate trigger outcomes.
- **Cryptographic Proofs** — Every data submission carries a cryptographic attestation of the originating sensor and transmission chain.
- **Heartbeat Monitoring** — Continuously checks oracle liveness; stale data triggers an automatic circuit breaker on dependent policies.

### Risk Pool · `contracts/risk-pool`

Decentralized liquidity management for underwriters and yield-seeking capital.

- **Regional Segmentation** — Liquidity providers stake into specific geographic risk pools, enabling granular risk pricing.
- **Premium Yield** — Capital providers earn a continuous yield stream from policy premiums proportional to their pool share.
- **Instant Payout Reserve** — The contract maintains sufficient liquidity to honor any triggered payout immediately, enforced by on-chain solvency checks.

---

## Repository Layout

```
.
├── apps/
│   ├── backend/        # Oracle heartbeat service and weather data aggregator
│   └── web/            # Next.js 14 farmer dashboard and LP portal
├── contracts/
│   ├── policy-engine/  # Actuarial and lifecycle logic (Rust/Soroban)
│   ├── weather-oracle/ # Secure climate data gateway (Rust/Soroban)
│   └── risk-pool/      # Liquidity and payout management (Rust/Soroban)
├── docs/               # Architecture diagrams, specification, audits
└── scripts/            # Deployment, testing, and oracle simulation
```

---

## Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Rust | 1.78+ |
| Soroban CLI | 20+ |
| Node.js | 20+ |
| pnpm | 9+ |

### Build Smart Contracts

```bash
# Compile all contracts to WASM
cargo build --target wasm32-unknown-unknown --release
```

### Run Test Suite

```bash
# Unit and integration tests across all contracts
cargo test --workspace

# Run simulation scenarios (drought trigger, multi-policy, pool stress)
cargo test --workspace -- --include-ignored
```

### Launch Web Dashboard

```bash
cd apps/web
pnpm install
pnpm dev
# Opens at http://localhost:3000
```

### Deploy to Soroban Mainnet

```bash
cd scripts
./deploy.sh --network mainnet --contract policy-engine
./deploy.sh --network mainnet --contract weather-oracle
./deploy.sh --network mainnet --contract risk-pool
```

---

## How a Policy Works

1. **Issuance** — A policy holder purchases coverage. Trigger parameters (threshold, duration, location) and payout amount are encoded immutably in the Policy Engine contract.
2. **Monitoring** — The Oracle Adapter ingests weather telemetry in real time. Multi-node consensus prevents single points of failure.
3. **Trigger** — If conditions are met (e.g., rainfall < 20mm for 14 consecutive days), the oracle posts a verified trigger attestation.
4. **Settlement** — The Policy Engine validates the attestation, confirms pool solvency, and executes a Stellar payment to the policyholder. Time from trigger to payout: <1 second.

---

## Strategic Advantages

| Property | Detail |
|----------|--------|
| **Speed** | Sub-second settlement vs. months for traditional insurance |
| **Cost** | Removal of manual adjustment cuts overhead by ~70% |
| **Access** | Mobile-first; any Stellar wallet is sufficient |
| **Transparency** | Every policy, trigger, and payout is publicly verifiable on Stellar |
| **Integrity** | Cryptographic oracle proofs eliminate data manipulation |

---

## Contributing

RainSure is open-source and actively welcomes contributors. See [CONTRIBUTING.md](CONTRIBUTING.md) for our development workflow, code standards, and how to claim bounties for open issues.

Priority contribution areas:
- Additional oracle data source adapters
- New agricultural crop models for premium pricing
- Mobile-optimized farmer dashboard (PWA)
- Multi-language localization

---

## Security

Found a vulnerability? Please review our responsible disclosure process in [SECURITY.md](SECURITY.md). We take all reports seriously and will respond within 48 hours.

---

## License

MIT — free to use, fork, and build upon. Attribution appreciated.

---

*Building global resilience against climate volatility.*
