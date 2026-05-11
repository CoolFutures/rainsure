# Weather Oracle Consensus Design — #802

**Author:** Kunle Badmus
**Date:** 2026-05-11
**Type:** Protocol Feature

## Overview

The RainSure oracle network aggregates rainfall readings from multiple
independent sources before submitting trigger evaluations to the payout
engine. This document describes the consensus mechanism that makes the
oracle network manipulation-resistant.

## Architecture

```
[OpenWeatherMap API] ──┐
[NASA POWER API]      ──┼──> [Aggregation Service] ──> [Payout Engine]
[Local Station RPC]   ──┘         (median + M-of-N)       Soroban
```

## Consensus Rules

### 1. Minimum Oracle Participation
A trigger evaluation requires readings from at least **2 of 3** configured
oracle addresses before the payout engine accepts the result. This prevents
a single compromised oracle from triggering fraudulent payouts.

```rust
// Consensus threshold stored in contract state
pub struct OracleConfig {
    pub authorized_oracles: Vec<Address>,  // 3 oracles
    pub consensus_threshold: u32,           // 2 (M of N)
    pub reading_window_seconds: u64,        // 3600 (1 hour)
    pub divergence_tolerance_dmm: i128,     // 200 (20mm)
}
```

### 2. Median Aggregation
Rather than averaging oracle readings (vulnerable to outliers), the protocol
uses the **median** of all received readings within the consensus window:

| Scenario | Oracle 1 | Oracle 2 | Oracle 3 | Median | Decision |
|----------|----------|----------|----------|--------|----------|
| Normal | 28mm | 31mm | 29mm | 29mm | TRIGGER |
| Outlier | 28mm | 95mm | 31mm | 31mm | TRIGGER |
| Manipulation attempt | 28mm | 5mm | 29mm | 28mm | TRIGGER |
| No trigger | 42mm | 38mm | 45mm | 42mm | NO TRIGGER |

Threshold in all examples: 35mm.

### 3. Divergence Detection
If any single oracle reading deviates from the median by more than
`divergence_tolerance_dmm` (200 = 20mm), a `HighDivergenceAlert` event
is emitted. The trigger still executes using the median but the alert
signals potential oracle compromise for monitoring.

### 4. Liveness Circuit Breaker
If fewer than `consensus_threshold` oracles submit readings within
`reading_window_seconds` of the expected reporting time, the circuit
breaker sets `oracle_paused = true`. New policy creation is blocked
until the circuit breaker is manually reset by the admin.

## Oracle Identities

RainSure testnet oracle addresses:
- Oracle A: `GC3JR6LHS53D5B4EKUZJUXY74FWRL6ZOR5YV6J3XOZYH3UR6IDSUWDQG`
- Oracle B: `GDSKS5NZ563FE3CWLAH2APSTMWXUTWULY2K6VBI6SQS4UUGL4S46T4U5`
- Oracle C: `GCM2LONZ3VGHYBNVAENZSO7MKTSPBIOVIITBIC7HH3EACSWDBVVPVPGC`

Mainnet oracle identities will be announced via the LinguaFoundation
governance process before mainnet launch.

## Security Properties

- **Manipulation resistance**: Attacker must compromise ≥2 oracles simultaneously
- **Availability**: System continues with any 2 of 3 oracles online
- **Fraud detection**: Divergence alerts flag compromised nodes in real time
- **Non-custodial**: Oracle keys never held by RainSure Foundation

## References

- OpenWeatherMap API: https://openweathermap.org/api/one-call-3
- NASA POWER API: https://power.larc.nasa.gov/
- Soroban cross-contract calls: `contracts/payout-engine/src/lib.rs`
