# Soroban Dependency Update — #268

**Author:** Freya Hansen
**Date:** 2026-05-15
**Type:** Maintenance

## Summary

Routine update of Soroban SDK and related workspace dependencies.
All three RainSure contracts (policy-factory, risk-pool, payout-engine)
tested against the new SDK version on Soroban testnet before merge.

## Changes

### Cargo.toml (workspace root)

```toml
[workspace.dependencies]
# Before
soroban-sdk = { version = "22.0.9" }

# After
soroban-sdk = { version = "22.0.11" }
```

### What Changed in 22.0.11

- **Bug fix**: `env.storage().persistent().get()` now correctly returns
  `None` for TTL-expired entries instead of panicking. Previously a
  contract calling `get()` on an expired entry would panic with an
  opaque `WasmVm` error that was difficult to debug.

- **Performance**: Cross-contract call overhead reduced by ~8% through
  improved argument serialization in the guest environment.

- **New utility**: `Address::from_str()` added for easier test setup
  without needing `testutils::Address::generate()`.

## Testing

All three contracts rebuilt against 22.0.11 and deployed to testnet:

```bash
stellar contract build --package policy-factory   # ✅ clean
stellar contract build --package risk-pool        # ✅ clean
stellar contract build --package payout-engine    # ✅ clean
cargo test --workspace                            # ✅ all passing
```

## Compatibility

No breaking API changes in this update. Existing deployed testnet contract
addresses remain valid — this update only affects the build toolchain,
not the deployed WASM bytecode.

## Cargo.lock

`Cargo.lock` updated with new checksums for:
- `soroban-sdk 22.0.11`
- `soroban-sdk-macros 22.0.11`
- `soroban-env-common 22.1.3`
- `soroban-env-guest 22.1.3`
