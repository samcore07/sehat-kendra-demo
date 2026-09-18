# SEHAT KENDRA

> **SEHAT KENDRA** is an Indian digital healthcare platform prototype designed to simplify access to healthcare services, digital health information, and patient healthcare workflows.

The current stage of development primarily focuses on the **patient-side healthcare journey**, establishing a cohesive, responsive frontend interface and user flow.

---

## 1. Project Overview

SEHAT KENDRA addresses the need for accessible, intuitive digital health intake and appointment management. Designed with Indian healthcare delivery scenarios in mind, the platform provides multilingual support, assistive audio read-out capabilities, and structured health questionnaire flows.

> [!NOTE]
> **Prototype Notice**: SEHAT KENDRA is an independently developed frontend prototype. It is not an official government system or an officially accredited ABDM/ABHA service. References to ABDM (Ayushman Bharat Digital Mission) and ABHA (Ayushman Bharat Health Account) represent conceptual architectural alignment and future integration goals.

---

## 2. Features

* **Welcome & Guided Onboarding**: Step-by-step introduction for first-time visitors and returning users.
* **Multi-Language Support**: Complete interface localization across 6 Indian languages:
  * English (`en`)
  * Hindi (`hi` — हिंदी)
  * Bengali (`bn` — বাংলা)
  * Marathi (`mr` — मराठी)
  * Odia (`or` — ଓଡ଼ିଆ)
  * Tamil (`ta` — தமிழ்)
* **Assistive Audio (Text-to-Speech)**: Integrated browser-level speech synthesis helper (`useVoiceAssistance`) to read screen labels and instructions aloud for accessible usability.
* **Role Selection**: Clear pathways for Patients, Doctors, and Healthcare Administrators.
* **Patient Authentication & Registration**: Client-side simulated authentication and intake registration workflow using browser storage.
* **Health History Questionnaire**: Step-by-step intake covering chronic conditions, vitals, allergies, lifestyle habits, and previous clinical records.
* **Digital Patient Profile & Review**: Summary screen allowing patients to review their submitted intake data before saving.
* **Patient Dashboard**: Centralized hub presenting upcoming appointments, active prescriptions, wellness guidance, and quick actions.
* **Dual Treatment Pathways**:
  * **General Medicine Pathway**: Consultation booking with allopathic specialists and primary care doctors.
  * **Ayurveda / AYUSH Pathway**: Specialized scheduling and wellness guidance for Ayurvedic care.
* **Care AI Interface (Prototype Assistant)**: A conversational frontend interface providing non-diagnostic health education information and emergency contact suggestions (such as National Emergency 112 and Ambulance 108).
* **Health & Wellness Resources**: Curated lifestyle and wellness guidelines aligned with traditional and modern preventive care.
* **Theme & Accessibility Controls**: Light mode, dark mode, system preference synchronization, and high-contrast accessibility CSS tokens.

---

## 3. Technology Stack

The repository utilizes a clean, modern frontend stack without heavy third-party UI framework dependencies:

