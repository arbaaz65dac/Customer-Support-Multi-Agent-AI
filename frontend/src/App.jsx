import { useEffect, useState } from "react";
import { getHealth } from "./services/api";
import "./App.css";

function App() {
  const [status, setStatus] = useState("checking");
  const [envLabel, setEnvLabel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    getHealth({ signal: controller.signal })
      .then((data) => {
        if (cancelled) {
          return;
        }
        setEnvLabel(data.env === "development" ? "dev" : data.env);
        setStatus("healthy");
      })
      .catch((error) => {
        if (cancelled || error.name === "AbortError") {
          return;
        }
        setErrorMessage(
          "Could not reach the backend. Confirm the API is running and try again.",
        );
        setStatus("error");
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  let message = "Checking...";
  if (status === "healthy") {
    message = `Backend healthy (env: ${envLabel})`;
  } else if (status === "error") {
    message = errorMessage;
  }

  return (
    <main className="app">
      <h1>Customer Support</h1>
      <p className={`status status--${status}`} role="status">
        {message}
      </p>
    </main>
  );
}

export default App
