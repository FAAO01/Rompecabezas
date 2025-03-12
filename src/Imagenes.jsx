import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./Imagenes.css"; // Archivo CSS para estilos

function Imagenes() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            setError(null);
            try {
                const querySnapshot = await getDocs(collection(db, "imagenes"));
                const imagesArray: string[] = [];

                querySnapshot.forEach((doc) => {
                    const imageUrl = doc.data()?.url;
                    if (imageUrl) {
                        imagesArray.push(imageUrl);
                    }
                });

                setImages(imagesArray);
            } catch (err) {
                console.error("Error al cargar imágenes:", err);
                setError("No se pudieron cargar las imágenes. Inténtalo de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="gallery-container">
            {loading && <p>Cargando imágenes...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && images.length === 0 && !error && <p>No hay imágenes disponibles.</p>}

            {images.map((img, index) => (
                <div key={index} className="image-wrapper">
                    <img src={img} alt={`Imagen ${index + 1}`} className="image-item" />
                </div>
            ))}
        </div>
    );
}

export default Imagenes;
