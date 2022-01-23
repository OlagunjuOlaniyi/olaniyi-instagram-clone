import React from "react";
import Home from "./Home";
import ImageUpload from "./components/ImageUpload";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostComponent from "./components/PostComponent";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="upload" element={<ImageUpload />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
