import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import { GlobalProvider } from "./context/GlobalContext/GlobalContext";

const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  return (
    <React.StrictMode>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </React.StrictMode>
  );
};

root.render(<Index />);
