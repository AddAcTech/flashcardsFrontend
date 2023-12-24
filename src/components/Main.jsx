import React, { useState, useEffect } from "react";

function Main() {
  const [flashcards, setFlashcards] = useState([]);
  const [showFrontMap, setShowFrontMap] = useState({});

  useEffect(() => {
    try {
      const getFlashcards = async () => {
        const response = await fetch("http://localhost:3000/flashcards");
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

  return (
    <>
      <h1 className="text-5xl font-bold my-4 text-primary">Flashcards</h1>
      <div className="flex flex-col lg:grid lg:grid-cols-2 items-center">
        {flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className="flex flex-col md:flex-row m-4 bg-textbg rounded-md p-3 max-w-2xl hover:border-primary hover:border-4 hover:border-solid transition-all ease-in-out"
            onClick={() => handleCardClick(flashcard.id)}
          >
            {showFrontMap[flashcard.id] ? (
              <div className="w-30 flex flex-col justify-center">
                <p>{flashcard.back}</p>
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
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Odit, dolores ea. Harum neque assumenda nesciunt! Magnam, sit
                  perferendis. Dolorem totam nesciunt, iste non voluptates, quia
                  libero tenetur explicabo ullam blanditiis sunt! Fugit
                  accusantium nemo ea consectetur vero illum molestias, minima
                  voluptatem tenetur blanditiis enim.
                </div>
                <div className="mx-auto flex justify-center gap-4 w-24">
                  <button className="inputButton">Eliminar</button>
                  <button className="inputButton">Actualizar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;
