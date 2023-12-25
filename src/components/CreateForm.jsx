import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../constants.js";
function CreateForm() {
  const [flashcard, setFlashcard] = useState({
    title: "Placeholder title",
    back: "Placeholder back",
    subject: "Placeholder subject",
    info: "Placeholder info",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFlashcard({
      ...flashcard,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      const fetchPost = async () => {
        const response = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flashcard),
        });
        navigate("/");
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      action="card"
      className="p-4 flex flex-col justify-center gap-3 w-4/5 md:w-2/6 text-[#0e0311] h-screen"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="input"
      />
      <input
        type="text"
        name="back"
        placeholder="Back"
        onChange={handleChange}
        className="input"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        onChange={handleChange}
        className="input"
      />
      <input
        type="text"
        name="info"
        placeholder="Info"
        onChange={handleChange}
        className="input"
      />
      <button onClick={handleSubmit} className="input w-32">
        Crear
      </button>
    </form>
  );
}

export default CreateForm;
