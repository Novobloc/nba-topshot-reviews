import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Web3ContextProvider } from "./context/Onflow";
import "./index.css";
import { GlobalProvider } from "./context/GlobalContext/GlobalContext";

const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  return (
    <React.StrictMode>
      <Web3ContextProvider>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </Web3ContextProvider>
    </React.StrictMode>
  );
};

root.render(<Index />);
