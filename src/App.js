import React from 'react';
import TaskTracker from './components/TaskTracker';

function App() {
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
      
      <TaskTracker />
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2025 Proyecto Sistema de Inventario</p>
        <p className="mt-1">Desarrollado para Primar</p>
      </footer>
    </div>
  );
}

export default App;