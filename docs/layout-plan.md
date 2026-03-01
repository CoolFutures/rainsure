# Layout Plan

## Repository map
- `contracts/policy-factory`
- `contracts/risk-pool`
- `contracts/payout-engine`
- `apps/web`
- `docs`
- `configs`

## Product responsibilities
- Policy authoring by insurer partners
- Enrollment and premium collection
- Trigger-based payout execution
- Portfolio risk and solvency dashboard

## Runtime layout (monorepo)

| Path | Responsibility |
| --- | --- |
| `contracts/*` | Soroban smart contracts — source of truth for rules |
| `apps/web` | Next.js — marketing, dashboards, contributor UX |
| `apps/backend` | Fastify — integrations, optional server-side signing gateway |

See also `docs/SITE_MAP.md` for the web route backlog.
