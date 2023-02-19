import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Detail from "./screens/Detail";
import Export from "./screens/Export";
import Home from "./screens/Home";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main role="main" className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="detail" element={<Detail />} />
            <Route path="export" element={<Export />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
