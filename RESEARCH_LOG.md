# Research Log: BIBILIO

**Researcher:** [Your Name]  
**Start Date:** 2025-02-XX  
**Goal:** Build a simple web-based decision support tool that ranks books using a weighted decision matrix and clearly explains why one option is ranked above another.

---

## 🎯 Master Plan & Goals

- **Targeted Output:** Functional FastAPI + React application with clear documentation and diagrams.
- **Core Question:** How can I design a lightweight system that ranks books using user-defined criteria and also explains the reasoning transparently?

---

## 🗓 Log Entries (Chronological)

### 2025-02-XX – Initial Architecture Planning

- **Action:** Planned system structure (frontend + backend separation).
- **Notes:**  
  I wanted to keep things simple and avoid overengineering. Decided early that no database or authentication was needed because the assignment didn’t require persistence.
- **Reflection:**  
  Keeping it stateless made everything cleaner and easier to reason about.

---

### 2025-02-XX – Backend Model & Scoring Logic

- **Action:** Designed FastAPI request/response models and scoring algorithm.
- **Source:** FastAPI + Pydantic documentation (mainly for validation patterns).
- **Notes:**  
  The tricky part was handling dynamic criteria. Each book needs ratings per criterion, and each criterion has a weight. I used a weighted sum approach and normalized the final score to 0–10 to make results easier to interpret.
- **Reflection:**  
  I briefly considered adding more “clever” scoring ideas, but decided to stick to a clean weighted matrix since that’s transparent and easy to justify.

---

### 2025-02-XX – Frontend Dynamic Form

- **Action:** Implemented ability to dynamically add/remove books and criteria.
- **Notes:**  
  Rendering a matrix (books × criteria) was more complex than expected. Managing state cleanly in React took a few iterations.
- **Reflection:**  
  I kept the UI logic simple and avoided introducing unnecessary component layers.

---

### 2025-02-XX – Explainability Improvement

- **Action:** Added per-criterion score breakdown in backend response.
- **Notes:**  
  Instead of returning only a final score, the backend now includes contribution per criterion. This makes the ranking explainable.
- **Reflection:**  
  This was important. A ranked list without explanation would feel like a black box.

---

### 2025-02-XX – Documentation & Diagrams

- **Action:** Created architecture diagram and DFD.
- **Notes:**  
  Focused on clarity rather than complexity. I intentionally avoided adding fake components like databases or auth systems that don’t exist.
- **Reflection:**  
  Clean diagrams are better than impressive-looking but inaccurate ones.

---

## 📚 Source Library & Notes

- FastAPI documentation (routing, CORS, request validation)
- Pydantic v2 documentation (model structure and validation)
- Vite documentation (environment variables)
- React documentation (state management basics)

These were mostly references to confirm syntax and patterns rather than full tutorials.

---

## 💡 Key Ideas & Findings

- A simple weighted sum is often better than an “intelligent” but opaque scoring system.
- Stateless architecture simplifies both deployment and reasoning.
- Explainability matters as much as correctness in decision-support systems.

---

## 🚀 Next Steps / Improvements (If Extended)

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

I did not use AI to auto-generate the full application or scoring logic blindly.  
The final structure and algorithm choices were deliberate and reflect how I personally wanted the system to behave.