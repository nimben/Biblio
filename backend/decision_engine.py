"""
Weighted decision matrix: no heuristics, no synthetic scoring.

For each book:
  score = Σ (rating[criterion] × weight[criterion])
over all criteria. Results are sorted descending by score.
"""

from typing import Dict, List


def compute_ranked_books(
    books: List[Dict],
    weights: Dict[str, float],
) -> List[Dict]:
    """
    Compute weighted score for each book and return list sorted by score descending.

    Each book must have 'name' and 'ratings' (dict criterion -> 0–10).
    weights: criterion name -> positive weight.
    """
    ranked = []
    for book in books:
        name = book["name"]
        ratings = book["ratings"]
        score = 0.0
        for criterion, weight in weights.items():
            score += ratings[criterion] * weight
        ranked.append({"name": name, "score": round(score, 2)})
    ranked.sort(key=lambda x: x["score"], reverse=True)
    return ranked
