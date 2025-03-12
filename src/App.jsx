import { useState } from "react";
import PuzzleBoard from "./PuzzleBoard";

function App() {
  const [difficulty, setDifficulty] = useState("medio");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Juego de Rompecabezas</h1>

      {/* Selector de dificultad */}
      <label style={styles.label}>Selecciona la dificultad:</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={styles.select}>
        <option value="facil">Fácil</option>
        <option value="medio">Medio</option>
        <option value="dificil">Difícil</option>
      </select>

      {/* Componente del rompecabezas */}
      <PuzzleBoard difficulty={difficulty} />
    </div>
  );
}

// Estilos en objeto
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#1E1E1E",
    color: "#FFF",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  label: {
    fontSize: "1.2rem",
    marginRight: "10px",
  },
  select: {
    padding: "8px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  },
};

export default App;
