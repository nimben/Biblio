from typing import Dict, List

from pydantic import BaseModel, field_validator, model_validator


class BookInput(BaseModel):
    """One book option with its rating per criterion."""
    name: str
    ratings: Dict[str, float]

    @field_validator("ratings")
    @classmethod
    def ratings_in_range(cls, v: Dict[str, float]) -> Dict[str, float]:
        for criterion, value in v.items():
            if not (0 <= value <= 10):
                raise ValueError(
                    f"Rating for '{criterion}' must be between 0 and 10 (got {value})."
                )
        return v


class EvaluationRequest(BaseModel):
    """Request body: books with per-criterion ratings, and criterion weights."""
    books: List[BookInput]
    weights: Dict[str, float]

    @field_validator("weights")
    @classmethod
    def weights_positive(cls, v: Dict[str, float]) -> Dict[str, float]:
        for criterion, w in v.items():
            if w <= 0:
                raise ValueError(
                    f"Weight for '{criterion}' must be positive (got {w})."
                )
        return v

    @model_validator(mode="after")
    def books_have_all_criteria(self):
        if not self.weights:
            raise ValueError("At least one criterion weight is required.")
        if not self.books:
            raise ValueError("At least one book is required.")
        criterion_set = set(self.weights.keys())
        for book in self.books:
            book_keys = set(book.ratings.keys())
            if book_keys != criterion_set:
                missing = criterion_set - book_keys
                extra = book_keys - criterion_set
                if missing:
                    raise ValueError(
                        f"Book '{book.name}' is missing ratings for: {sorted(missing)}."
                    )
                if extra:
                    raise ValueError(
                        f"Book '{book.name}' has unknown criteria: {sorted(extra)}."
                    )
        return self


class RankedBook(BaseModel):
    name: str
    score: float


class EvaluationResponse(BaseModel):
    ranked_books: List[RankedBook]
