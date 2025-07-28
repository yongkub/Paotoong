import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { RefetchContextProvider } from "./context/RefetchContext.tsx";
import { AlertContextProvider } from "./context/AlertContext.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertContextProvider>
      <AuthContextProvider>
        <RefetchContextProvider>
          <App />
        </RefetchContextProvider>
      </AuthContextProvider>
    </AlertContextProvider>
  </StrictMode>
);
