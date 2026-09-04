# 상세페이지 제작 대시보드 — Design System Contract

## 0. Research Log
- **Live reference:** `https://hermes-work-dashboard.pages.dev` source files (`index.html`, `styles.css`, `app.js`) inspected 2026-09-04. Retained its compact left rail, 48px sticky header, rounded white work surface, five-column metric row, restrained gray hierarchy, and violet focus/accent logic.
- **Workflow reference:** `/opt/data/tumbler-detail/product-detail-workflow-v3.html` inspected. Reframed its product capture → selling strategy → fact gate → nine detail cuts → preview/approval sequence into an operational queue rather than copying its visual design.
- **Local design data:** skipped because the `omh` executable is not installed on this VPS. Existing dashboard tokens are the authoritative visual reference.

## 1. Atmosphere & Identity
- **Audience:** Korean commerce operators turning supplier product inputs into reviewed Smartstore detail-page assets.
- **Direction:** **Operational** — compact, trustworthy, and production-oriented; no marketing-style hero treatment.
- **Identity:** A production desk for a single repeatable pipeline: source capture, facts gate, 9-cut generation, and final review.
- **Signature element:** A stage rail in the selected-work panel that shows exactly where a product sits in the 5-step detail-page pipeline.

## 2. Color
| Token | Value | Role |
|---|---|---|
| `--bg` | `#ffffff` | Main surface |
| `--rail` | `#fafafa` | Sidebar surround |
| `--ink` | `#3a3a3a` | Primary text |
| `--muted` | `#71717a` | Supporting text |
| `--line` | `#e9e9ec` | Borders and dividers |
| `--accent` | `#7565d9` | Active navigation, focus, primary actions |
| `--accent-soft` | `#f0eeff` | Selected and informational fill |
| `--success` | `#16805d` | Complete / ready |
| `--warning` | `#a5651d` | Review required |
| `--danger` | `#c2414a` | Blocked / error |

Proportion: neutral surfaces lead; semantic color appears only on states, stage progress, and primary action. All body text meets an AA-oriented contrast target against its immediate surface.

## 3. Typography
- Primary: `Inter, ui-sans-serif, system-ui, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`.
- Scale: 12px metadata, 14px Korean body floor, 16px navigation/header, 20px section lead, 28px numeric metric.
- Weights: 400 supporting copy, 500 controls, 600 task/product names, 700 numeric metrics.
- Korean: `word-break: keep-all` for labels; `overflow-wrap: anywhere` only for URLs or IDs; body line-height 1.55 minimum.

## 4. Spacing & Layout
- Base unit: 4px. Spacing scale: 4/8/12/16/20/24/32px.
- Desktop: fixed 240px rail; content has a 48px sticky header and 24px page padding.
- Main sections: five metrics, queue table, selected-work panel plus 9-cut grid, and recent activity.
- Tablet: metrics collapse to three columns; selected-work panel becomes one column.
- Mobile: hidden off-canvas rail, one/two-column metrics, horizontally scrollable table, touch targets at least 32px.

## 5. Components
- **Sidebar/nav:** default transparent; active/hover `--accent-soft`; focus-visible violet ring.
- **Buttons:** primary violet; outline neutral; all have hover, pressed, disabled, and focus-visible states.
- **Metric card:** white, 1px line, 16px radius, no heavy shadow.
- **Status chip:** semantic fill and dot; includes running, review, queued, ready, blocked.
- **Queue row:** hover wash; selection checkbox; no result shows an explicit empty message.
- **Workflow stage:** complete, active, waiting, blocked states with a status chip and progress line.
- **Cut tile:** ready, generating, pending; click opens a text preview toast. It never claims an image was generated.

## 6. Motion & Interaction
- 160ms `ease-out` for color, surface, and sidebar changes.
- Progress animation is limited to the running stage. `prefers-reduced-motion` disables transitions and animation.
- Filters update queue immediately; selecting one product updates the work panel; “생성 시작” advances only the demo data and records a visible activity item.

## 7. Depth & Surface
- Flat white work surface on a near-white rail. Cards use 1px borders and only a subtle `0 1px 2px rgba(0,0,0,.04)` depth cue.
- Radius: 12px cards, 8px inputs/buttons, pill radius only for status chips.

## 8. Accessibility Constraints & Accepted Debt
- Keyboard-operable filters, selection controls, theme toggle, mobile navigation, and demo action.
- Semantic table markup, labelled controls, live toast region, and visible focus treatment are required.
- This first release uses representative data and simulated generation only; Taobao collection, GPT image generation, Smartstore upload, authentication, and persistence are explicitly not connected.
