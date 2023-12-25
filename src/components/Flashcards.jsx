import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuRotate3D } from "react-icons/lu";
import API from "../constants.js";

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [showFrontMap, setShowFrontMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getFlashcards = async () => {
        const response = await fetch(API);
        const data = await response.json();
        setFlashcards(data[0]);
        // Inicializa el estado para cada tarjeta
        const initialShowFrontMap = {};
        data[0].forEach((flashcard) => {
          initialShowFrontMap[flashcard.id] = true;
        });
        setShowFrontMap(initialShowFrontMap);
      };
      getFlashcards();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCardClick = (flashcardId) => {
    // Voltea el estado de la tarjeta específica al hacer clic
    setShowFrontMap((prevShowFrontMap) => ({
      ...prevShowFrontMap,
      [flashcardId]: !prevShowFrontMap[flashcardId],
    }));
  };

  const handleDelete = async (flashcardToDelete) => {
    try {
      console.log(flashcardToDelete);
      await fetch(API + "/" + flashcardToDelete, {
        method: "DELETE",
      });
      setFlashcards(
        flashcards.filter((flashcard) => flashcard.id !== flashcardToDelete)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-5xl font-bold my-4 text-primary">Flashcards</h1>
      <button className="input" onClick={() => navigate("/newCard")}>
        Crear flashcard
      </button>
      <div className="flex flex-col lg:grid lg:grid-cols-2 items-center">
        {flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className="flex flex-col md:flex-row m-4 bg-textbg rounded-md p-3 max-w-2xl hover:border-primary hover:border-4 hover:border-solid transition-all ease-in-out"
            onClick={() => handleCardClick(flashcard.id)}
          >
            {showFrontMap[flashcard.id] ? (
              <div className="w-32 flex flex-col items-center justify-center text-center gap-3 font-bold text-[#64748b]">
                <p className="mx-auto">{flashcard.back}</p>
                <LuRotate3D className="text-3xl" />
              </div>
            ) : (
              <div>
                <div>
                  <h1 className="text-3xl font-bold text-primary">
                    {flashcard.title}
                  </h1>
                  <h2 className="text-[#64748b] font-bold">
                    {flashcard.subject}
                  </h2>
                </div>
                <div className="max-w-md p-2 text-[#7c6a76]">
                  <p>{flashcard.info}</p>
                </div>
                <div className="mx-auto flex justify-center gap-4 w-24">
                  <button
                    className="inputButton"
                    onClick={() => handleDelete(flashcard.id)}
                  >
                    Eliminar
                  </button>
                  {/* <button className="inputButton">Actualizar</button> */}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Flashcards;
