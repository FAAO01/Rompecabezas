import React, { useState, useEffect, useCallback } from "react";

const PuzzleGame = ({ imageUrl }) => {
  const [pieces, setPieces] = useState([]);
  const [gridSize, setGridSize] = useState(3);
  const [containerSize, setContainerSize] = useState(300);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState("Medio");
  const [draggedPiece, setDraggedPiece] = useState(null);

  const difficulties = { "Fácil": 3, "Medio": 4, "Difícil": 5, "Experto": 7, "Maestro": 8 };
  const completionMessages = {
    "Fácil": "¡Bien hecho! Has completado el rompecabezas con facilidad. 🎉",
    "Medio": "¡Excelente trabajo! Se notan tus habilidades. 🚀",
    "Difícil": "¡Impresionante! Has resuelto un rompecabezas complicado. 💪",
    "Experto": "¡Wow! Esto no era para cualquiera y lo lograste. 🧠🔥",
    "Maestro": "¡Eres una leyenda del rompecabezas! 🎖️👑",
  };

  useEffect(() => {
    if (imageUrl) {
      generatePuzzle();
      setIsComplete(false);
    }
  }, [imageUrl, gridSize]);

  useEffect(() => {
    const updateSize = () => setContainerSize(Math.min(window.innerWidth * 0.9, 500));
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const generatePuzzle = useCallback(() => {
    let newPieces = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        newPieces.push({ id: `${row}-${col}`, row, col });
      }
    }
    setPieces(shuffleUntilValid(newPieces));
  }, [gridSize]);

  const shuffleUntilValid = useCallback((array) => {
    let shuffled;
    do shuffled = [...array].sort(() => Math.random() - 0.5);
    while (isPuzzleSolved(shuffled));
    return shuffled;
  }, [gridSize]);

  const handleDragStart = useCallback((event, piece) => {
    setDraggedPiece(piece);
    event.dataTransfer && event.dataTransfer.setData("pieceId", piece.id);
  }, []);

  const handleDrop = useCallback((event, targetPiece) => {
    event.preventDefault();
    swapPieces(draggedPiece, targetPiece);
  }, [draggedPiece]);

  const handleTouchStart = useCallback((piece) => {
    setDraggedPiece(piece);
  }, []);

  const handleTouchEnd = useCallback((targetPiece) => {
    swapPieces(draggedPiece, targetPiece);
  }, [draggedPiece]);

  const swapPieces = useCallback((pieceA, pieceB) => {
    if (pieceA && pieceB && pieceA.id !== pieceB.id) {
      setPieces((prev) => {
        const newPieces = [...prev];
        const indexA = newPieces.findIndex((p) => p.id === pieceA.id);
        const indexB = newPieces.findIndex((p) => p.id === pieceB.id);
        [newPieces[indexA], newPieces[indexB]] = [newPieces[indexB], newPieces[indexA]];
        if (isPuzzleSolved(newPieces)) setIsComplete(true);
        return newPieces;
      });
    }
  }, [gridSize]);

  const isPuzzleSolved = useCallback((piecesArray) => {
    return piecesArray.every((p, i) => p.id === `${Math.floor(i / gridSize)}-${i % gridSize}`);
  }, [gridSize]);

  return (
    <div style={{
      textAlign: "center",
      padding: "20px",
      maxWidth: "100vw",
      overflowX: "hidden"
    }}>
      <h3>Manten presionado y arrastra :) </h3>
      <h3>Selecciona la dificultad</h3>
      <select
        onChange={(e) => {
          setGridSize(difficulties[e.target.value]);
          setDifficulty(e.target.value);
        }}
        style={{ padding: "5px", fontSize: "16px" }}
      >
        {Object.keys(difficulties).map((level) =>
          <option key={level} value={level}>{level}</option>
        )}
      </select>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "100%",
        marginTop: "20px",
        overflowX: "hidden"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gap: "2px",
          border: "2px solid black",
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          maxWidth: "90vw",
          maxHeight: "90vw",
          position: "relative",
          overflow: "hidden"
        }}>
          {pieces.map((piece) => (
            <div
              key={piece.id}
              draggable
              onDragStart={(event) => handleDragStart(event, piece)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, piece)}
              onTouchStart={() => handleTouchStart(piece)}
              onTouchEnd={() => handleTouchEnd(piece)}
              style={{
                width: "102%",
                height: "102%",
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                backgroundPosition: `${(piece.col / (gridSize - 1)) * 100}% ${(piece.row / (gridSize - 1)) * 100}%`,
                border: "1px solid black",
                cursor: "grab"
              }}
            ></div>
          ))}
        </div>
      </div>

      {isComplete && <div style={{
        marginTop: "20px",
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        fontSize: "18px",
        borderRadius: "10px",
        display: "inline-block"
      }}>
        {completionMessages[difficulty]}
      </div>}
    </div>
  );
};

export default PuzzleGame;