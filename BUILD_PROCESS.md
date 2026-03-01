# BUILD_PROCESS.md

## 1. Where the Idea Started

The initial conceptual inspiration came from a Soft Computing class,
specifically the structure of a Genetic Algorithm used for optimization problems.

<p align="center">
  <img src="assets/ga-flow.png" width="500"/>
</p>

<p align="center">
  <em>Figure 1: Genetic Algorithm optimization cycle (conceptual inspiration).</em>
</p>

This framework influenced how I thought about decision-making as an optimization process:

- Options = population  
- Evaluation logic = fitness function  
- Highest scoring option = fittest solution  

This optimization cycle shaped the structural thinking behind the decision engine, even though the final system does not directly implement evolutionary computation.

However, implementing a full genetic algorithm would have been unnecessary and overly complex for this assignment.

The conceptual influence remained, but the implementation evolved into a simpler and more transparent weighted decision model.
---

## 2. Defining the Overall Idea

When first thinking about the system, the challenge was:

> What is the core idea of this Decision Companion?

Initially, I wasn’t sure what the decision logic should revolve around.

Through discussion, the direction shifted toward a **criteria-based evaluation system** where:

- Users define options (books)
- Users define evaluation criteria
- Each criterion has a weight
- Each option receives ratings per criterion
- The system computes a final score

This made the system structured, explainable, and deterministic.

---

## 3. Doubt About User-Defined Weights

At one point, I questioned the design:

"If the user gives both the ratings and the weights, isn’t the system useless?"

This was a critical moment in the design thinking.

The clarification was important:

This is not a recommendation system.
It is a **Decision Companion**.

The system does not replace the user’s judgment.
It structures, quantifies, and clarifies it.

That distinction reshaped the entire approach.

---

## 4. Early Prototype: Synthetic Scoring

Before fully committing to user-driven evaluation, I built a demo using synthetic scoring.

The scoring was based on heuristics derived from book titles, such as:
- Title length
- Vowel count
- Word patterns

This simulated a “fitness function” similar to optimization algorithms.

However, this approach had problems:
- It was artificial
- It was not transparent
- It did not reflect real user preferences
- It behaved like a black-box heuristic

This conflicted with the core philosophy of a Decision Companion.

So I pivoted.

---

## 5. Shift to User-Based Rating System

The system evolved into a fully user-driven weighted decision matrix:

Score = Σ (rating × weight)

This approach is:
- Deterministic
- Transparent
- Explainable
- Mathematically grounded

Unlike AI-based systems, it does not guess.
It calculates exactly what the user expresses.

---

## 6. Static → Dynamic Evolution

The evolution happened in stages:

### Phase 1: Static Criteria
Hardcoded criteria such as:
- Readability
- Depth
- Popularity

This proved too rigid.

### Phase 2: User-Defined Criteria
Users could define their own evaluation criteria.

### Phase 3: Fully Dynamic System
Users could:
- Add criteria dynamically
- Remove criteria
- Assign weights
- Rate each book dynamically

This significantly improved:
- Flexibility
- Real-world usability
- Architectural quality

Managing a dynamic rating matrix in React became one of the more challenging parts of the implementation.

---

## 7. Architecture Decisions

Frontend: React  
Backend: FastAPI  
Architecture: Stateless API

Why this approach:

- Clear separation of concerns
- Backend handles scoring logic
- Frontend handles dynamic UI interactions
- Easy local and independent deployment
- Keeps decision engine clean and testable

The system intentionally does not use a database.
The focus is on the decision logic, not persistence.

---

## 8. Mathematical Normalization

Raw weighted scores depend on total weights.

To improve user clarity, I normalized final scores to a 0–10 scale.

This:
- Prevents confusing large numbers
- Improves UX
- Makes comparisons easier
- Avoids distortion when weights vary

---

## 9. Challenges Faced

- Managing dynamic criteria updates in React
- Synchronizing ratings when criteria are added/removed
- Handling validation between frontend and backend
- Preventing invalid inputs (negative weights, missing ratings)
- Avoiding division-by-zero errors in normalization

---

## 10. Refactoring Decisions

During development, I:

- Removed synthetic heuristic scoring
- Replaced it with user-driven weighted scoring
- Refactored backend validation using Pydantic
- Simplified API response structure
- Cleaned CORS configuration for flexible deployment

Each refactor moved the system toward transparency and clarity.

---

## 11. Why This Is Not an AI Recommendation System

This system does not:

- Predict preferences
- Learn from data
- Use trained models
- Generate suggestions autonomously

Instead, it:

- Structures user thinking
- Quantifies subjective judgment
- Produces mathematically grounded rankings

It is a decision support tool, not a predictive system.

---

## 12. Decision Logic Diagram

The decision engine follows a structured weighted scoring model.

```mermaid
flowchart TD
    A[User Defines Options] --> B[User Defines Criteria]
    B --> C[Assign Weight to Each Criterion]
    C --> D[Rate Each Option per Criterion]
    D --> E[Calculate Weighted Score]
    E --> F[Normalize Score (0–10)]
    F --> G[Rank Options]
    G --> H[Return Best Option + Score Breakdown]

    E --> I[Formula: Σ (rating × weight)]
---

## 13. Edge Cases Considered

- No books provided
- No criteria provided
- Missing ratings
- Zero total weight
- Ratings outside allowed range
- Negative weights

All are validated before score calculation.

---

## 14. What I Would Improve With More Time

- Add decision history persistence
- Add visualization (bar charts)
- Add explanation breakdown per book
- Add export functionality
- Add mobile UI refinement
- Potentially experiment with soft-computing inspired adaptive weighting (future work)

---

## 15. Reflection

The most important shift was moving from:
Artificial heuristic scoring → Fully user-driven weighted evaluation.

The inspiration from Genetic Algorithms shaped the thinking,
but the final implementation became intentionally simpler,
clearer, and more aligned with the purpose of a Decision Companion.

The system reflects iterative refinement, architectural decision-making,
and deliberate design trade-offs rather than feature accumulation.