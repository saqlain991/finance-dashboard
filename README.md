# Finexy ERP - Modern Financial Architecture

Finexy is a next-generation Enterprise Resource Planning (ERP) dashboard designed for high-density financial management and real-time data orchestration. Built with a premium glassmorphic aesthetic and robust Role-Based Access Control (RBAC), it provides a state-of-the-art interface for managing complex financial segments.

![Finexy Dashboard](../homepage.png)

## 🚀 Core Features

### 1. Dynamic Analytical Engine

The analytics layer is fully reactive. When you switch between profiles, the **Profit Trajectory**, **Operations Balance**, and **Asset Allocation** charts dynamically update to reflect the specific profile's data segment.

### 2. Intelligent RBAC (Role-Based Access Control)

- **Admin**: Full system access including infrastructure management and export capabilities.
- **Editor**: Can modify transactions and view all analytics but has restricted administrative access.
- **Viewer**: Read-only access to the dashboard and history ledgers.

### 3. Integrated Financial Ecosystem

- **History Ledger**: Real-time transaction tracking with advanced sorting and filtering.
- **Manage Module**: Hierarchical administration of system nodes and assets.
- **Insights & Reports**: Automated generation of annual performance manifests and variance reports.

### 4. Premium Design System

- **Glassmorphism**: Subtle background blurs and ambient glow effects.
- **Teal Accent (#0CC8A8)**: Consistent professional coloring for active states and CTAs.
- **High-Density UI**: Optimized spacing for data-heavy environments.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Base UI](https://base-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Visualizations**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Local Development

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run the Development Server**:

   ```bash
   npm run dev
   ```

3. **Build for Production**:

   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
├── components/           # UI Components & Dashboard Modules
│   ├── ui/               # Primary UI atomic components
│   └── watermelon/       # High-level ERP dashboard components
├── context/              # State Management (AppContext)
├── lib/                  # Utilities, Constants & Mock Data
└── types/                # TypeScript interfaces
