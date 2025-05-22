import React, { useState, useEffect } from 'react';
import TaskTracker from './components/TaskTracker';

// URL base del servidor
const SERVER_URL = 'http://localhost:3001';

function App() {
  const [imgName, setImgName] = useState('login.png');
  const [showImg, setShowImg] = useState(true);

  // Función para saber si es imagen o video
  const isVideo = (filename) => {
    return /\.(mp4|webm|ogg)$/i.test(filename);
  };

  // Si el usuario cambia el input, ocultar la imagen hasta que envíe el formulario
  useEffect(() => {
    setShowImg(false);
  }, [imgName]);

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900">
          Sistema de Inventario de Equipos
        </h1>
        <p className="text-gray-600 mt-2">
          Reporte de Progreso y Estado del Desarrollo
        </p>
      </header>

      {/* Formulario para mostrar imagen o video desde /uploads */}
      <div className="mb-8 flex flex-col items-center">
        <form
          onSubmit={e => {
            e.preventDefault();
            setShowImg(true);
          }}
          className="flex flex-col items-center gap-2"
        >
          <label className="font-medium text-gray-700">Nombre del archivo (ej: foto1.jpg o video1.mp4):</label>
          <input
            type="text"
            value={imgName}
            onChange={e => setImgName(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="foto1.jpg o video1.mp4"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded mt-2">Ver archivo</button>
        </form>
        {showImg && imgName && (
          isVideo(imgName) ? (
            <video
              src={`${SERVER_URL}/uploads/${imgName}`}
              controls
              className="mt-4 max-h-64 border rounded shadow"
              onError={e => { e.target.poster = 'https://via.placeholder.com/300x200?text=No+encontrado'; }}
            >
              Tu navegador no soporta el video.
            </video>
          ) : (
            <img
              src={`${SERVER_URL}/uploads/${imgName}`}
              alt="Imagen subida"
              className="mt-4 max-h-64 border rounded shadow"
              onError={e => { e.target.src = 'https://via.placeholder.com/300x200?text=No+encontrada'; }}
            />
          )
        )}
      </div>

      <TaskTracker />
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2025 Proyecto Sistema de Inventario</p>
        <p className="mt-1">Desarrollado para Primar</p>
      </footer>
    </div>
  );
}

export default App;