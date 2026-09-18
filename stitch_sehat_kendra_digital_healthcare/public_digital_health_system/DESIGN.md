---
name: Public Digital Health System
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#404751'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#707882'
  outline-variant: '#c0c7d2'
  surface-tint: '#00629f'
  primary: '#005991'
  on-primary: '#ffffff'
  primary-container: '#0072b8'
  on-primary-container: '#eaf2ff'
  inverse-primary: '#9bcbff'
  secondary: '#34656f'
  on-secondary: '#ffffff'
  secondary-container: '#b8ebf6'
  on-secondary-container: '#3a6b75'
  tertiary: '#18604d'
  on-tertiary: '#ffffff'
  tertiary-container: '#367964'
  on-tertiary-container: '#bbffe5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e4ff'
  primary-fixed-dim: '#9bcbff'
  on-primary-fixed: '#001d34'
  on-primary-fixed-variant: '#004a79'
  secondary-fixed: '#b8ebf6'
  secondary-fixed-dim: '#9dcfda'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#184d57'
  tertiary-fixed: '#acf1d7'
  tertiary-fixed-dim: '#90d4bc'
  on-tertiary-fixed: '#002118'
  on-tertiary-fixed-variant: '#00513f'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: 0em
  headline-md:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Inter, Noto Sans Devanagari, Noto Sans Bengali, sans-serif
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-mobile: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  max-content-width: 75rem
---

## Brand & Style

This design system establishes a high-reliability, citizen-centric digital health infrastructure engineered for universal public service delivery across India. The aesthetic blends civic reliability with clinical clarity, prioritizing accessibility, trust, and speed of interaction across varying literacy and technical capability levels.

### Design Movement & Ethos
- **Civic Functionalism:** A no-nonsense, utilitarian foundation that values information density, high legibility, explicit affordances, and zero decorative overhead.
- **Inclusive Clinical Tone:** Direct, clear, and reassuring without clinical coldness or commercial flashiness. It discards consumer-tech tropes such as heavy blur glassmorphism, floating gradients, or low-contrast micro-text in favor of high-contrast solid surfaces, well-defined strokes, and structured spatial layouts.
- **Bilingual & Multilingual Parity:** English, Hindi (Devanagari), and Bengali scripts share equal visual hierarchy, consistent optical balance, and proportional baseline alignment across all screens.

### Target Personas
- **Citizens & Patients:** Everyday individuals—frequently navigating mobile screens under varying network conditions, requiring large tap zones, prominent bilingual captions, and obvious forward pathways.
- **Healthcare Practitioners (Doctors, Vaidyas, ASHA workers):** Clinicians needing high-speed intake, structured triage cards, clear status badges, and deterministic keyboard/touch navigation.
- **Hospital Administrators:** Medical desk operators requiring information-dense lists, tabular data clarity, and standard accessibility compliance.

## Colors

The palette is anchored in an authoritative government blue paired with calming clinical tints and high-contrast structural neutrals. Every combination complies rigorously with WCAG 2.1 Level AAA guidelines for normal and large text.

### Color Tokens & Semantic Assignments
- **Primary Government Blue (`#0072B8`):** The primary interaction anchor for primary action buttons, key role selectors, brand crest elements, and active navigation tab highlights. Provides AAA compliance against white backgrounds.
- **Primary Hover / Deep Blue (`#00558A`):** Used for pressed states, primary focus rings, and high-emphasis active outlines.
- **Supporting Soft Light Blue (`#A4D6E1`):** A soft, calming supporting tone used for subtle informational container fills, avatar backdrops, and active selection washouts when blended at low opacities.
- **Clinical Emerald / Tertiary (`#0F5A47`):** Reserved for verification checkmarks, successful intake status pills, verified Ayushman Bharat Health Account (ABHA) IDs, and secure data badges.
- **Neutral Dark / Text Primary (`#333333`):** High-legibility base for typography, icon lines, and primary data labels, ensuring maximum readability without the harshness of pure black.
- **Neutral Secondary / Caption Text (`#595959`):** Used for secondary descriptors, helper hints, and unselected status labels.
- **Canvas App Background (`#F4F4F4`):** Soft, neutral off-white backing that prevents eye fatigue in clinical or outdoor sunlight settings.
- **Surface Crisp White (`#FFFFFF`):** High-order cards, interactive input fields, modal sheets, and structured containers.
- **Border Stroke (`#D6D9DC`):** Crisp, single-pixel boundary line defining input surfaces, cards, and divider bars.
- **Alert & Triage Red (`#D32F2F`):** Critical clinical alerts, triage emergencies, and mandatory validation errors.

## Typography

The typographic hierarchy is designed around multi-script parity. English typography uses `Inter` for technical clarity, with fallback stacks mapped directly to `Noto Sans Devanagari` and `Noto Sans Bengali` to eliminate visual discrepancies or broken vertical line metrics across multilingual regional deployments.

### Multi-Script Principles
- **Optical Baseline Alignment:** Devanagari and Bengali scripts require slightly more generous vertical line heights (+15% relative to English Latin) to accommodate matras (shirorēkhā vowel modifiers) and conjunct characters without clipping.
- **Sub-headline Guidance Pattern:** Critical user prompts always pair English headlines directly with an explicit Indic translation subtitle (e.g., "Welcome to SehatKendra" followed by "कृपया आगे बढ़ने के लिए अपनी भूमिका चुनें") styled at `body-md` in `#595959`.
- **Pre-title Identifiers:** Clinical categories and platform tags are rendered in uppercase using `label-sm` with widened tracking (`0.06em`) in `#0072B8` to denote administrative context.

