# Book Decision Companion

Book Decision Companion is a small, production-ready, full-stack web application that helps you compare multiple book options using weighted decision criteria. You enter your candidate books and adjust the importance of readability, depth, and popularity; the backend computes weighted scores and returns a ranked list.

The project is structured as a single repository with independent frontend and backend folders.

## Project Structure

- `backend/`: FastAPI application and decision engine.
- `frontend/`: React + Vite single-page application.

## Backend (FastAPI)

### Tech

- FastAPI
- Pydantic models (v2 style)
- Uvicorn

### Endpoints

- **GET `/`**: Health check, returns a simple JSON payload confirming the API is running.
- **POST `/evaluate`**:
  - **Request body**:
    - `books`: array of strings (book titles)
    - `weights`: object
      - `readability`: number (>= 0)
      - `depth`: number (>= 0)
      - `popularity`: number (>= 0)
  - **Response body**:
    - `ranked_books`: array of objects
      - `name`: string
      - `score`: number

The decision logic lives in `backend/decision_engine.py` and returns a deterministic weighted score for each book. It uses simple, title-based heuristics so you can swap in your own scoring later without touching the API shape.

### Environment Variables (Backend)

The backend is designed to work without a database or extra services. Environment variables are optional but recommended for production:

- **`ALLOWED_ORIGINS`**: Comma-separated list of allowed CORS origins.
  - Example (local development is always allowed):  
    `ALLOWED_ORIGINS=https://your-netlify-site.netlify.app`

> Do **not** commit your `.env` files; they are ignored via `.gitignore`.

### Install & Run Locally (Backend)

From the project root:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # On Windows (PowerShell)
# source .venv/bin/activate  # On macOS/Linux

pip install --upgrade pip
pip install -r requirements.txt

uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

## Frontend (React + Vite)

### Tech

- React (JavaScript)
- Vite
- CSS (no heavy UI frameworks)

The frontend provides:

- A centered, minimal UI.
- Input for multiple books (comma-separated list).
- Weight sliders for readability, depth, and popularity (0–10).
- Loading and error states.
- A clean results table with scores shown to two decimal places.

### Environment Variables (Frontend)

The frontend reads the backend base URL from `VITE_API_URL`:

- **`VITE_API_URL`**: Base URL of the backend API (no trailing slash).
  - Example (local):  
    `VITE_API_URL=http://localhost:8000`

Create `frontend/.env` for local development:

```bash
VITE_API_URL=http://localhost:8000
```

> This file is not committed to git.

### Install & Run Locally (Frontend)

From the project root:

```bash
cd frontend
npm install
npm run dev
```

By default Vite will serve the app at `http://localhost:5173`.

Ensure `VITE_API_URL` points at your running backend (`http://localhost:8000` for local).

### Build for Production

From `frontend/`:

```bash
npm run build
```

This produces a `dist/` folder that Netlify can serve.

## Running the Full Stack Locally

1. **Start the backend**:
   - In one terminal:
     - `cd backend`
     - (create/activate virtualenv if needed)
     - `pip install -r requirements.txt`
     - `uvicorn main:app --host 0.0.0.0 --port 8000`
2. **Start the frontend**:
   - In another terminal:
     - `cd frontend`
     - `npm install`
     - `npm run dev`
3. Open `http://localhost:5173` in your browser.

## Deployment

### Backend on Render

1. Push this repository to GitHub.
2. In Render:
   - Create a **New Web Service**.
   - Point it at the GitHub repo.
   - Set the root directory to `backend/` (or keep root and set the working directory to `backend`).
   - **Build command** (optional, for dependencies):
     - `pip install -r requirements.txt`
   - **Start command**:
     - `uvicorn main:app --host 0.0.0.0 --port 8000`
3. In the Render service settings, configure environment variables, for example:
   - `ALLOWED_ORIGINS=https://your-netlify-site.netlify.app`
4. After deploy, you will get a URL like:
   - `https://your-backend.onrender.com`

### Frontend on Netlify

1. Push this repository to GitHub (same monorepo).
2. In Netlify:
   - Create a **New site from Git**.
   - Point it at the same repo.
   - Set the base directory to `frontend`.
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. In Netlify environment variables, set:
   - `VITE_API_URL=https://your-backend.onrender.com`
4. Deploy the site. Netlify will give you a URL like:
   - `https://your-netlify-site.netlify.app`

Make sure this Netlify URL is listed in `ALLOWED_ORIGINS` on the backend.

## Production Environment Variable Example

Example configuration for a deployed setup:

- **Render (backend)**:
  - `ALLOWED_ORIGINS=https://book-decision-companion.netlify.app`
- **Netlify (frontend)**:
  - `VITE_API_URL=https://book-decision-companion-backend.onrender.com`

## Git & Monorepo Notes

- Git is initialized at the repository root.
- `.gitignore` excludes:
  - Python virtual environments and `__pycache__`.
  - Node `node_modules` and `dist` artifacts.
  - `.env` files for both backend and frontend.
- Backend and frontend are independent but live in the same repository, which makes it straightforward to deploy them separately to Render and Netlify.

