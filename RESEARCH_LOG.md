# RESEARCH_LOG

This file is a quick log of how I used AI and other references while building this project. The goal is to be transparent, not to pretend I wrote everything from scratch with no help.

## How I used AI

- To bounce ideas on how to structure a small, production‑ready FastAPI + React monorepo.
- To help with small bits of syntax (mainly FastAPI + Pydantic v2 details and some CSS tweaks).
- To sanity‑check my interpretation of the assignment and spot gaps (for example, making sure I explain **why** a recommendation was made and not just show a ranked list).
- To get wording suggestions for documentation sections, which I then rewrote into my own voice.

## Prompts / questions (high level)

These are the main types of prompts I used. The actual conversations live in my IDE’s chat history, but this is the gist of what I asked for:

- “Help me scaffold a FastAPI backend and React/Vite frontend for a decision‑making tool that ranks books using a weighted decision matrix.”
- “I want the backend to accept dynamic criteria and weights, with ratings per book per criterion. How should the Pydantic models look?”
- “I need the scoring logic to be a simple weighted sum, normalized to 0–10, and I want a per‑criterion breakdown so I can explain the ranking.”
- “Refactor the frontend so I can dynamically add/remove books and criteria and render a rating matrix (books × criteria).”
- “Update the UI styling to feel like a clean bookstore landing page without changing any business logic.”
- “Help me spot what’s missing against this assignment description (README sections, build log, research log, diagrams, etc.).”

## External searches

I mostly stayed inside the IDE and the docs exposed through AI. I didn’t need heavy external Googling for this one, beyond the usual “FastAPI docs” and “Vite docs” lookups that I’ve already seen before.

If I had done more external searching, the queries would have looked like:

- “fastapi pydantic v2 request body dict of dynamic keys”
- “vite env variable VITE_API_URL example”
- “simple weighted decision matrix explanation”

## References that influenced the approach

- My past experience with simple weighted‑sum decision matrices from uni / work.
- FastAPI and Pydantic documentation for model/validation patterns.
- Vite and React docs for environment variables and basic SPA wiring.

## What I accepted, rejected, or modified from AI

- **Accepted as‑is**  
  - Basic FastAPI app wiring (`main.py` structure, CORS setup).  
  - The idea of keeping all scoring logic in one `decision_engine.py` file.

- **Accepted but simplified**  
  - Initial UI suggestions: I kept the core layout ideas but stripped out any over‑engineering or extra components.  
  - Some of the CSS proposals: I took the general direction (clean card, neutral background) and trimmed down the rest.

- **Changed / rejected**  
  - Any title‑based or heuristic scoring (length, vowels, etc.). I replaced that with a pure weighted matrix using user ratings only.  
  - Suggestions that involved adding a database, authentication, or more backend complexity than the assignment required.  
  - Very “flowery” documentation text. I rewrote docs in a more direct tone so it reads like me and not like a marketing page.

Overall, AI helped me move faster and spot gaps, but the final shape of the system (dynamic criteria, explicit scoring formula, breakdown for explainability) is deliberate and matches how I’d want to use this tool myself.

