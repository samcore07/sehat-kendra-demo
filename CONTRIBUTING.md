# Contributing to SEHAT KENDRA

Thank you for contributing to **SEHAT KENDRA**! This guide outlines the development standards and workflow to ensure clean, consistent, and safe collaboration.

---

## 1. Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **Git** installed on your system

### Local Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/itoyjakra13/sehat-kendra.git
   cd sehat-kendra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to inspect the application.

---

## 2. Branch Naming Conventions

Always create a new branch from `main` before starting work. Use descriptive, lowercase branch names with hyphens:

* **New Features**: `feature/<feature-name>`
  * `feature/patient-dashboard`
  * `feature/appointment-flow`
  * `feature/doctor-portal`
* **Bug Fixes & UI Tweaks**: `fix/<fix-description>`
  * `fix/questionnaire-validation`
  * `fix/care-ai-ui`
  * `fix/theme-toggle-contrast`
* **Documentation & Chores**: `docs/<topic>` or `chore/<task>`
  * `docs/readme-update`
  * `chore/lint-cleanup`

---

## 3. Development Guidelines & Architecture

To maintain code quality and aesthetic consistency, please follow these principles:

### A. Design System & CSS Tokens
* **Pure Vanilla CSS**: Do **not** install or introduce external CSS frameworks (such as Tailwind CSS, Bootstrap, or Material-UI) without team consensus.
* **Design Tokens**: Always use the CSS variables defined in [`src/styles/tokens.css`](src/styles/tokens.css) for:
  * Colors (e.g., `var(--color-primary)`, `var(--color-surface)`)
  * Spacing (e.g., `var(--space-md)`, `var(--space-lg)`)
  * Typography & line-heights
  * Elevation / shadows (e.g., `var(--shadow-card)`)
  * Border radii
* **Accessibility**: Maintain support for high-contrast accessibility tokens and dark mode styling.

### B. Component Structure
* Keep components focused, reusable, and single-purpose.
* Place shared, non-domain components in [`src/components/common/`](src/components/common/).
* Place layout headers, footers, and sidebars in [`src/components/layout/`](src/components/layout/).
* Place full-page route views in [`src/pages/`](src/pages/).

### C. State & Persistence
* Use React Context providers ([`src/contexts/`](src/contexts/)) for shared state.
* Prototype data should remain mock-based or use browser `localStorage`. Do not hardcode remote production credentials or non-standard external endpoints.

### D. Scope Discipline & Non-Regression
* Keep pull requests focused on a single feature or bug.
* **Do not rewrite existing application functionality** or redesign already functional UI screens unnecessarily.
* Preserve existing route patterns defined in [`src/constants/routes.js`](src/constants/routes.js).

---

## 4. Security & Sensitive Information

> [!CAUTION]
> **Strict Security Rule**: Never commit secrets, API keys, personal access tokens, or real patient identity data.

* Check `.gitignore` before adding new file types.
* Keep all environment variables in local `.env.local` files (which are ignored by Git).
* If mock data is needed, use generic, anonymized sample names and dummy phone numbers.

---

## 5. Pre-Commit Verification

Before committing your changes, always verify that your code compiles and passes lint checks:

1. **Run the linter:**
   ```bash
   npm run lint
   ```
   Resolve any syntax or import warnings.

2. **Verify the production build:**
   ```bash
   npm run build
   ```
   Ensure the build completes with zero errors.

---

## 6. Commit Message Guidelines

Write clear, concise commit messages in the imperative mood:

```text
feat: add doctor slot selection step to appointment flow
fix: correct questionnaire checkbox alignment on mobile screens
style: update button focus state in high-contrast mode
docs: clarify local setup instructions in README
```

---

## 7. Submitting a Pull Request (PR)

1. Push your feature branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request against the `main` branch.
3. Provide a clear description in your PR:
   * What changed and why.
   * Steps to test the change.
   * Screenshots or video clips for visual/UI modifications.
4. Request a review from the repository maintainer.
