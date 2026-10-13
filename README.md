# Customer Support Multi-Agent AI

A learning and portfolio project for a customer-support assistant that uses a React frontend, a FastAPI backend, and LangGraph agents with typed tools over mock store data (orders, tickets, policies) so the LLM never writes SQL and never handles real payments or refunds.

## Quick Start

### Prerequisites

- Python 3.11 or newer
- Node.js 20 or newer (with npm)
- Git

Copy `.env.example` files before starting. Never commit `.env`.

### Backend

From the repository root, in PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

On macOS/Linux, activate with `source .venv/bin/activate` and copy env with `cp .env.example .env`.

Health check: `http://127.0.0.1:8000/health`

### Frontend

In a second terminal:

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You should see **Backend healthy (env: dev)** when the API is running.

### Tests

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python -m pytest tests/test_health.py -v
```
