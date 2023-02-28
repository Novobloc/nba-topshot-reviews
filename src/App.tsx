import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MareketPlace from "./pages/MareketPlace";
import ViewNft from "./pages/ViewNft";

import Header from "./layouts/Header";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market-place" element={<MareketPlace />} />
          <Route path="/market-place/view/:id" element={<ViewNft />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
