import React, { useState, useCallback } from "react";
import { evaluateBooks } from "./api";

function nextId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const DEFAULT_WEIGHT = 1;
const DEFAULT_RATING = 5;
const MIN_WEIGHT = 0.01;

function App() {
  const [books, setBooks] = useState([
    { id: nextId("book"), name: "" },
    { id: nextId("book"), name: "" },
  ]);
  const [criteria, setCriteria] = useState([
    { id: nextId("crit"), name: "Readability", weight: 3 },
    { id: nextId("crit"), name: "Depth", weight: 5 },
    { id: nextId("crit"), name: "Practicality", weight: 2 },
  ]);
  const [ratings, setRatings] = useState(() => {
    const initial = {};
    books.forEach((b) => {
      initial[b.id] = {};
      criteria.forEach((c) => {
        initial[b.id][c.id] = DEFAULT_RATING;
      });
    });
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const addBook = useCallback(() => {
    const id = nextId("book");
    setBooks((prev) => [...prev, { id, name: "" }]);
    setRatings((prev) => {
      const next = { ...prev };
      next[id] = {};
      criteria.forEach((c) => {
        next[id][c.id] = DEFAULT_RATING;
      });
      return next;
    });
  }, [criteria]);

  const removeBook = useCallback((bookId) => {
    if (books.length <= 1) return;
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    setRatings((prev) => {
      const next = { ...prev };
      delete next[bookId];
      return next;
    });
  }, [books.length]);

  const setBookName = useCallback((bookId, name) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, name } : b))
    );
  }, []);

  const addCriterion = useCallback(() => {
    const id = nextId("crit");
    setCriteria((prev) => [...prev, { id, name: "New criterion", weight: DEFAULT_WEIGHT }]);
    setRatings((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((bookId) => {
        next[bookId] = { ...next[bookId], [id]: DEFAULT_RATING };
      });
      return next;
    });
  }, []);

  const removeCriterion = useCallback((critId) => {
    if (criteria.length <= 1) return;
    setCriteria((prev) => prev.filter((c) => c.id !== critId));
    setRatings((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((bookId) => {
        const copy = { ...next[bookId] };
        delete copy[critId];
        next[bookId] = copy;
      });
      return next;
    });
  }, [criteria.length]);

  const setCriterionName = useCallback((critId, name) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === critId ? { ...c, name } : c))
    );
  }, []);

  const setCriterionWeight = useCallback((critId, weight) => {
    const num = Math.max(MIN_WEIGHT, Number(weight) || 0);
    setCriteria((prev) =>
      prev.map((c) => (c.id === critId ? { ...c, weight: num } : c))
    );
  }, []);

  const setRating = useCallback((bookId, critId, value) => {
    const num = Math.min(10, Math.max(0, Number(value) || 0));
    setRatings((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [critId]: num,
      },
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const bookList = books.filter((b) => b.name.trim());
    if (bookList.length === 0) {
      setError("Add at least one book and enter its name.");
      return;
    }
    const criteriaList = criteria.filter((c) => c.name.trim());
    if (criteriaList.length === 0) {
      setError("Add at least one criterion and enter its name.");
      return;
    }

    const payloadBooks = bookList.map((b) => ({
      name: b.name.trim(),
      ratings: Object.fromEntries(
        criteriaList.map((c) => [c.name.trim(), ratings[b.id]?.[c.id] ?? DEFAULT_RATING])
      ),
    }));
    const payloadWeights = Object.fromEntries(
      criteriaList.map((c) => [c.name.trim(), c.weight])
    );

    setLoading(true);
    setResults([]);
    try {
      const data = await evaluateBooks(payloadBooks, payloadWeights);
      setResults(data.ranked_books || []);
    } catch (err) {
      setError(err.message || "Failed to evaluate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <header className="hero">
        <h1 className="hero-brand">BIBILIO</h1>
        <blockquote className="hero-quote">
          <p className="hero-quote-text">
            &ldquo;If you don&rsquo;t like to read, you haven&rsquo;t found the right book.&rdquo;
          </p>
          <cite className="hero-quote-author">&mdash; J.K. Rowling</cite>
        </blockquote>
      </header>

      <main className="decision-engine-section">
        <div className="card">
          <header className="card-header">
            <h2 className="card-title">Find Your Next Great Read</h2>
            <p className="subtitle">
            Define what matters to you and let BIBILIO help you identify the book that stands out.
            </p>
          </header>

          <form className="form" onSubmit={handleSubmit}>
          <section className="section">
            <div className="section-head">
              <h2>Books</h2>
              <button type="button" className="btn-add" onClick={addBook}>
                + Add book
              </button>
            </div>
            <ul className="book-list">
              {books.map((b) => (
                <li key={b.id} className="book-row">
                  <input
                    type="text"
                    value={b.name}
                    onChange={(e) => setBookName(b.id, e.target.value)}
                    placeholder="Book title"
                    className="input-book"
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeBook(b.id)}
                    disabled={books.length <= 1}
                    title="Remove book"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <div className="section-head">
              <h2>Criteria & weights</h2>
              <button type="button" className="btn-add" onClick={addCriterion}>
                + Add criterion
              </button>
            </div>
            <ul className="criteria-list">
              {criteria.map((c) => (
                <li key={c.id} className="criterion-row">
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => setCriterionName(c.id, e.target.value)}
                    placeholder="Criterion name"
                    className="input-criterion"
                  />
                  <label className="weight-label">
                    Weight
                    <input
                      type="number"
                      min={MIN_WEIGHT}
                      step="any"
                      value={c.weight}
                      onChange={(e) => setCriterionWeight(c.id, e.target.value)}
                      className="input-weight"
                    />
                  </label>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeCriterion(c.id)}
                    disabled={criteria.length <= 1}
                    title="Remove criterion"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h2>Rate each book (0–10)</h2>
            <div className="matrix-wrap">
              <table className="matrix">
                <thead>
                  <tr>
                    <th className="cell-book">Book</th>
                    {criteria.map((c) => (
                      <th key={c.id} className="cell-criterion">
                        {c.name || "(unnamed)"}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {books.map((b) => (
                    <tr key={b.id}>
                      <td className="cell-book">
                        <input
                          type="text"
                          value={b.name}
                          onChange={(e) => setBookName(b.id, e.target.value)}
                          placeholder="Book title"
                          className="input-inline"
                        />
                      </td>
                      {criteria.map((c) => (
                        <td key={c.id} className="cell-rating">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="1"
                            value={ratings[b.id]?.[c.id] ?? ""}
                            onChange={(e) =>
                              setRating(b.id, c.id, e.target.value)
                            }
                            className="input-rating"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <button
            type="submit"
            className="submit-button"
            disabled={loading || books.filter((b) => b.name.trim()).length === 0}
          >
            {loading ? "Evaluating..." : "Evaluate"}
          </button>
        </form>

        {error && <div className="alert alert-error">{error}</div>}
        {loading && <div className="status-text">Computing weighted scores…</div>}

        {results.length > 0 && !loading && (
          <section className="results">
            <h2>Ranked results</h2>
            <table className="results-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((book, index) => (
                  <tr key={`${book.name}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{book.name}</td>
                    <td>{typeof book.score === "number" ? book.score.toFixed(2) : book.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        </div>
      </main>
    </div>
  );
}

export default App;
