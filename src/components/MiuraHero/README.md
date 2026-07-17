# MiuraHero Component

A foldable, 3D interface hero driven by a single `foldProgress` prop (0–1).

## Implementations

| File | Purpose |
|------|---------|
| `MiuraHeroThree.jsx` | Primary Three.js implementation (Chromatic target) |
| `MiuraHeroThreeWrapper.jsx` | Scroll-driven wrapper for app use |
| `MiuraHeroSplineWrapper.jsx` | Spline 3D embed wrapper |
| `MiuraHeroThree.stories.jsx` | Storybook stories (Three.js) |
| `MiuraHeroSpline.stories.jsx` | Storybook stories (Spline) |

## foldProgress States

| Value | State | Figma Frame | Storybook Story |
|-------|-------|-------------|------------------|
| 0 | First Crease | `Hero / Frame1_FirstCrease` | `Frame1_FirstCrease` |
| 0.25 | Hinge Initiation | `Hero / Frame2_HingeInitiation` | `Frame2_HingeInitiation` |
| 0.5 | Midfield Zigzag | `Hero / Frame3_MidfieldZigzag` | `Frame3_MidfieldZigzag` |
| 1 | Full Deployment | `Hero / Frame4_FullDeployment` | `Frame4_FullDeployment` |

## Object Names (consistent across Figma, Spline, Three.js)

- `Bands_Group` / `Band_0`, `Band_1`, `Band_2`
- `Rosette_Group` / `Rosette_Center`, `Rosette_Petals`, `Rosette_CutLine`
- `CTA_Button`

## Usage

```jsx
// Scroll-driven (app)
import MiuraHeroThreeWrapper from './MiuraHeroThreeWrapper';
<MiuraHeroThreeWrapper onOpen={() => console.log('Hero opened')} />

// Manual foldProgress (Storybook / testing)
import MiuraHeroThree from './MiuraHeroThree';
<MiuraHeroThree foldProgress={0.5} />
```

## QA

See the full runbook: [`docs/hero-miura-qa-runbook.md`](../../docs/hero-miura-qa-runbook.md)
