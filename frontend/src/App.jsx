import React, { useState } from "react";
import { evaluateBooks } from "./api";

function App() {
  const [booksInput, setBooksInput] = useState("");
  const [readability, setReadability] = useState(5);
  const [depth, setDepth] = useState(5);
  const [popularity, setPopularity] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const books = booksInput
      .split(",")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    if (books.length === 0) {
      setError("Please enter at least one book name.");
      return;
    }

    const weights = {
      readability: Number(readability),
      depth: Number(depth),
      popularity: Number(popularity),
    };

    setLoading(true);
    setResults([]);

    try {
      const data = await evaluateBooks(books, weights);
      setResults(data.ranked_books || []);
    } catch (err) {
      setError(err.message || "Something went wrong while evaluating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <div className="card">
        <header className="card-header">
          <h1>Book Decision Companion</h1>
          <p className="subtitle">
            Compare multiple books using weighted decision criteria.
          </p>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="books">
              Book options
              <span className="label-hint"> (comma separated)</span>
            </label>
            <input
              id="books"
              type="text"
              placeholder="Example: Deep Work, Atomic Habits, Thinking Fast and Slow"
              value={booksInput}
              onChange={(e) => setBooksInput(e.target.value)}
            />
          </div>

          <div className="weights-grid">
            <div className="form-group">
              <label htmlFor="readability">
                Readability weight
                <span className="label-hint"> (0–10)</span>
              </label>
              <input
                id="readability"
                type="range"
                min="0"
                max="10"
                step="1"
                value={readability}
                onChange={(e) => setReadability(e.target.value)}
              />
              <div className="range-value">{readability}</div>
            </div>

            <div className="form-group">
              <label htmlFor="depth">
                Depth weight
                <span className="label-hint"> (0–10)</span>
              </label>
              <input
                id="depth"
                type="range"
                min="0"
                max="10"
                step="1"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
              />
              <div className="range-value">{depth}</div>
            </div>

            <div className="form-group">
              <label htmlFor="popularity">
                Popularity weight
                <span className="label-hint"> (0–10)</span>
              </label>
              <input
                id="popularity"
                type="range"
                min="0"
                max="10"
                step="1"
                value={popularity}
                onChange={(e) => setPopularity(e.target.value)}
              />
              <div className="range-value">{popularity}</div>
            </div>
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? "Evaluating..." : "Evaluate books"}
          </button>
        </form>

        {error && <div className="alert alert-error">{error}</div>}

        {loading && (
          <div className="status-text">Contacting decision engine...</div>
        )}

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
                    <td>{book.score.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;

