import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import TweetsPage from "./pages/TweetsPage/TweetsPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tweets" element={<TweetsPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}
