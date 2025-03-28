import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import axios from "axios";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const token = localStorage.getItem("token");
axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// axios.defaults.headers.post['Content-Type'] = 'application/json';
console.log("Token carregado:", token);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);