# Miura Hero Atelier

A Digital Cultural Origami Atelier – Three.js + Spline + Figma + Chromatic QA pipeline for the Miura-ori Hero component.

## What Is This?

This repo contains the implementation, design spec, and QA pipeline for the **Miura Hero**: a foldable, 3D interface hero screen inspired by Miura-ori origami, Islamic geometric patterns, and Japanese tessellation.

The hero transitions from a flat sheet to a fully deployed 3D structure, driven by a single prop: `foldProgress` (0–1).

## Stack

| Layer | Tool |
|-------|------|
| 3D (primary) | Three.js + React Three Fiber |
| 3D (exploration) | Spline |
| Design spec | Figma |
| Visual QA | Storybook + Chromatic |

## Key Files

```
src/components/MiuraHero/   # Component implementations and stories
docs/hero-miura-qa-runbook.md # Full QA runbook
.storybook/                 # Storybook config
.chromatic/config.json      # Chromatic config
public/textures/            # Add bg-tessellation.png here
```

## Quick Start

```bash
npm install
npm run storybook
```

## QA

```bash
npx chromatic --project-token=YOUR_TOKEN
```

See [`docs/hero-miura-qa-runbook.md`](docs/hero-miura-qa-runbook.md) for the full pipeline.

## foldProgress States

| Value | State | Figma Frame |
|-------|-------|-------------|
| 0 | First Crease | `Hero / Frame1_FirstCrease` |
| 0.25 | Hinge Initiation | `Hero / Frame2_HingeInitiation` |
| 0.5 | Midfield Zigzag | `Hero / Frame3_MidfieldZigzag` |
| 1 | Full Deployment | `Hero / Frame4_FullDeployment` |

## Naming Conventions

Object names are consistent across Figma, Spline, and Three.js:

- `Bands_Group` / `Band_0`, `Band_1`, `Band_2`
- `Rosette_Group` / `Rosette_Center`, `Rosette_Petals`, `Rosette_CutLine`
- `CTA_Button`
