import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PuzzleGame from "./PuzzleGame";

const PuzzleBoard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "imagenes"));
        const imagesArray = querySnapshot.docs.map((doc) => doc.data().url);
        setImages(imagesArray);
      } catch (error) {
        console.error("Error fetching images:", error);
        alert("Error al cargar las imágenes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto", padding: "1rem" }}>
      {isLoading ? (
        <p style={{ textAlign: "center" }}>Cargando imágenes...</p>
      ) : (
        <Carousel showThumbs={false} showStatus={false} dynamicHeight>
          {images.map((img, index) => (
            <div key={index} onClick={() => setSelectedImage(img)}>
              <img
                src={img}
                alt={`Opción ${index + 1}`}
                style={{
                  width: "215px",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}
        </Carousel>
      )}

      {selectedImage && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <h3>Rompecabezas</h3>
          <PuzzleGame imageUrl={selectedImage} />
        </div>
      )}
    </div>
  );
};

export default PuzzleBoard;
