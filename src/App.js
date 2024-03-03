import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/Home/Home";
import FormView from "./components/FormView/FormView";
import FormUpdate from "./components/FormUpdate/FormUpdate";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/viewData/:_id" element={<FormView />}></Route>
          <Route path="/formUpdate/:_id" element={<FormUpdate />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
