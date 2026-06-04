<div align="center">
  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="AXA XL Enterprise AI Platform" width="100%" height="300" style="object-fit: cover; border-radius: 12px; margin-bottom: 20px;" />
  <h1 align="center">AXA XL Enterprise AI Project Intelligence Platform</h1>
  <p align="center">
    <strong>Strategic mapping of digital initiatives, product requirements, and complete implementation plans.</strong>
  </p>
  <p align="center">
    <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  </p>
</div>

## 📖 About the Project

The **AXA XL Enterprise AI Project Intelligence Platform** is a secure, high-performance dashboard designed specifically for digital transformation directors, digital underwriters, and enterprise system auditors. It offers a strategic overview of 18 digital AI initiatives tailored for AXA XL.

The platform provides a comprehensive view of various ideas, scores them across relevance, AI usage, Cloud usage, and DevOps impact, and presents them in an interactive, animated interface. 

### Core Objectives:
- **Strategic Mapping:** Evaluate and compare multiple AI integration projects for AXA XL.
- **Deep Dive PRDs:** Review product requirements, architectural details, and week-by-week implementation plans.
- **Reporting:** Instantly generate executive summary PDF reports of the initiatives.
- **Status Tracking:** Flag exceptions, archive projects, and manage project statuses locally.

---

## ✨ Features

- **Interactive Project Grid:** Browse through all AI initiatives with sortable, animated cards.
- **Detailed Project Profiles:** View complexity, target users, cloud details, DevOps strategies, and proposed tech stacks for each project.
- **Executive PDF Export:** Generate and download comprehensive PDF reports directly from the dashboard.
- **Top 5 PRDs:** Dedicated section for the most critical Product Requirement Documents.
- **Deep Dive Analysis:** Extensive breakdown of the top strategic projects including QA, LinkedIn pitches, and weekly sprint plans.
- **Local State Management:** Flag specific projects with notes and reasons, and archive discarded ones—all persisted seamlessly in your browser.
- **Smooth Animations:** Powered by `framer-motion` for a premium, application-like feel.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **PDF Generation:** Custom utility integrated for client-side document creation.

---

## 🚀 Running Locally

Follow these steps to get the project up and running on your local machine.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or Download the Repository**
2. **Navigate to the project directory:**
   ```bash
   cd axa-xl
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Set up Environment Variables:**
   - Copy `.env.example` to `.env.local`
   - Update any necessary keys (e.g., API keys if applicable to future extensions).
5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
6. **Open your browser:**
   Navigate to `http://localhost:5173` to view the platform.

---

## 📁 Project Structure

```text
axa-xl/
├── src/
│   ├── components/      # Reusable UI components (Header, KpiSection, FlagModal, etc.)
│   ├── utils/           # Helper functions (e.g., pdfGenerator)
│   ├── App.tsx          # Main application container and routing logic
│   ├── data.ts          # Static intelligence data (Ideas, PRDs, Deep Dives)
│   ├── types.ts         # TypeScript interfaces and type definitions
│   ├── index.css        # Global styles and Tailwind configuration
│   └── main.tsx         # React DOM entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

<div align="center">
  <sub>© 2026 AXA XL Digital Innovation Labs. Authorized Enterprise Personnel Only.</sub>
</div>
