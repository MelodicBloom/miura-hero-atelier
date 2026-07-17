# Miura Hero QA Runbook (Three.js + Spline + Figma + Chromatic)

This runbook defines how the 3D Miura-ori Hero is specified, implemented, and tested across design and engineering tools.

**Owner:** Frontend / Design Systems  
**Last updated:** 2026-07-17

---

## Overview

The Miura Hero is a foldable, 3D interface that transitions from a flat sheet to a fully deployed origami-like structure. Its behavior is controlled by a single parameter:

- `foldProgress` ∈ [0, 1]

This parameter drives:

- Band rotation and depth (Miura zigzag)
- Rosette extrusion and cut-line visibility
- CTA glow and lift

The same `foldProgress` semantics are used in:

- **Figma**: 2D design frames
- **Spline**: 3D scene variable
- **Three.js**: React component prop
- **Chromatic**: Visual regression baselines

A visual overview of the pipeline is available in the Figma file:

- **Figma page:** `00_Pipeline / Miura Hero QA`
- **Frame:** `Miura_Hero_QA_Pipeline`

---

## Canonical Sources of Truth

### 3D Behavior

- **Three.js**
  - Component: `MiuraHeroThree`
  - Prop: `foldProgress`
  - Location: `src/components/MiuraHero/MiuraHeroThree.jsx`
- **Spline**
  - File: `Atelier_Hero_Miura3D.spline`
  - Scene variable: `foldProgress`

### Design Spec (2D)

- **Figma**
  - Page: `Atelier / Hero – Miura 3D`
  - Frames:
    - `Hero / Frame1_FirstCrease` → `foldProgress = 0`
    - `Hero / Frame2_HingeInitiation` → `foldProgress = 0.25`
    - `Hero / Frame3_MidfieldZigzag` → `foldProgress = 0.5`
    - `Hero / Frame4_FullDeployment` → `foldProgress = 1`

### Visual Contract (QA)

- **Storybook**
  - `Atelier/Hero/MiuraHeroThree/Frame1_FirstCrease`
  - `Atelier/Hero/MiuraHeroThree/Frame2_HingeInitiation`
  - `Atelier/Hero/MiuraHeroThree/Frame3_MidfieldZigzag`
  - `Atelier/Hero/MiuraHeroThree/Frame4_FullDeployment`
- **Chromatic**
  - Config: `.chromatic/config.json`
  - These snapshots are the authoritative visual regression baselines.

---

## Tool Roles

| Tool | Role |
|------|------|
| Figma | 2D design spec per `foldProgress` state |
| Spline | Interactive 3D scene for design exploration |
| Three.js | Primary production implementation |
| Chromatic | Visual regression contract, guarded per story |

---

## Workflow: Making a Fold-Related Change

### 1. Propose in Figma
1. Open `Atelier / Hero – Miura 3D`.
2. Adjust the relevant frame(s).
3. Keep layer names consistent (`Band_0`, `Rosette_CutLine`, etc.).
4. Note which frame(s) changed and what changed in the design ticket.

### 2. Update Three.js
1. Open `src/components/MiuraHero/MiuraHeroThree.jsx`.
2. Adjust `baseAngles`, `depthSteps`, or glow curves in `MiuraScene`.
3. Run Storybook locally and confirm visual matches the updated Figma frames.

### 3. Update Spline
1. Open `Atelier_Hero_Miura3D.spline`.
2. Update `foldProgress` interpolation targets to match new angles/depths.
3. Confirm at `foldProgress` = 0, 0.25, 0.5, 1 that the scene matches Figma and Three.js.

### 4. Run Chromatic
```bash
npx chromatic --project-token=YOUR_TOKEN
```
Review and approve snapshots for Frame1–4. Reject and fix if they deviate from Figma.

---

## QA Checklist

- [ ] Figma frames `Frame1–4` updated (if design changed)
- [ ] Three.js `MiuraScene` parameters updated to match Figma
- [ ] Spline `foldProgress` interpolations updated to match Figma/Three.js
- [ ] Storybook stories render correctly at `foldProgress` = 0, 0.25, 0.5, 1
- [ ] Chromatic snapshots reviewed and approved for all four stories
- [ ] Layer/object names remain consistent across Figma, Spline, and Three.js

---

## Naming Conventions

**Objects (all tools):**
- `Bands_Group / Band_0, Band_1, Band_2`
- `Rosette_Group / Rosette_Center, Rosette_Petals, Rosette_CutLine`
- `CTA_Button`

**States:**
- Figma: `Hero / Frame1_FirstCrease` … `Frame4_FullDeployment`
- Storybook: `Atelier/Hero/MiuraHeroThree/Frame1_FirstCrease` … `Frame4_FullDeployment`
- Spline: conceptual, defined by `foldProgress` = 0, 0.25, 0.5, 1

---

## Files & Locations

```
src/components/MiuraHero/
  MiuraHeroThree.jsx
  MiuraHeroThreeWrapper.jsx
  MiuraHeroSplineWrapper.jsx
  MiuraHeroThree.stories.jsx
  MiuraHeroSpline.stories.jsx
  README.md
docs/
  hero-miura-qa-runbook.md
public/textures/
  bg-tessellation.png        ← add manually
.chromatic/
  config.json
.storybook/
  main.js
  preview.js
```

---

## Troubleshooting

**Chromatic shows unexpected changes in one frame only**
- Identify which object changed (`Band_1`, `Rosette_CutLine`, etc.).
- Verify whether Figma was updated for that frame.
- Confirm Spline and Three.js both reflect the intended behavior.

**Spline and Three.js look different at the same `foldProgress`**
- Compare `baseAngles`/`depthSteps` in Three.js with Spline interpolation targets.
- Align to the same numeric values; update Figma if the design intent changed.

**Figma frames drift from implementation**
- Use Storybook screenshots at `foldProgress` = 0, 0.25, 0.5, 1 as reference to update Figma.
