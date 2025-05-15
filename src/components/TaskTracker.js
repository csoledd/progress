import React, { useState, useEffect } from 'react';

const ProjectTracker = () => {
  // ---------- SECTION: TASK TRACKER STATE ----------
  const [taskStatus, setTaskStatus] = useState({
    // Funcionalidades de autenticación
    login: true,
    userAdmin: true,
    passwordManagement: false,
    
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
    totalTasks: 25, // Total de 17 + 9 = 26
    pendingTasks: 8,
    completionPercentage: Math.round((17 / 25) * 100)
  };

  // Avances recientes
  const recentUpdates = [
    { date: "14-may-2025", update: "Aplicando mejoras en el Fronted (en proceso)" },
    { date: "14-may-2025", update: "En proceso la corrección de errores en la página (revisando a detalle la causa) " },
    { date: "14-may-2025", update: "Corrección del problema con el menú desplegable de Administrador" },
    { date: "13-may-2025", update: "Mejora en la exportación de reportes a Excel" },
    { date: "13-may-2025", update: "Implementación de validación de datos" },
    { date: "13-may-2025", update: "Ajustes en el funcionamiento del sistema" },
    { date: "12-may-2025", update: "Finalización de la vista de historial (con base de datos)" },
  ];

  // Categorías para agrupar tareas
  const categories = [
    { title: "Autenticación y Usuarios", items: ['login', 'userAdmin', 'passwordManagement'] },
    { title: "Base de Datos", items: ['sqlConnection', 'crudOperations', 'dataBackup', 'dataIntegrity'] },
    { title: "Interfaz de Usuario", items: ['interfaceDesign', 'responsiveDesign', 'adminDropdown', 'fishAnimations', 'frontendImprovements'] },
    { title: "Gestión de Equipos", items: ['equipmentListing', 'addEquipment', 'editEquipment', 'deleteEquipment', 'searchEquipment', 'filteringOptions'] },
    { title: "Reportes", items: ['excelExport', 'completeReport', 'historyView'] },
    { title: "Optimización y Seguridad", items: ['performanceOptimization', 'securityEnhancements', 'errorHandling'] }
  ];


  // Mapeo de claves a nombres legibles
  const taskNames = {
    login: "Acceso a cuenta (Login)",
    userAdmin: "Administración de usuarios",
    passwordManagement: "Cambio de contraseña",
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
    completeReport: "Excel completo con todo tipo de dato.",
    historyView: "Vista de historial",
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

  // ---------- SECTION: EVIDENCE TRACKER STATE ----------
  const [evidences, setEvidences] = useState([
    // Ejemplos de evidencias pre-cargadas
    { 
      id: 1, 
      title: 'Pantalla de login implementada', 
      date: '10-may-2025', 
      image: null, // Será reemplazada por la URL de la imagen cuando se implemente el backend
      description: 'Implementación de la pantalla de acceso con validación de usuarios',
      category: 'Autenticación'
    },
    { 
      id: 2, 
      title: 'Listado de equipos', 
      date: '12-may-2025', 
      image: null,
      description: 'Vista principal con todos los equipos registrados y opciones de búsqueda',
      category: 'Equipos'
    }
  ]);

  // Estado para manejar el formulario de nueva evidencia
  const [newEvidence, setNewEvidence] = useState({
    title: '',
    description: '',
    category: 'Interfaz',
    image: null,
    imagePreview: null
  });

  // Estado para mostrar/ocultar el formulario
  const [showEvidenceForm, setShowEvidenceForm] = useState(false);

  // Estado para la vista de detalle de evidencia
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  // Estado para el filtrado de evidencias
  const [evidenceFilter, setEvidenceFilter] = useState('Todos');

  // Categorías para evidencias
  const evidenceCategories = [
    "Autenticación",
    "Base de Datos",
    "Interfaz",
    "Equipos",
    "Reportes",
    "Optimización",
    "Seguridad",
    "Validaciones",
    "Otro"
  ];

  // ---------- SECTION: EVIDENCE TRACKER FUNCTIONS ----------
  // Función para manejar la carga de imagen
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setNewEvidence({
          ...newEvidence,
          image: selectedImage,
          imagePreview: reader.result
        });
      };
      
      reader.readAsDataURL(selectedImage);
    }
  };

  // Función para manejar cambios en el formulario
  const handleEvidenceChange = (e) => {
    const { name, value } = e.target;
    setNewEvidence({ ...newEvidence, [name]: value });
  };

  // Función para agregar una nueva evidencia
  const handleAddEvidence = (e) => {
    e.preventDefault();
    
    // Crear objeto de nueva evidencia
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${getMonthName(currentDate.getMonth())}-${currentDate.getFullYear()}`;
    
    const newEvidenceItem = {
      id: evidences.length + 1,
      title: newEvidence.title,
      description: newEvidence.description,
      category: newEvidence.category,
      date: formattedDate,
      image: newEvidence.imagePreview, // En una implementación real, aquí subirías la imagen a un servidor
    };
    
    // Actualizar el estado
    setEvidences([newEvidenceItem, ...evidences]);
    
    // Reiniciar el formulario
    setNewEvidence({
      title: '',
      description: '',
      category: 'Interfaz',
      image: null,
      imagePreview: null
    });
    
    // Ocultar el formulario
    setShowEvidenceForm(false);
  };

  // Función auxiliar para obtener el nombre del mes
  const getMonthName = (monthIndex) => {
    const months = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun', 
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ];
    return months[monthIndex];
  };

  // Función para eliminar una evidencia
  const handleDeleteEvidence = (id) => {
    setEvidences(evidences.filter(evidence => evidence.id !== id));
  };

  // Función para mostrar el detalle de una evidencia
  const handleViewEvidence = (evidence) => {
    setSelectedEvidence(evidence);
  };

  // Función para cerrar el detalle de evidencia
  const handleCloseEvidenceDetail = () => {
    setSelectedEvidence(null);
  };

  // Filtrar evidencias según la categoría seleccionada
  const filteredEvidences = evidenceFilter === 'Todos' 
    ? evidences 
    : evidences.filter(evidence => evidence.category === evidenceFilter);

  // ---------- SECTION: MAIN RENDER ----------
  return (
    <div className="p-6 bg-gray-50">
      {/* Título General de la Página */}
      <div className="mb-8 text-center animate-fadeIn">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Sistema de Seguimiento de Proyectos</h1>
        <p className="text-gray-600">Dashboard de progreso y evidencias</p>
      </div>

      {/* Tabs para navegar entre secciones */}
      <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
        <a href="#progreso" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap hover:bg-blue-700 transition-colors">
          Progreso del Proyecto
        </a>
        <a href="#evidencias" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap hover:bg-blue-700 transition-colors">
          Evidencias de Avance
        </a>
        <a href="#campos" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap hover:bg-blue-700 transition-colors">
          Campos Implementados
        </a>
      </div>

      {/* SECCIÓN 1: PROGRESO DEL PROYECTO */}
      <section id="progreso" className="mb-10">
        <div className="flex flex-col bg-white p-6 rounded-xl shadow-lg">
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
        </div>
      </section>

      {/* SECCIÓN 2: EVIDENCIAS DE AVANCE */}
      <section id="evidencias" className="mb-10">
        <div className="mb-8 bg-white p-6 rounded-xl shadow border border-gray-100 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-blue-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Evidencias de Avance
            </h3>
            <button 
              onClick={() => setShowEvidenceForm(!showEvidenceForm)} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {showEvidenceForm ? 'Cancelar' : 'Agregar Evidencia'}
            </button>
          </div>

          {/* Filtro de categorías */}
          <div className="mb-4 flex flex-wrap gap-2">
            <button 
              onClick={() => setEvidenceFilter('Todos')} 
              className={`px-3 py-1 rounded-full text-sm ${
                evidenceFilter === 'Todos' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos
            </button>
            {evidenceCategories.map((category, index) => (
              <button 
                key={index} 
                onClick={() => setEvidenceFilter(category)} 
                className={`px-3 py-1 rounded-full text-sm ${
                  evidenceFilter === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Formulario para agregar nueva evidencia */}
          {showEvidenceForm && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6 animate-fadeIn border border-blue-100">
              <h4 className="text-md font-semibold mb-3 text-blue-800">Nueva Evidencia</h4>
              <form onSubmit={handleAddEvidence} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={newEvidence.title} 
                      onChange={handleEvidenceChange} 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nombre de la funcionalidad"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select 
                      name="category" 
                      value={newEvidence.category} 
                      onChange={handleEvidenceChange} 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {evidenceCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea 
                    name="description" 
                    value={newEvidence.description} 
                    onChange={handleEvidenceChange} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Breve descripción de la funcionalidad implementada"
                    rows="3"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de Evidencia</label>
                  <div className="mt-1 flex items-center">
                    <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-700 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <span className="mt-2 text-sm leading-normal">Seleccionar imagen</span>
                      <input type='file' className="hidden" accept="image/*" onChange={handleImageChange} required />
                    </label>
                    {newEvidence.imagePreview && (
                      <div className="ml-4">
                        <span className="text-xs text-green-600 font-medium">¡Imagen seleccionada!</span>
                        <img 
                          src={newEvidence.imagePreview} 
                          alt="Vista previa" 
                          className="mt-2 h-16 w-auto object-cover rounded-md border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowEvidenceForm(false)}
                    className="mr-2 bg-white hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                  >
                    Guardar Evidencia
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid de evidencias */}
          {filteredEvidences.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">No hay evidencias disponibles</p>
              <p className="mt-1">Agrega evidencias para mostrar el progreso del proyecto</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvidences.map((evidence) => (
                <div key={evidence.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex flex-col">
                  <div 
                    className="h-48 bg-gray-100 overflow-hidden relative cursor-pointer"
                    onClick={() => handleViewEvidence(evidence)}
                  >
                    {evidence.image ? (
                      <img 
                        src={evidence.image} 
                        alt={evidence.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-0 right-0 p-2">
                      <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-lg shadow-md">
                        {evidence.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        Ver detalle
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">{evidence.title}</h4>
                      <button 
                        onClick={() => handleDeleteEvidence(evidence.id)} 
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Eliminar evidencia"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{evidence.description}</p>
                    <div className="text-xs text-gray-500">
                      {evidence.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN 3: CAMPOS IMPLEMENTADOS */}
      <section id="campos" className="mb-10">
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
      </section>

      {/* Modal de vista detallada de evidencia */}
      {selectedEvidence && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{selectedEvidence.title}</h3>
              <button 
                onClick={handleCloseEvidenceDetail} 
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  {selectedEvidence.image ? (
                    <img 
                      src={selectedEvidence.image} 
                      alt={selectedEvidence.title} 
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full mb-2">
                      {selectedEvidence.category}
                    </span>
                    <div className="text-sm text-gray-500 mb-2">
                      Agregado el {selectedEvidence.date}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h4>
                    <p className="text-gray-600">{selectedEvidence.description}</p>
                  </div>
                  
                  <div className="border-t pt-4 mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Acciones</h4>
                    <div className="flex space-x-3">
                      <button className="flex items-center text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Editar
                      </button>
                      <button 
                        onClick={() => {
                          handleDeleteEvidence(selectedEvidence.id);
                          handleCloseEvidenceDetail();
                        }} 
                        className="flex items-center text-red-600 hover:text-red-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Eliminar
                      </button>
                      {selectedEvidence.image && (
                        <button className="flex items-center text-green-600 hover:text-green-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Descargar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default ProjectTracker;