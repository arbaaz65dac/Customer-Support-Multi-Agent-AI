from fastapi.testclient import TestClient

from app.config import get_settings
from app.main import app

client = TestClient(app)


def test_health_returns_ok_payload() -> None:
    response = client.get("/health")
    body = response.json()

    assert response.status_code == 200
    assert body == {
        "status": "ok",
        "service": "customer-support-api",
        "env": get_settings().APP_ENV,
    }