| Layer | Technology | Version / Specification |
| :--- | :--- | :--- |
| **Frontend Framework** | [React](https://react.dev/) | `^19.2.8` (via `package.json`) |
| **DOM Renderer** | React DOM | `^19.2.8` |
| **Build Tool & Dev Server** | [Vite](https://vite.dev/) | `^8.2.2` |
| **React Vite Plugin** | `@vitejs/plugin-react` | `^6.1.0` |
| **Client-Side Routing** | [React Router DOM](https://reactrouter.com/) | `^7.6.3` |
| **Language & Syntax** | JavaScript (ES Modules, JSX) | Modern ECMAScript |
| **State Management** | React Context API | `ThemeContext`, `LanguageContext`, `AuthContext`, `PatientContext` |
| **Styling & Design System** | Pure Vanilla CSS3 | Custom Properties / Design Tokens (`tokens.css`, `base.css`, `components.css`, `layouts.css`, `globals.css`) |
| **Audio Assistance** | Web Speech API | Native `window.speechSynthesis` |
| **Local Persistence** | Web Storage API | Browser `localStorage` |
| **Typography & Icons** | Google Fonts & Material Symbols | Inter, Noto Sans Devanagari, Noto Sans Bengali, Material Symbols Outlined |
| **Code Quality & Linter** | [Oxlint](https://oxc.rs/) | `^1.79.0` |

---

## 4. Current Development Status

The repository currently represents the **frontend foundation and prototype implementation**.

* The user interface, client-side routing, theme system, localization dictionaries, and mock interaction services are actively functional.
* **Backend services, databases, persistent cloud storage, secure server-side authentication, real AI/ML models, and clinical systems are not yet integrated.**
* All data flows currently operate via React Context and browser `localStorage`.

---

## 5. Project Structure

```text
SEHAT KENDRA/
├── public/                                # Static public assets
│   ├── favicon.svg                        # Site favicon
│   └── icons.svg                          # Vector icon sprite definitions
├── src/
│   ├── assets/                            # Static asset directory
│   ├── components/                        # Reusable modular UI components
│   │   ├── common/                        # Buttons, Badges, Cards, ProtectedRoute
│   │   ├── layout/                        # Headers, Footers, Navbars, Sidebars, Layouts
│   │   └── ui/                            # Voice assistance button and UI widgets
│   ├── constants/                         # Application-wide constants (routes.js)
│   ├── contexts/                          # React Context Providers
│   │   ├── AuthContext.jsx                # Authentication and session state
│   │   ├── LanguageContext.jsx            # Language selection and localization state
│   │   ├── PatientContext.jsx             # Patient health profile and appointments state
│   │   └── ThemeContext.jsx               # Light/Dark/High-contrast theme state
│   ├── css/                               # Legacy styling references
│   ├── data/                              # Mock data collections & static content
│   ├── features/                          # Feature-specific subcomponents and logic
│   │   ├── admin/                         # Admin feature logic
│   │   ├── appointments/                  # Appointment feature components
│   │   ├── auth/                          # Auth views and validation
│   │   ├── ayurveda/                      # AYUSH feature components
│   │   ├── healthIntake/                  # Intake questionnaire step handlers
│   │   └── prescriptions/                 # Prescription records components
│   ├── hooks/                             # Custom React hooks
│   │   ├── useAuth.js                     # Auth context hook
│   │   ├── useLanguage.js                 # Language context hook
│   │   ├── useTheme.js                    # Theme context hook
│   │   └── useVoiceAssistance.js          # Web Speech synthesis hook
│   ├── i18n/                              # Localization lookup dictionary
│   │   └── strings.js                     # Central multilingual strings lookup
│   ├── js/                                # Baseline JavaScript utilities
│   ├── locales/                           # Language translation dictionaries
│   │   ├── bn.js                          # Bengali
│   │   ├── en.js                          # English
│   │   ├── hi.js                          # Hindi
│   │   ├── mr.js                          # Marathi
│   │   ├── or.js                          # Odia
│   │   └── ta.js                          # Tamil
│   ├── pages/                             # Route view pages
│   │   ├── admin/                         # Admin portal views
│   │   ├── patient/                       # Patient portal, intake, and booking pages
│   │   └── public/                        # Welcome, onboarding, and auth pages
│   ├── screens/                           # Screen definitions and layout references
│   ├── services/                          # Simulated asynchronous data services
│   │   ├── appointmentService.js          # Mock appointment scheduling service
│   │   ├── careAiService.js               # Mock health guidance & emergency check service
│   │   └── doctorService.js               # Mock clinician query service
│   ├── styles/                            # Design system stylesheets
│   │   ├── base.css                       # Reset, typography, and base element styles
│   │   ├── components.css                 # Buttons, badges, cards, form controls
│   │   ├── globals.css                    # Global master import stylesheet
│   │   ├── layouts.css                    # Layout grids, containers, navigation bars
│   │   └── tokens.css                     # CSS Custom Properties / Design tokens
│   ├── App.jsx                            # Root application routing configuration
│   └── main.jsx                           # Application entry point with providers
├── stitch_sehat_kendra_digital_healthcare/ # UI design mockups and reference screens
├── .gitignore                             # Git ignore specification
├── .oxlintrc.json                         # Oxlint rules configuration
├── CONTRIBUTING.md                        # Developer contribution guidelines
├── index.html                             # Single Page Application HTML shell
├── package.json                           # Project manifest and dependencies
├── package-lock.json                      # Locked dependency tree
├── README.md                              # Main documentation file
└── vite.config.js                         # Vite build and plugin configuration
```

---

## 6. Installation

Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed on your system.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/itoyjakra13/sehat-kendra.git
   cd sehat-kendra
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

---

## 7. Running the Project

Use the standard npm scripts defined in `package.json`:

* **Start local development server:**
  ```bash
  npm run dev
  ```
  Vite will launch the local development server (typically at `http://localhost:5173`).

* **Create a production build:**
  ```bash
  npm run build
  ```
  Compiles and bundles the application into the `dist/` directory.

* **Preview the production build locally:**
  ```bash
  npm run preview
  ```

* **Run the linter:**
  ```bash
  npm run lint
  ```
  Executes `oxlint src` to check code quality and detect syntax issues.

---

## 8. Development Roadmap

* [ ] **Backend APIs & Data Persistence**: Implementation of secure RESTful/GraphQL APIs for user records and appointments.
* [ ] **ABDM & ABHA Ecosystem Integration**: Integration with official national health identity APIs and FHIR-compliant health record exchanges.
* [ ] **Secure Authentication Infrastructure**: Multi-factor authentication, phone OTP verification, and role-based access control.
* [ ] **Production AI/ML Integration**: Connecting the Care AI assistant interface to vetted medical NLP services with strict safety guardrails.
* [ ] **Full Doctor & Clinician Portal**: Prescription generator, patient queue management, and longitudinal history review.
* [ ] **Hospital Administration Suite**: Resource allocation, bed management, and clinical audit reporting.
* [ ] **Teleconsultation Services**: Integrated WebRTC or national tele-consultation video pipelines.

---

## 9. Contribution

Contributions from frontend collaborators are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:
* Branch naming conventions (`feature/...`, `fix/...`)
* Design system tokens and styling rules
* Code quality and pull request workflows

---

## 10. Project Status & Disclaimer

* **Current Stage**: Active Frontend Prototype.
* **Disclaimer**: This software is currently an experimental frontend prototype developed for workflow exploration and user experience testing. It does not provide certified medical diagnoses, clinical triage, or direct emergency response services. In any real-life medical emergency, always dial national emergency services (**112** or **108** in India) immediately.
