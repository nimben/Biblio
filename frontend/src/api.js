const API_URL = import.meta.env.VITE_API_URL;

export async function evaluateBooks(books, weights) {
  if (!API_URL) {
    throw new Error(
      "API URL is not configured. Set VITE_API_URL in your frontend environment."
    );
  }

  const response = await fetch(`${API_URL}/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      books,
      weights,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to evaluate books.");
  }

  return response.json();
}

