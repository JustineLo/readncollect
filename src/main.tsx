import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AppState from "./state/AppState";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppState.Provider>
      <App />
    </AppState.Provider>
  </React.StrictMode>
);
