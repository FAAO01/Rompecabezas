import PuzzleBoard from "./PuzzleBoard";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Juego de Rompecabezas</h1>
      <h3>Selecciona la imagen y juega </h3>

      {/* Componente del rompecabezas */}
      <div style={styles.boardContainer}>
        <PuzzleBoard />
      </div>
    </div>
  );
}

// Estilos en objeto
const styles = {
  container: {
    textAlign: "center",
    padding: "5%",
    backgroundColor: "#1E1E1E",
    color: "#FFF",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "clamp(1.5rem, 5vw, 2.5rem)", // Se ajusta según la pantalla
    marginBottom: "20px",
  },
  boardContainer: {
    width: "100%",
    maxWidth: "600px", // Máximo tamaño en pantallas grandes
    display: "flex",
    justifyContent: "center",
  },
};

export default App;
