# Kyrie OS

Monorepo for Kyrie OS SaaS platform.

## Structure

- `apps/web`: Next.js 14 Frontend
- `apps/api`: FastAPI Backend

## Getting Started

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

App runs on http://localhost:3000

### Backend

```bash
cd apps/api
# Create virtual env
python -m venv venv
# Activate virtual env:
# Windows:
contexto\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API runs on http://localhost:8000
