import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PuzzleBoard = ({ difficulty }) => {
  // Configuraciones de dificultad
  const difficulties = {
    facil: { rows: 4, cols: 4 },
    medio: { rows: 5, cols: 5 },
    dificil: { rows: 6, cols: 6 },
  };

  const { rows, cols } = difficulties[difficulty] || difficulties.medio;
  const pieceSize = window.innerWidth < 600 ? 50 : 100;

  const images = [
    "../public/atardecer.jpg",
    "../public/flor.jpg",
    "../public/gato.jpg",
    "../public/paisaje.jpg",
    "../public/playa.jpg",
    "../public/playa2.jpg",
    "../public/poke.jpg",
    "../public/poke2.jpg",
    "../public/poke3.jpg",
    "../public/poke4.jpg", 
    "../public/one.jpg",
    "../public/goku.jpg",
    "../public/goku2.jpg",
    "../public/goku3.jpg",
    "../public/aca.jpg",  
    "../public/aca2.jpg",
    "../public/aca3.jpg",
    "../public/naru.jpg",
    "../public/naru2.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    setPieces(generatePuzzlePieces(rows, cols));
  }, [difficulty, selectedImage]);

  // Generar piezas del rompecabezas
  const generatePuzzlePieces = (rows, cols) => {
    const piecesArray = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let pieceType = "";

        if (row === 0 && col === 0) {
          pieceType = "esquina-superior-izquierda";
        } else if (row === 0 && col === cols - 1) {
          pieceType = "esquina-superior-derecha";
        } else if (row === rows - 1 && col === 0) {
          pieceType = "esquina-inferior-izquierda";
        } else if (row === rows - 1 && col === cols - 1) {
          pieceType = "esquina-inferior-derecha";
        } else if (row === 0) {
          pieceType = "borde-superior";
        } else if (row === rows - 1) {
          pieceType = "borde-inferior";
        } else if (col === 0) {
          pieceType = "borde-izquierdo";
        } else if (col === cols - 1) {
          pieceType = "borde-derecho";
        } else {
          pieceType = "interior";
        }

        piecesArray.push({
          id: `${row}-${col}`,
          row,
          col,
          correctIndex: row * cols + col,
          currentIndex: row * cols + col,
          isCorrect: false,
          type: pieceType,
        });
      }
    }
    return piecesArray.sort(() => Math.random() - 0.5);
  };

  // Manejo del arrastre y soltado de las piezas
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("pieceIndex", index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("pieceIndex");
    if (dragIndex === "") return;

    const newPieces = [...pieces];
    [newPieces[dragIndex], newPieces[dropIndex]] = [
      newPieces[dropIndex],
      newPieces[dragIndex],
    ];

    newPieces.forEach((piece, idx) => {
      piece.currentIndex = idx;
      piece.isCorrect = piece.correctIndex === idx;
    });

    setPieces(newPieces);

    const isPuzzleComplete = newPieces.every((piece) => piece.isCorrect);

    if (isPuzzleComplete) {
      setTimeout(() => {
        alert(getCompletionMessage(difficulty));
      }, 300);
    }
  };

  const getCompletionMessage = (difficulty) => {
    const messages = {
      facil: "¡Felicidades! Has completado el nivel fácil.",
      medio: "¡Bien hecho! Terminaste el nivel medio.",
      dificil: "¡Increíble! Superaste el nivel difícil.",
    };
    return messages[difficulty] || "¡Felicidades! Has completado el rompecabezas.";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={styles.container}>
      <div style={styles.previewContainer}>
        <h3>Selecciona una imagen</h3>
        <div style={styles.carouselContainer}>
          <Carousel showThumbs={false} showStatus={false}>
            {images.map((img, index) => (
              <div key={index} onClick={() => setSelectedImage(img)}>
                <img src={img} alt={`Opción ${index + 1}`} style={styles.carouselImage} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div style={styles.selectionContainer}>

        {/* Aquí agregarías los controles de selección de dificultad */}
      </div>

      <div style={styles.puzzleContainer(rows, cols, pieceSize)}>
        {pieces.map((piece, index) => (
          <div
            key={piece.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            style={{
              ...styles.piece(piece.type),
              width: `${pieceSize}px`,
              height: `${pieceSize}px`,
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: `${pieceSize * cols}px ${pieceSize * rows}px`,
              backgroundPosition: `-${piece.col * pieceSize}px -${piece.row * pieceSize}px`,
              border: pieces.every((p) => p.isCorrect) ? "none" : "1px solid white",
              cursor: "grab",
              transition: "box-shadow 0.3s ease-in-out",
              boxShadow: piece.isCorrect
                ? pieces.every((p) => p.isCorrect)
                  ? "0 0 8px 4px rgba(255, 215, 0, 0.5)"
                  : "0 0 5px 3px rgba(255, 215, 0, 0.7)"
                : "none",
            }}
          />
        ))}
      </div>

      <div style={styles.footer}>
        <p>&copy; 2025 Felipe. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: "10px",
  },
  previewContainer: {
    textAlign: "center",
    marginBottom: "20px",
    width: "100%",
  },
  carouselContainer: {
    maxWidth: "400px",
    margin: "0 auto 10px",
  },
  carouselImage: {
    maxWidth: "200px",
    maxHeight: "150px",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    cursor: "pointer",
  },
  selectionContainer: {
    textAlign: "center",
    marginBottom: "20px",
    width: "100%",
  },
  puzzleContainer: (rows, cols, pieceSize) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${pieceSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${pieceSize}px)`,
    gap: "2px",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "100%",
    maxWidth: `${pieceSize * cols}px`,
  }),
  piece: (type) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(/images/puzzle-piece-${type}.png)`,
    backgroundSize: "cover",
  }),
  footer: {
    marginTop: "20px",
    textAlign: "center",
    width: "100%",
  },
};

export default PuzzleBoard;
