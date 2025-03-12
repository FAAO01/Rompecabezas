import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./Imagenes.css"; // Archivo CSS para estilos

function Imagenes() {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const querySnapshot = await getDocs(collection(db, "imagenes"));
            const imagesArray: string[] = [];
            querySnapshot.forEach((doc) => {
                imagesArray.push(doc.data().url);
            });
            setImages(imagesArray);
        };
        fetchImages();
    }, []);

    return (
        <div className="gallery-container">
            {images.map((img, index) => (
                <div key={index} className="image-wrapper">
                    <img src={img} alt={`Imagen ${index}`} className="image-item" />
                </div>
            ))}
        </div>
    );
}

export default Imagenes;
