"""FastAPI application entrypoint."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.schemas.health import HealthResponse

settings = get_settings()

app = FastAPI(title="Customer Support API")

# Browser clients may only talk to us from the known Vite origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    """Liveness probe for the API process."""
    return HealthResponse(
        status="ok",
        service="customer-support-api",
        env=settings.APP_ENV,
    )
