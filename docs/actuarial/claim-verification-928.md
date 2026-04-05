# Claim Verification Mathematics — Refactor #928

**Author:** Kunle Badmus
**Date:** 2026-04-05
**Type:** Refactor / Actuarial

## Overview

This refactor corrects the actuarial math in the parametric trigger
verification pipeline. The original implementation used floating-point
arithmetic for rainfall comparisons, which is non-deterministic across
different hardware and OS configurations. Soroban contracts must be
deterministic — the same inputs must always produce the same outputs
on every validator node.

## Problem: Non-Deterministic Float Comparison

```rust
// BEFORE (buggy): f64 comparison — non-deterministic!
pub fn check_trigger(reading_mm: f64, threshold_mm: f64) -> bool {
    reading_mm < threshold_mm
}
```

On x86 with extended precision FPU, `28.99999999 < 29.0` may evaluate
differently than on ARM64 with strict IEEE 754. This caused intermittent
consensus failures on the testnet oracle network.

## Fix: Integer Arithmetic with Fixed Precision

All rainfall values are now stored and compared as integers representing
**tenths of a millimeter** (0.1mm precision):

```rust
// AFTER: integer comparison — deterministic
pub fn check_trigger(reading_dmm: i128, threshold_dmm: i128) -> bool {
    // reading_dmm and threshold_dmm are in decimilimeters (1 unit = 0.1mm)
    // 35mm threshold = 350 decimilimeters
    reading_dmm < threshold_dmm
}
```

## Conversion Functions

```rust
/// Convert millimeters (f64) to decimilimeters (i128) for on-chain storage
pub fn mm_to_dmm(mm: f64) -> i128 {
    (mm * 10.0).round() as i128
}

/// Convert decimilimeters (i128) back to millimeters for display
pub fn dmm_to_mm(dmm: i128) -> f64 {
    dmm as f64 / 10.0
}
```

## Precision Analysis

0.1mm precision is sufficient for parametric insurance triggers because:
1. Weather station sensors have ±0.2mm measurement error anyway
2. Policy triggers are typically round numbers (30mm, 35mm, 50mm)
3. The relevant question is "did it rain enough?" not exact measurement

## Migration

All existing test policies on testnet use threshold values that convert
cleanly to decimilimeters (no fractional 0.1mm components). No migration
is needed for the testnet deployment.

## Testing

- `test_trigger_boundary_precision` — verifies 34.9mm triggers, 35.0mm doesn't
- `test_zero_rainfall_always_triggers` — edge case
- `test_large_rainfall_never_triggers` — reverse edge case (flood scenario)
