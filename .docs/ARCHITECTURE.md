# Kyrie OS - System Architecture

## 1. Monorepo Structure

The project follows a strict Monorepo structure to separate concerns between the
user interface and the intelligence layer.

- **`apps/web`**: Frontend Application
  - **Framework**: Next.js 14 (App Router)
  - **Language**: TypeScript
  - **Responsibilities**: UI Rendering, Client-side logic, Simple Data Fetching.
  - **Routes**:
    - `/` -> Redirects to `/login`
    - `/login` -> Public Auth Page
    - `/dashboard` -> Protected Admin Area
- **`apps/api`**: Intelligence Backend
  - **Framework**: FastAPI (Python)
  - **Role**: Intelligence Layer & Complex Operations
  - **Responsibilities**: AI Agent Orchestration (CrewAI), Heavy Calculations,
    Report Generation.

---

## 2. Hybrid Data Strategy

We utilize a hybrid approach to data handling to optimize for speed and
capability:

### A. Direct Access (CRUD)

**Frontend (`apps/web`) -> Supabase**

- For standard Create, Read, Update, Delete operations.
- Examples: Creating a client, updating a task status, listing projects.
- **Key Tables**: `organizations` (Clients), `users`, `projects`.
- **Mechanism**: Use the Supabase JS Client directly in React Server Components
  (fetching) or Client Components (mutations).

### B. Intelligence Layer (AI/Complex)

**Frontend (`apps/web`) -> FastAPI (`apps/api`) -> Supabase/LLM**

- For operations requiring AI, complex aggregation, or business logic that
  shouldn't be exposed to the client.
- Examples: Generating ROI reports, AI text generation, complex financial
  calculations.
- **Mechanism**: Frontend calls FastAPI endpoints. Backend performs logic
  (potentially using CrewAI agents) and interacts with Supabase or LLMs,
  returning processed data (JSON).

---

## 3. Technology Stack

### Core

- **Framework**: Next.js 14
- **Language**: TypeScript (Frontend), Python 3.11+ (Backend)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth

### UI & Styling

- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **Icons**: Lucide React
- **Animation**: Framer Motion, GSAP (specialized backgrounds)

### Intelligence

- **Agents**: CrewAI
- **Integration**: Magic MCP (component generation), Supabase MCP.
