# Gas Efficiency Optimization — Payout Engine #479

**Author:** Kunle Badmus
**Date:** 2026-04-14
**Type:** Performance Fix

## Problem

The `execute_payout` function in the payout-engine contract was making two
separate cross-contract calls to the risk-pool:

1. `risk_pool.get_pool_balance()` — read call to check solvency
2. `risk_pool.disburse(farmer, amount)` — write call to transfer funds

Each cross-contract call incurs a Soroban resource charge. On testnet this
is negligible, but at mainnet scale with hundreds of simultaneous payout
requests, this doubles the compute unit cost per payout.

## Solution

Consolidate the solvency check INTO the `disburse` function itself:

```rust
// BEFORE: two separate calls (expensive)
pub fn execute_payout(env: Env, policy_id: u64) {
    let balance = risk_pool_client.get_pool_balance();  // call 1
    assert!(balance >= coverage_amount, "Insufficient pool");
    risk_pool_client.disburse(&farmer, &coverage_amount); // call 2
}

// AFTER: single call with internal solvency guard (efficient)
pub fn execute_payout(env: Env, policy_id: u64) {
    // disburse() now checks solvency internally and panics if insufficient
    risk_pool_client.disburse_with_solvency_check(
        &farmer,
        &coverage_amount,
        &MIN_SOLVENCY_RATIO, // 120% floor
    ); // one call
}
```

## Benchmark Results (Soroban testnet)

| Method | CPU Instructions | Memory (bytes) | Fee (stroops) |
|--------|-----------------|----------------|---------------|
| Before (2 calls) | 4,821,003 | 28,400 | 18,240 |
| After (1 call) | 2,943,187 | 17,600 | 11,120 |
| **Savings** | **-39%** | **-38%** | **-39%** |

## Impact

For a parametric insurance protocol targeting smallholder farmers, keeping
transaction fees below 0.001 XLM per payout is critical for economic
viability. At sub-cent fees, the protocol works for policies as small as
$5 USD — the entry point for first-time crop insurance buyers in West Africa.

## Related Changes

- `contracts/payout-engine/src/lib.rs` — consolidated payout logic
- `contracts/risk-pool/src/lib.rs` — added `disburse_with_solvency_check`
- `tests/integration/payout_gas_test.rs` — benchmark test added

## References
- Soroban resource metering: https://docs.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol
- RainSure architecture: `docs/architecture.md`
