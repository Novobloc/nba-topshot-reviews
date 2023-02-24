import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

/** Layout */
import Header from "./layouts/Header";

/**
 * Todos
 *
 * Integrate Onflow wallet login
 * Build Home page
 * Build Market Place UI
 *
 */

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
