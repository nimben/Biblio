from typing import Dict, List


def compute_book_scores(books: List[str], weights: Dict[str, float]) -> List[Dict[str, float]]:
    """
    Compute a deterministic weighted score for each book.

    The current implementation derives simple heuristic metrics from the title
    (length, word count, vowel density) so that different titles yield different
    scores even without per-book ratings. Weights control the relative
    importance of each metric.
    """
    readability_weight = float(weights.get("readability", 0.0))
    depth_weight = float(weights.get("depth", 0.0))
    popularity_weight = float(weights.get("popularity", 0.0))

    total_weight = readability_weight + depth_weight + popularity_weight
    if total_weight <= 0:
        # Fall back to equal weighting if everything is zero or negative
        readability_weight = depth_weight = popularity_weight = 1.0
        total_weight = 3.0

    rw = readability_weight / total_weight
    dw = depth_weight / total_weight
    pw = popularity_weight / total_weight

    ranked: List[Dict[str, float]] = []

    for raw_name in books:
        name = raw_name.strip()
        if not name:
            continue

        length = len(name)
        word_count = len(name.split())
        vowels = sum(1 for c in name.lower() if c in "aeiou")

        # Derive simple metrics in [0.2, 1.0] to avoid extremes
        readability_base = max(0.2, min(1.0, 1.5 - length / 40.0))
        depth_base = max(0.2, min(1.0, 0.3 + word_count / 10.0))
        popularity_base = max(0.2, min(1.0, 0.3 + vowels / max(3.0, float(length) or 1.0)))

        score = (readability_base * rw + depth_base * dw + popularity_base * pw) * 100.0

        ranked.append({"name": name, "score": score})

    ranked.sort(key=lambda item: item["score"], reverse=True)
    return ranked

