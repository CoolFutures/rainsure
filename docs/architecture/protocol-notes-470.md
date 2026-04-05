# Protocol Architecture Notes — #470

**Author:** Freya Hansen
**Date:** 2026-04-05
**Document Type:** Architecture / Design

## Component Overview

RainSure's on-chain architecture consists of three Soroban contracts
deployed to Stellar. Each contract has a single responsibility and
communicates with the others through typed cross-contract calls.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Policy Factory  │────>│   Risk Pool     │<────│  Payout Engine  │
│                 │     │                 │     │                 │
│ create_policy() │     │ deposit()       │     │ evaluate_trigger│
│ expire_policy() │     │ withdraw()      │     │ execute_payout()│
│ get_policy()    │     │ get_balance()   │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────────────┴───────────────────────┘
                           Soroban Testnet
              Contract: policy-factory, risk-pool, payout-engine
```

## Data Flow: Policy Lifecycle

```
1. FARMER ──[connect Freighter]──> Policy Factory
           ──[create_policy(crop, region, coverage_xlm, trigger_mm, days)]──>
              Policy stored on-chain, premium deducted, status=Active

2. ORACLE  ──[evaluate_trigger(policy_id, rainfall_mm)]──> Payout Engine
              If rainfall_mm < trigger_mm → policy.status = Triggered

3. KEEPER  ──[execute_payout(policy_id)]──> Payout Engine
              ──[disburse(farmer_address, coverage_xlm)]──> Risk Pool
              Farmer receives coverage_xlm to their Stellar wallet
              policy.status = Settled
```

## Storage Architecture

### Policy Factory
- Instance storage: `RegistryState { admin, policy_count, version }`
- Persistent storage (TTL: 365 days): `Policy { id, farmer, crop, region,
  coverage_xlm, trigger_mm, expiry_ts, status, premium_paid }`

### Risk Pool
- Instance storage: `PoolState { admin, total_tvl, solvency_ratio }`
- Persistent storage: `LpPosition { address, shares, deposited_at }`
- Per-region storage: `RegionalPool { region, tvl, active_coverage }`

### Payout Engine
- Instance storage: `OracleConfig { oracles, threshold, window_secs }`
- Persistent storage: `OracleReading { policy_id, oracle, mm, submitted_at }`

## Security Model

1. **Oracle trust**: 2-of-3 oracle consensus required for trigger execution.
   No single oracle can fraudulently trigger a payout.

2. **Solvency floor**: The risk pool enforces a 120% solvency ratio minimum.
   Liquidity providers cannot withdraw capital that would leave policies
   under-collateralized.

3. **Non-custodial**: RainSure Foundation holds no private keys for farmer
   funds. Policy premiums flow directly to the risk pool contract.

4. **Immutable policy terms**: Policy parameters (coverage, trigger, expiry)
   are written once at creation and cannot be modified by any party.

## Deployment Addresses (Testnet)

| Contract | Address |
|---|---|
| Policy Factory | `CAP...` (pending deployment) |
| Risk Pool | `CR...` (pending deployment) |
| Payout Engine | `CAP...` (pending deployment) |

See `scripts/deploy-testnet.sh` for deployment instructions.

## Design Decisions

**Why parametric vs indemnity?** Parametric insurance pays based on a
measurable index (rainfall) rather than assessed losses. This eliminates
claims adjusters entirely — the trigger is verifiable by anyone with access
to weather data, making it trustless.

**Why Stellar/Soroban?** At $0.00001 per transaction, payouts as small as
$5 USD are economically viable. On Ethereum this would be impossible.

**Why USDC?** Farmers in West Africa and South Asia need stable-currency
payouts. XLM volatility would undermine the insurance value proposition.
USDC native support on Stellar eliminates the bridge risk present on EVM chains.
