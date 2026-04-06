# Rainsure Architecture

## Overview
Three-layer architecture: Smart Contracts (Soroban) → Backend API (Fastify) → Frontend (Next.js).

## Contracts
- `policy-factory` — primary registry and state
- `risk-pool` — pooled resources management
- `payout-engine` — execution and settlement

## Data Flow
```
User → Frontend (Next.js) → Backend (Fastify) → Soroban RPC → Stellar Network
```
