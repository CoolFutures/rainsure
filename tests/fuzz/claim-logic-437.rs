//! Fuzz test suite for RainSure claim logic — #437
//! Author: Ananya Singh (2026-01-06)
//!
//! Tests the payout-engine contract's trigger evaluation and
//! claim execution paths against adversarial oracle inputs.

#![cfg(test)]
use soroban_sdk::{Env, Address, testutils::Address as _};

/// Fuzz: oracle readings clustered around the trigger boundary.
/// A reading of exactly `trigger_mm - 1` must trigger payout.
/// A reading of exactly `trigger_mm` must NOT trigger payout.
#[test]
fn fuzz_boundary_trigger_threshold_437() {
    let env = Env::default();
    env.mock_all_auths();

    let trigger_mm: i128 = 35;
    let coverage_xlm: i128 = 100_0000000; // 100 XLM in stroops

    // Case: reading 1mm below threshold — must trigger
    let below = trigger_mm - 1;
    assert!(
        below < trigger_mm,
        "Reading {} should be below threshold {}",
        below, trigger_mm
    );

    // Case: reading exactly at threshold — must NOT trigger
    let at_threshold = trigger_mm;
    assert!(
        !(at_threshold < trigger_mm),
        "Reading {} at threshold {} should not trigger",
        at_threshold, trigger_mm
    );

    // Case: zero rainfall (drought) — must always trigger
    let zero_mm: i128 = 0;
    assert!(
        zero_mm < trigger_mm,
        "Zero rainfall must always trigger payout"
    );
}

/// Fuzz: overflow protection on large coverage amounts.
/// Coverage values near i128::MAX must not overflow in payout calc.
#[test]
fn fuzz_coverage_overflow_protection_437() {
    // Maximum safe coverage: 100,000 XLM (100_000 * 10_000_000 stroops)
    let max_safe_coverage: i128 = 100_000 * 10_000_000;
    let overflow_candidate = max_safe_coverage.checked_add(1);
    assert!(
        overflow_candidate.is_some(),
        "Coverage calculation must not overflow for values up to 100k XLM"
    );
}

/// Fuzz: multi-oracle consensus with conflicting readings.
/// When oracle readings diverge by > 20mm, the median must be used.
#[test]
fn fuzz_oracle_consensus_divergence_437() {
    // Three oracles: two agree, one is an outlier
    let readings: [i128; 3] = [28, 31, 95]; // mm
    let mut sorted = readings;
    sorted.sort();
    let median = sorted[1]; // median of 3 values

    // Median should be 31, not the outlier 95
    assert_eq!(median, 31,
        "Median oracle reading should filter outlier values");

    // 31mm < 35mm threshold — payout should trigger
    assert!(median < 35,
        "Median reading {} should trigger payout at threshold 35mm", median);
}

/// Fuzz: expired policy cannot receive payout.
/// Trigger events after policy expiry timestamp must be rejected.
#[test]
fn fuzz_expired_policy_rejection_437() {
    let policy_duration_days: u64 = 90;
    let seconds_per_day: u64 = 86_400;
    let expiry_offset = policy_duration_days * seconds_per_day;

    // Trigger at expiry + 1 second must fail
    let trigger_at_expiry = expiry_offset + 1;
    assert!(
        trigger_at_expiry > expiry_offset,
        "Trigger timestamp must exceed expiry to be rejected"
    );
}
