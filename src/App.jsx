import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Flashcards from "./components/Flashcards";
import CreateForm from "./components/CreateForm";

function App() {
  return (
    <Router>
      <div className="flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Flashcards />} />
          <Route path="/newCard" element={<CreateForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
