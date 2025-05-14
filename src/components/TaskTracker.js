import React, { useState, useEffect } from 'react';

const TaskTracker = () => {
  const [taskStatus, setTaskStatus] = useState({
    // Funcionalidades de autenticación
    login: true,
    userAdmin: true,
    passwordManagement: true,
    
    // Base de datos
    sqlConnection: true,
    crudOperations: true,
    
    // Interfaz principal
    interfaceDesign: true,
    responsiveDesign: true,
    adminDropdown: true,
    fishAnimations: true,
    frontendImprovements: false, // Esta tarea está pendiente
    
    // Funcionalidades de equipos
    equipmentListing: true,
    addEquipment: true,
    editEquipment: true,
    deleteEquipment: true,
    searchEquipment: true,
    
    // Reportes
    excelExport: true,
    completeReport: true,
    
    // Funcionalidades adicionales
    historyView: true,
    filteringOptions: false,
    userRoles: false,
    dataBackup: false,
    
    // Optimizaciones
    performanceOptimization: false,
    securityEnhancements: false,
    advancedReports: false,
    
    // Validaciones
    inputValidation: true,
    errorHandling: false,
    dataIntegrity: false,
  });

  // Stats corregidos (para ajustar el conteo)
  const stats = {
    completedTasks: 17,
    totalTasks: 26, // Total de 17 + 9 = 26
    pendingTasks: 9,
    completionPercentage: Math.round((17 / 26) * 100)
  };
  
  // Avances recientes
  const recentUpdates = [
    { date: "14-may-2025", update: "Corrección de ciertos errores" },
    { date: "14-may-2025", update: "Corrección del problema con el menú desplegable de Administrador" },
    { date: "14-may-2025", update: "Mejora en la exportación de reportes a Excel" },
    { date: "13-may-2025", update: "Implementación de validación de datos" },
    { date: "13-may-2025", update: "Ajustes en el funcionamiento del sistema" },
    { date: "12-may-2025", update: "Finalización de la vista de historial (con base de datos)" },
  ];

  // Categorías para agrupar tareas
  const categories = [
    { title: "Autenticación y Usuarios", items: ['login', 'userAdmin', 'passwordManagement', 'userRoles'] },
    { title: "Base de Datos", items: ['sqlConnection', 'crudOperations', 'dataBackup', 'dataIntegrity'] },
    { title: "Interfaz de Usuario", items: ['interfaceDesign', 'responsiveDesign', 'adminDropdown', 'fishAnimations', 'frontendImprovements'] },
    { title: "Gestión de Equipos", items: ['equipmentListing', 'addEquipment', 'editEquipment', 'deleteEquipment', 'searchEquipment', 'filteringOptions'] },
    { title: "Reportes", items: ['excelExport', 'completeReport', 'historyView', 'advancedReports'] },
    { title: "Optimización y Seguridad", items: ['performanceOptimization', 'securityEnhancements', 'errorHandling'] }
  ];

  // Mapeo de claves a nombres legibles
  const taskNames = {
    login: "Acceso a cuenta (Login)",
    userAdmin: "Administración de usuarios",
    passwordManagement: "Cambio de contraseña",
    userRoles: "Roles de usuario",
    sqlConnection: "Conexión a SQL Server",
    crudOperations: "Operaciones CRUD",
    dataBackup: "Respaldo de datos",
    dataIntegrity: "Integridad de datos",
    interfaceDesign: "Diseño de interfaz",
    responsiveDesign: "Diseño responsivo",
    adminDropdown: "Menú desplegable de Administrador",
    fishAnimations: "Animaciones de peces",
    frontendImprovements: "Mejoras en el frontend",
    equipmentListing: "Listado de equipos",
    addEquipment: "Agregar equipos",
    editEquipment: "Editar equipos",
    deleteEquipment: "Eliminar equipos",
    searchEquipment: "Búsqueda de equipos",
    filteringOptions: "Filtrado avanzado",
    excelExport: "Exportar a Excel",
    completeReport: "Reporte completo",
    historyView: "Vista de historial",
    advancedReports: "Reportes avanzados",
    performanceOptimization: "Optimización de rendimiento",
    securityEnhancements: "Mejoras de seguridad",
    errorHandling: "Manejo avanzado de errores"
  };

  // Lista de campos implementados
  const implementedFields = [
    { field: "Fecha Ingreso", type: "Date" },
    { field: "Nombre Equipo", type: "Text" },
    { field: "Nombre Usuario", type: "Text" },
    { field: "Cuenta Dominio", type: "Text" },
    { field: "Correo Electrónico", type: "Email" },
    { field: "Producto", type: "Select" },
    { field: "Serie", type: "Text" },
    { field: "Modelo", type: "Text" },
    { field: "Marca", type: "Text" },
    { field: "IMEI", type: "Text" },
    { field: "Procesador", type: "Select" },
    { field: "Disco Duro", type: "Select" },
    { field: "Memoria", type: "Select" },
    { field: "Sistema Operativo", type: "Select" },
    { field: "Número AF", type: "Text" },
    { field: "Estado", type: "Select" },
    { field: "Observación", type: "TextArea" }
  ];

  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-xl shadow-lg">
      {/* Encabezado con animación de fadeIn */}
      <div className="mb-8 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-2 text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Progreso del Proyecto
        </h2>
        <p className="text-gray-600">Actualizado el 14 de mayo de 2025</p>
      </div>
      
      {/* Barra de progreso principal con animación */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow border border-gray-100 animate-slideInFromLeft">
        <div className="flex justify-between mb-2 items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-gray-700">Progreso general:</span>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
            {stats.completionPercentage}% Completado
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-700 h-5 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2 text-xs font-bold text-white" 
            style={{ width: `${stats.completionPercentage}%` }}
          >
            {stats.completionPercentage > 10 ? `${stats.completionPercentage}%` : ''}
          </div>
        </div>
      </div>
      
      {/* Estadísticas con animación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slideInFromRight">
        <div className="bg-white p-5 rounded-xl border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 font-semibold text-sm uppercase">Tareas Completadas</p>
              <p className="text-3xl font-bold text-green-700 mt-1">{stats.completedTasks}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border-l-4 border-red-500 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 font-semibold text-sm uppercase">Tareas Pendientes</p>
              <p className="text-3xl font-bold text-red-700 mt-1">{stats.pendingTasks}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase">Campos Implementados</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">17/17</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Avances recientes con efectos de hover */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow border border-gray-100 animate-fadeIn">
        <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5zm0 10a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" clipRule="evenodd" />
          </svg>
          Avances Recientes
        </h3>
        <div className="space-y-3">
          {recentUpdates.map((update, index) => (
            <div key={index} className="flex transition-all duration-200 hover:bg-blue-50 p-2 rounded-lg">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap mr-4 shadow-sm">
                {update.date}
              </div>
              <div className="text-gray-700">{update.update}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Categorías de tareas con diseño mejorado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {categories.map((category, categoryIndex) => (
          <div 
            key={categoryIndex} 
            className="border rounded-xl p-5 bg-white shadow hover:shadow-md transition-shadow animate-fadeIn"
            style={{ animationDelay: `${categoryIndex * 0.1}s` }}
          >
            <h3 className="text-lg font-bold mb-4 text-blue-700 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              {category.title}
            </h3>
            <ul className="space-y-2.5">
              {category.items.map((taskKey, taskIndex) => (
                <li key={taskIndex} className="flex items-center transition-all duration-200 hover:bg-gray-50 p-1.5 rounded">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${taskStatus[taskKey] ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-sm' : 'bg-gradient-to-r from-red-400 to-red-600 text-white shadow-sm'}`}>
                    {taskStatus[taskKey] ? '✓' : '✗'}
                  </span>
                  <span className={`${taskStatus[taskKey] ? 'text-gray-800' : 'text-gray-600'}`}>
                    {taskNames[taskKey]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Tabla de campos con diseño mejorado */}
      <div className="mt-6 p-6 bg-white rounded-xl shadow border border-gray-100 animate-slideInFromBottom">
        <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center border-b pb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
          </svg>
          Campos del Inventario
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800">
                <th className="py-3 px-4 text-left font-semibold">Campo</th>
                <th className="py-3 px-4 text-left font-semibold">Tipo</th>
                <th className="py-3 px-4 text-left font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {implementedFields.map((field, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors`}>
                  <td className="py-3 px-4 border-b border-gray-100 font-medium">{field.field}</td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      field.type === 'Select' ? 'bg-purple-100 text-purple-800' : 
                      field.type === 'Date' ? 'bg-yellow-100 text-yellow-800' : 
                      field.type === 'TextArea' ? 'bg-indigo-100 text-indigo-800' : 
                      field.type === 'Email' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {field.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 text-green-600 font-semibold">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Implementado
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Añadir animaciones personalizadas
const styles = document.createElement('style');
styles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideInFromLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInFromRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInFromBottom {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }
  .animate-slideInFromLeft {
    animation: slideInFromLeft 0.8s ease-out forwards;
  }
  .animate-slideInFromRight {
    animation: slideInFromRight 0.8s ease-out forwards;
  }
  .animate-slideInFromBottom {
    animation: slideInFromBottom 0.8s ease-out forwards;
  }
`;
document.head.appendChild(styles);

export default TaskTracker;