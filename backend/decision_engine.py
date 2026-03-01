from typing import Dict, List


def compute_ranked_books(
    books: List[Dict],
    weights: Dict[str, float],
) -> List[Dict]:
    """
    Compute a normalized weighted score for each book and return the list
    sorted by score (0–10 scale), including a simple breakdown so it is
    clear why each book received its score.
    """

    ranked: List[Dict] = []

    # Maximum possible score (all ratings = 10)
    max_possible = sum(10 * weight for weight in weights.values())
    if max_possible <= 0:
        # This should not happen because of validation, but keep a guard.
        max_possible = 1.0

    for book in books:
        name = book["name"]
        ratings = book["ratings"]

        breakdown: Dict[str, float] = {}
        normalized_total = 0.0

        for criterion, weight in weights.items():
            rating = ratings[criterion]
            raw_contribution = rating * weight
            normalized_contribution = (raw_contribution / max_possible) * 10.0
            normalized_total += normalized_contribution
            breakdown[criterion] = round(normalized_contribution, 2)

        ranked.append(
            {
                "name": name,
                "score": round(normalized_total, 2),
                "breakdown": breakdown,
            }
        )

    ranked.sort(key=lambda x: x["score"], reverse=True)
    return ranked