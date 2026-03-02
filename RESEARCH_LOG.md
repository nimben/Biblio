# Research Log: BIBILIO

**Researcher:** Nimmy Benny<br>
**Goal:** Build a simple web-based decision support tool that ranks books using a weighted decision matrix and clearly explains why one option is ranked above another.

---

## Master Plan & Goals

- **Targeted Output:** Functional FastAPI + React application with clear documentation and diagrams.
- **Core Question:** How can I design a lightweight system that ranks books using user-defined criteria and also explains the reasoning transparently?

---

## Log Entries 

### Initial Architecture Planning

- **Action:** Planned system structure (frontend + backend separation).
- **Notes:**  
  Decided that no database or authentication was needed because the assignment didn’t require persistence.
- **AI Prompts Used:**  
  - “Help me scaffold a FastAPI backend and React/Vite frontend for a decision-making tool.”
  - “What’s a clean folder structure for a small production-ready FastAPI + React project?”
  

---

### Backend Model & Scoring Logic

- **Action:** Designed FastAPI request/response models and scoring algorithm.
- **Source:** FastAPI + Pydantic documentation (mainly for validation patterns).
- **Notes:**  
  The tricky part was handling dynamic criteria. Each book needs ratings per criterion, and each criterion has a weight. I used a weighted sum approach and normalized the final score to 0–10 to make results easier to interpret.
- **AI Prompts Used:**  
  - “How can I design Pydantic models to accept dynamic criteria and weights?”
  - “What’s a clean way to validate a request body containing books, criteria, weights, and ratings?”
  - “How should I structure a weighted decision matrix in Python?”
  - “How do I implement a weighted sum scoring algorithm?”
  - “How can I normalize scores to a 0–10 scale?”
  - “How can I return a per-criterion breakdown for explainability?”

---

### Frontend Dynamic Form

- **Action:** Implemented ability to dynamically add/remove books and criteria.
- **Notes:**  
  Rendering a matrix (books × criteria) was more complex than expected. Managing state cleanly in React took a few iterations.
- **AI Prompts Used:**  
  - “How can I dynamically add/remove books and criteria in React?”
  - “How do I render a matrix-style input (books × criteria)?”
  - “How can I improve UI styling without changing business logic?”

---

### Explainability Improvement

- **Action:** Added per-criterion score breakdown in backend response.
- **Notes:**  
  Instead of returning only a final score, the backend now includes contribution per criterion. This makes the ranking explainable.

---

###  Documentation & Diagrams

- **Action:** Created architecture diagram and DFD.
- **Notes:**  
  Focused on clarity rather than complexity. I intentionally avoided adding fake components like databases or auth systems that don’t exist.
- **AI Prompts Used:**  
  - “What diagrams should I include for a small web architecture?”
  - “Help me check what might be missing from this assignment.”
  - “How should I explain design decisions clearly in a README?”
---

## Source Library & Notes

- FastAPI documentation (routing, CORS, request validation)
- Pydantic v2 documentation (model structure and validation)
- Vite documentation (environment variables)
- React documentation (state management basics)

---

## What I Accepted, Rejected, or Modified from AI Outputs

### Accepted As-Is
- Basic FastAPI app structure (`main.py` layout).
- CORS middleware configuration.
- Separation of scoring logic into a dedicated `decision_engine.py` file.

### Accepted but Modified
- Initial Pydantic model suggestions were simplified to better fit dynamic criteria.
- UI layout suggestions were trimmed to avoid unnecessary components.
- Some documentation wording was rewritten to sound more direct and less “marketing-style.”

### Rejected
- Suggestions involving adding authentication or databases (not required for this assignment).
- Overly complex architectural additions (microservices, async queues, etc.).
- Any heuristic-based scoring logic (e.g., title length, randomness, etc.).
- Explanations that felt too abstract or overly polished.

---

## Next Steps / Improvements (If Extended)

- Add persistence (save evaluations)
- Add user accounts
- Visualize score breakdown using charts
- Deploy with auto-scaling configuration

---

## Use of AI

AI was used mainly for:
- Checking syntax and patterns for FastAPI + Pydantic v2.
- Brainstorming structure and making sure I didn’t miss required assignment sections.
- Reviewing documentation wording and helping me tighten explanations.

