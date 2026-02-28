from typing import List

from pydantic import BaseModel, Field, field_validator


class Weights(BaseModel):
    readability: float = Field(..., ge=0, description="Weight for readability")
    depth: float = Field(..., ge=0, description="Weight for depth or insight")
    popularity: float = Field(..., ge=0, description="Weight for popularity or reach")


class EvaluationRequest(BaseModel):
    books: List[str]
    weights: Weights

    @field_validator("books")
    @classmethod
    def validate_books(cls, value: List[str]) -> List[str]:
        cleaned = [b.strip() for b in value if b and b.strip()]
        if not cleaned:
            raise ValueError("At least one non-empty book name is required.")
        return cleaned


class RankedBook(BaseModel):
    name: str
    score: float


class EvaluationResponse(BaseModel):
    ranked_books: List[RankedBook]

