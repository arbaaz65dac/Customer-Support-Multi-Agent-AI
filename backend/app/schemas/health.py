"""Health-check API schema."""

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = Field(description="Liveness indicator")
    service: str = Field(description="Stable service name")
    env: str = Field(description="Current APP_ENV value")
