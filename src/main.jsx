import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAeT9pEh9v0d5XDaPLMMg2I9ouyXHKA8iM",
  authDomain: "authentication-movies.firebaseapp.com",
  projectId: "authentication-movies",
  storageBucket: "authentication-movies.firebasestorage.app",
  messagingSenderId: "393546962588",
  appId: "1:393546962588:web:54647d074991cadf937f59",
};

initializeApp(firebaseConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
