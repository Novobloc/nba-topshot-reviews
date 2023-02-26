import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MareketPlace from "./pages/MareketPlace";
import ViewNft from "./pages/ViewNft";
// import ViewNftHistory from "./components/ViewNft/ViewNftHistory";

/** Layout */
import Header from "./layouts/Header";

/**
 * Todos
 *
 * Integrate Onflow wallet login =======> Done
 * Build Home page in 3js or some animation
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
          <Route path="/market-place" element={<MareketPlace />} />
          <Route path="/market-place/view/:id" element={<ViewNft />} />
          {/* <Route path="/market-place/view/:id/history" element={<ViewNftHistory />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
