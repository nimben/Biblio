from typing import Dict, List


def compute_ranked_books(
    books: List[Dict],
    weights: Dict[str, float],
) -> List[Dict]:
    """
    Compute weighted score for each book and return list sorted by score descending.
    Scores are normalized to a 0–10 scale.
    """

    ranked = []

    # Maximum possible score (all ratings = 10)
    max_possible = sum(10 * weight for weight in weights.values())

    for book in books:
        name = book["name"]
        ratings = book["ratings"]

        raw_score = sum(
            ratings[criterion] * weight
            for criterion, weight in weights.items()
        )

        # Normalize to 0–10
        normalized_score = (raw_score / max_possible) * 10

        ranked.append({
            "name": name,
            "score": round(normalized_score, 2)
        })

    ranked.sort(key=lambda x: x["score"], reverse=True)
    return ranked