## Layout & Spacing

The layout model is a structured, centered fluid system anchored to a strict 8px base rhythm. It limits container sprawl on ultra-wide screens to maintain rapid form scanning and focused reading zones.

### Grid & Breakpoints
- **Mobile (< 640px):** 4-column fluid layout, 16px lateral page margins, and 12px gutters. Action cards stack vertically into 100% full-width cards with large 48px minimum touch targets.
- **Tablet (640px – 1023px):** 8-column fluid layout, 24px margins, and 16px gutters. Role intake cards reflow to a 2-column grid.
- **Desktop (≥ 1024px):** 12-column layout constrained by a max-width container of `1200px` (`75rem`), with 32px gutters and horizontal centering. Multi-role selectors (Patient, Doctor, Hospital Admin) arrange neatly in equal 3-column tri-card configurations.

### Spatial Rhythm
- Functional grouping follows strict proximity rules: input labels are placed `0.25rem` above fields; inline helper icons sit `0.5rem` from text; role action cards maintain `1.5rem` internal padding; and page sections are demarcated by `3rem` vertical breaks.

## Elevation & Depth

This design system deliberately eschews decorative drop shadows, ambient blur fields, and multi-layered skeuomorphic skews. Instead, depth is conveyed through **tonal layering**, **structural outlines**, and **precise micro-elevations**.

### Elevation Tiers
- **Tier 0 (Base Canvas):** Background layer filled with `#F4F4F4`. All cards, forms, and tables sit directly atop this canvas.
- **Tier 1 (Surface Cards & Panels):** High-contrast `#FFFFFF` crisp surfaces bounded by a continuous `1px solid #D6D9DC` border. No drop shadow is used under neutral resting states to enforce clean civic printing and direct screen legibility.
- **Tier 2 (Interactive Hover & Elevated Selections):** Used when hovering role selectors or active modal dialogs. Rendered with an intentional, low-spread accessibility drop shadow: `0px 4px 12px rgba(0, 51, 102, 0.08)` paired with an active border tint of `#0072B8`.
- **Tier 3 (Modals & Emergency Drawers):** Overlays use a solid `rgba(20, 30, 40, 0.6)` backdrop dimming curtain, keeping the focus entirely on patient verification and clinical decisions.

## Shapes

The visual geometry employs subtle, soft corners (`roundedness: 1`). Elements use `0.25rem` (`4px`) to `0.5rem` (`8px`) radii to maintain a clean, institutional, and clinical structure without looking abrasive or overly toy-like.

### Radius Specifications
- **Action Buttons & Inputs:** `0.375rem` (`6px`) radius for a dependable, tactile form factor.
- **Intake & Role Cards:** `0.5rem` (`8px`) radius with continuous 1px strokes.
- **Pills, Badges & Avatars:** Fully rounded pill shapes (`9999px`) are strictly reserved for state chips (e.g., "Active", "Verified ABHA") and circular icon enclosures.
- **Accessibility & Utility Buttons:** Square buttons with `0.375rem` (`6px`) radii are used for utility triggers such as "Help" and accessibility toggles.

## Components

### Buttons
- **Primary Action Button:** Solid `#0072B8` background, `#FFFFFF` text (`label-lg`), minimum height `48px`, `12px 24px` padding, with an embedded forward chevron (`→`). Hover state shifts to `#00558A`. Focus rings display a `2px solid #0072B8` offset by `2px`.
- **Secondary / Role Button:** Solid `#FFFFFF` background with a `1px solid #0072B8` border and `#0072B8` text. Hover shifts to `#A4D6E1` at 15% opacity.
- **Utility / Accessibility Buttons:** Neutral `#FFFFFF` buttons in the top navigation bar bordered with `1px solid #D6D9DC`, carrying explicit labels ("Help", "A11y") and high-contrast icons.

### Cards & Role Selectors
- **Triage & Role Cards:** White background cards (`#FFFFFF`) with a `1px solid #D6D9DC` border, `1.5rem` internal padding, and centered content. Features an icon inside a soft blue `#A4D6E1` circle (20% opacity), bold role titles (`label-lg`), and bilingual descriptive helper text.
- **Selected Card State:** Elevated border using `2px solid #0072B8` with an ultra-light blue wash (`rgba(164, 214, 225, 0.12)`).

### Input Fields & Controls
- **Text Inputs & Dropdowns:** Flat `#FFFFFF` background, `1px solid #999999` border for strong visual definition, `48px` height, and `14px` internal horizontal padding. Active focus transitions to `2px solid #0072B8`.
- **Checkboxes & Radios:** Unselected state has a `2px solid #595959` border on `#FFFFFF`. Selected state fills with `#0072B8` with a crisp white tick or bullseye. Sized at `20px × 20px` minimum with a `44px` invisible tap target for touch devices.

### Status Badges & Trust Banners
- **Trust Guarantee Banner:** Full-width `#FFFFFF` or `#EBF5F9` utility bar placed below primary options containing high-contrast icons for "Secure Information", "Multilingual Support", and "Voice & Touch Accessible".
- **Verification Pills:** Soft green container (`#E6F4EA`) with high-contrast forest text (`#0F5A47`) and an embedded checkmark icon, designating verified clinical records or identity inputs.