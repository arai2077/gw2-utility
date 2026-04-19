# Design System Document: The Comy Guard

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Ledger"**

This design system moves away from the cluttered, "gamey" interfaces often associated with MMO tools. Instead, it adopts a **High-End Editorial** aesthetic that treats guild management like a prestigious digital chronicle. We are blending the legendary scale of *Guild Wars 2* with the sophisticated spaciousness of a luxury fashion lookbook.

The system breaks the "template" look through **intentional asymmetry**—offsetting headers to create a sense of movement—and **tonal depth**, where elements aren't just "placed" on a grid, but emerged from a deep, atmospheric void. We prioritize the "breathing room" of a gallery over the density of a spreadsheet.

---

## 2. Colors
Our palette is rooted in the deep shadows of Tyria, punctuated by the shimmer of legendary artifacts.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background color shifts. A `surface-container-low` module sitting on a `background` provides all the definition needed. If you feel the urge to draw a line, use whitespace instead.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of obsidian and smoke. Use the following hierarchy to create "nested" depth:
- **Base Layer:** `background` (#131313) for the main canvas.
- **Sectioning:** `surface-container-low` (#1c1b1b) for large content areas.
- **Active Modules:** `surface-container-high` (#2a2a2a) for interactive cards.
- **Floating Elements:** `surface-bright` (#3a3939) for modals or pop-overs.

### The "Glass & Gradient" Rule
To capture the magic of the Mists, use Glassmorphism for floating elements. Use semi-transparent surface colors (e.g., `surface-container` at 70% opacity) with a `backdrop-blur` of 12px–20px. 

**Signature Texture:** Primary CTAs should never be flat. Use a subtle linear gradient from `primary` (#f2ca50) to `primary-container` (#d4af37) at a 135-degree angle to provide a metallic, "gold-leaf" luster.

---

## 3. Typography
We utilize a high-contrast pairing that balances futuristic tech with humanistic readability.

*   **Display & Headlines (Space Grotesk):** This typeface provides the "Modern & Sleek" edge. Its idiosyncratic letterforms (like the 'g' and 'y') act as a signature visual element. Use `display-lg` for heroic guild stats and `headline-md` for section titles.
*   **Body & Labels (Manrope):** A highly legible geometric sans-serif that handles the heavy lifting of utility data. It feels premium and engineered.

**Hierarchy as Identity:** Use `letter-spacing: -0.02em` on headlines to create a tight, editorial feel, while keeping `body-md` at standard tracking to ensure readability during intense raid planning.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` (#0e0e0e) card on a `surface-container-low` background. This "inset" look creates a sophisticated, carved-out aesthetic.
*   **Ambient Shadows:** For "floating" components (Modals/Tooltips), use a shadow color derived from `on-surface` at 5% opacity, with a 32px blur and 16px Y-offset. It should feel like a soft glow, not a dark smudge.
*   **The "Ghost Border" Fallback:** If a container lacks contrast against its background, use a "Ghost Border": `outline-variant` (#4d4635) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary-container`. `Roundedness: md` (0.375rem). Text: `on-primary` (bold).
*   **Secondary:** Ghost style. Transparent background with a `Ghost Border`. Text: `secondary` (#a3c9ff).
*   **Tertiary:** `surface-container-highest` background. No border. Text: `on-surface`.

### Input Fields
*   **Style:** Minimalist. Use `surface-container-low` as the base fill. 
*   **Focus State:** Transition the background to `surface-container-high` and add a 1px `primary` bottom-border only. This mimics high-end stationery.

### Cards & Lists
*   **Strict Rule:** No divider lines. Separate list items using 8px–12px of vertical whitespace or a subtle shift to `surface-container-lowest` on hover.
*   **Guild Member Cards:** Use large `display-sm` numbers for rank or contribution stats to emphasize the "Editorial" scale.

### Guild-Specific Components
*   **Rarity Badges:** Use `secondary` (#a3c9ff) with 10% opacity fills for "Exotic" or "Ascended" utility tags, creating a soft blue bloom.
*   **Progress Bars:** Background: `surface-container-highest`. Fill: `primary` (#f2ca50). Add a slight outer glow (2px blur) to the fill to simulate magical energy.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., 120px left, 60px right) for hero sections to break the "Bootstrap" feel.
*   **Do** leverage `surface-tint` (#e9c349) for very subtle background glows behind important data visualizations.
*   **Do** allow 64px+ of whitespace between major functional sections.

### Don't
*   **Don't** use 100% white (#FFFFFF). Always use `on-surface` (#e5e2e1) to avoid harsh eye strain in dark environments.
*   **Don't** use standard "Material Design" shadows. They are too aggressive for this atmospheric system.
*   **Don't** use borders to separate navigation links. Use typography weight and `primary` color shifts for active states.