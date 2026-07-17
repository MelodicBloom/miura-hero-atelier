# Chromatic Setup

## Add the Secret

1. Go to your Chromatic project dashboard and copy your project token.
2. In GitHub: **Settings → Secrets and variables → Actions → New repository secret**.
3. Name: `CHROMATIC_PROJECT_TOKEN`
4. Value: your Chromatic project token.

## Auto-Approval Rules

| Trigger | Auto-approve? | Workflow |
|---------|--------------|----------|
| Push to `main` | Yes | `chromatic.yml` (`autoAcceptChanges: true` on main) |
| PR touching `src/` | No – requires review | `chromatic.yml` |
| PR touching only `docs/`, `*.md`, `.storybook/`, `.chromatic/` | Yes | `chromatic-auto-approve.yml` |

## What Gets Snapshotted

All four Miura Hero states at four viewports (320, 768, 1280, 1920):

- `Atelier/Hero/MiuraHeroThree/Frame1_FirstCrease`
- `Atelier/Hero/MiuraHeroThree/Frame2_HingeInitiation`
- `Atelier/Hero/MiuraHeroThree/Frame3_MidfieldZigzag`
- `Atelier/Hero/MiuraHeroThree/Frame4_FullDeployment`

## Reviewing Changes

When Chromatic flags a visual change on a PR:

1. Open the **Build URL** from the workflow output.
2. Identify which object changed (`Band_1`, `Rosette_CutLine`, `CTA_Button`, etc.).
3. Compare with the Figma frame for that state.
4. Approve if intentional; request changes if it’s a regression.

See the full runbook: [`docs/hero-miura-qa-runbook.md`](../docs/hero-miura-qa-runbook.md)
