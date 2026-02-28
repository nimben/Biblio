import os
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from decision_engine import compute_ranked_books
from models import EvaluationRequest, EvaluationResponse


def _build_allowed_origins() -> List[str]:
    """
    Build the CORS allowed origins list.

    - Always allow localhost for development.
    - Optionally extend with a comma-separated ALLOWED_ORIGINS env var
      (e.g. https://your-netlify-site.netlify.app).
    """
    default_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ]

    extra_origins_raw = os.getenv("ALLOWED_ORIGINS", "")
    extra_origins = [
        origin.strip()
        for origin in extra_origins_raw.split(",")
        if origin.strip()
    ]

    # Preserve order but remove duplicates
    seen = set()
    origins: List[str] = []
    for origin in [*default_origins, *extra_origins]:
        if origin not in seen:
            seen.add(origin)
            origins.append(origin)
    return origins


app = FastAPI(title="Book Decision Companion API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_build_allowed_origins(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return {"status": "ok", "message": "Book Decision Companion API is running."}


@app.post("/evaluate", response_model=EvaluationResponse)
async def evaluate_books(payload: EvaluationRequest):
    books_payload = [
        {"name": b.name, "ratings": b.ratings}
        for b in payload.books
    ]
    ranked = compute_ranked_books(books_payload, payload.weights)
    return {"ranked_books": ranked}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

