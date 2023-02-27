import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MareketPlace from "./pages/MareketPlace";
import ViewNft from "./pages/ViewNft";
import Loader from "./layouts/Loader";
import { useGlobalContext } from "./context/GlobalContext/GlobalContext";

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

const App: React.FC = () => {
  const { appLoading } = useGlobalContext();
  console.log(appLoading, "appLoading");
  if (appLoading) return <Loader />;

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
