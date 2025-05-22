import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjectTracker = () => {
  // ---------- SECTION: TASK TRACKER STATE ----------
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
    frontendImprovements: false,
    
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
    userRoles: false,
    dataBackup: false,
    
    // Optimizaciones
    performanceOptimization: true,
    securityEnhancements: true,
    
    // Validaciones
    inputValidation: true,
    errorHandling: false,
    dataIntegrity: false,
  });

  // Stats corregidos
  const stats = {
    completedTasks: 19,
    totalTasks: 23,
    pendingTasks: 4,
    completionPercentage: Math.round((19 / 23) * 100)
  };

  // Datos para el gráfico de progreso
  const progressData = [
    { mes: 'Enero', completadas: 5, pendientes: 18 },
    { mes: 'Febrero', completadas: 8, pendientes: 15 },
    { mes: 'Marzo', completadas: 12, pendientes: 11 },
    { mes: 'Abril', completadas: 15, pendientes: 8 },
    { mes: 'Mayo', completadas: 17, pendientes: 6 }
  ];

  // Datos para el gráfico de pie
  const pieData = [
    { name: 'Completadas', value: stats.completedTasks, color: '#10b981' },
    { name: 'Pendientes', value: stats.pendingTasks, color: '#ef4444' }
  ];

  // Datos para el gráfico de barras por categoría
  const categoryData = [
    { categoria: 'Autenticación', completadas: 3, total: 3 },
    { categoria: 'Base de Datos', completadas: 2, total: 4 },
    { categoria: 'Interfaz', completadas: 4, total: 5 },
    { categoria: 'Equipos', completadas: 5, total: 5 },
    { categoria: 'Reportes', completadas: 3, total: 3 },
    { categoria: 'Optimización', completadas: 0, total: 3 }
  ];

  // Avances recientes
  const recentUpdates = [
    { date: "22-may-2025", update: "Añadidos gráficos de progreso al dashboard" },
    { date: "22-may-2025", update: "Implementada persistencia de imágenes con localStorage" },
    { date: "20-may-2025", update: "Modifique la búsqueda para que busque por ID exacto del equipo" },
    { date: "20-may-2025", update: "Mejore la función de actualización de la tabla" },
    { date: "20-may-2025", update: "Manejo robusto de errores" },
    { date: "19-may-2025", update: "Corrección de errores de sincronización" },
  ];

  // Categorías para agrupar tareas
  const categories = [
    { title: "Autenticación y Usuarios", items: ['login', 'userAdmin', 'passwordManagement'] },
    { title: "Base de Datos", items: ['sqlConnection', 'crudOperations', 'dataBackup', 'dataIntegrity'] },
    { title: "Interfaz de Usuario", items: ['interfaceDesign', 'responsiveDesign', 'adminDropdown', 'fishAnimations', 'frontendImprovements'] },
    { title: "Gestión de Equipos", items: ['equipmentListing', 'addEquipment', 'editEquipment', 'deleteEquipment', 'searchEquipment'] },
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
    excelExport: "Exportar a Excel",
    completeReport: "Excel completo con todo tipo de dato",
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

  // Estado para las fotos
  const [photos, setPhotos] = useState(() => {
    // Cargar fotos desde localStorage al iniciar
    const savedPhotos = localStorage.getItem('projectPhotos');
    if (savedPhotos) {
      return JSON.parse(savedPhotos);
    }
    return [
      {
        id: 1,
        title: "Login",
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%234F46E5'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EPantalla de Login%3C/text%3E%3C/svg%3E",
        description: "Pantalla de inicio de sesión del sistema"
      }
    ];
  });

  const [newPhoto, setNewPhoto] = useState({
    title: '',
    file: null,
    preview: null,
    description: ''
  });

  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [fileError, setFileError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Guardar fotos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('projectPhotos', JSON.stringify(photos));
  }, [photos]);

  // Función para manejar la selección de archivo
  const handleFileChange = (e) => {
    setFileError('');
    const file = e.target.files[0];
    
    if (file) {
      // Verificar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        setFileError('Por favor, selecciona solo archivos de imagen');
        return;
      }

      // Verificar el tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('La imagen debe ser menor a 5MB');
        return;
      }

      // Crear una URL para la vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(prev => ({
          ...prev,
          file: file,
          preview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para manejar cambios en el formulario
  const handlePhotoChange = (e) => {
    const { name, value } = e.target;
    setNewPhoto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para añadir una nueva foto
  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!newPhoto.preview || !newPhoto.title) return;

    try {
      setUploading(true);
      
      // Simular un pequeño delay para mejor UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Agregar la nueva foto al estado
      const newPhotoData = {
        id: Date.now(),
        title: newPhoto.title,
        url: newPhoto.preview,
        description: newPhoto.description || 'Sin descripción'
      };
      
      setPhotos(prev => [newPhotoData, ...prev]);

      // Limpiar el formulario
      setNewPhoto({
        title: '',
        file: null,
        preview: null,
        description: ''
      });
      setShowPhotoForm(false);
    } catch (err) {
      setFileError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Función para eliminar una foto
  const handleDeletePhoto = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta foto?')) {
      setPhotos(prev => prev.filter(photo => photo.id !== id));
    }
  };

  // ---------- SECTION: MAIN RENDER ----------
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Título General de la Página */}
      <div className="mb-8 text-center animate-fadeIn">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Sistema de Seguimiento de Proyectos</h1>
        <p className="text-gray-600">Dashboard de progreso - Actualizado: 22 de mayo de 2025</p>
      </div>

      {/* Tabs para navegar entre secciones */}
      <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
        <a href="#progreso" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap hover:bg-blue-700 transition-colors">
          Progreso del Proyecto
        </a>
        <a href="#graficos" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap hover:bg-blue-700 transition-colors">
          Gráficos de Análisis
        </a>
        <a href="#fotos" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap hover:bg-blue-700 transition-colors">
          Fotos del Proyecto
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
            <p className="text-gray-600">Monitoreo en tiempo real del avance</p>
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

      {/* SECCIÓN DE GRÁFICOS */}
      <section id="graficos" className="mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Análisis Visual del Progreso
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de línea - Progreso mensual */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Evolución del Progreso</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completadas" stroke="#10b981" strokeWidth={2} name="Completadas" />
                  <Line type="monotone" dataKey="pendientes" stroke="#ef4444" strokeWidth={2} name="Pendientes" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de pie - Estado actual */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Estado Actual del Proyecto</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de barras - Por categoría */}
            <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Progreso por Categoría</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completadas" fill="#10b981" name="Completadas" />
                  <Bar dataKey="total" fill="#3b82f6" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE FOTOS */}
      <section id="fotos" className="mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Fotos del Proyecto ({photos.length})
            </h2>
            <button 
              onClick={() => setShowPhotoForm(!showPhotoForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {showPhotoForm ? 'Cancelar' : 'Agregar Foto'}
            </button>
          </div>

          {fileError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {fileError}
            </div>
          )}

          {/* Formulario para agregar nueva foto */}
          {showPhotoForm && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6 animate-fadeIn border border-blue-100">
              <h4 className="text-md font-semibold mb-3 text-blue-800">Nueva Foto</h4>
              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={newPhoto.title} 
                    onChange={handlePhotoChange} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Vista del Dashboard"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Imagen *</label>
                  <div className="mt-1 flex items-center">
                    <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-700 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <span className="mt-2 text-sm leading-normal">Seleccionar archivo</span>
                      <input 
                        type='file' 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        required 
                      />
                    </label>
                  </div>
                  {fileError && (
                    <div className="text-red-600 text-sm mt-2">{fileError}</div>
                  )}
                  {newPhoto.preview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                      <img 
                        src={newPhoto.preview} 
                        alt="Vista previa" 
                        className="max-h-48 rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (opcional)</label>
                  <textarea 
                    name="description" 
                    value={newPhoto.description} 
                    onChange={handlePhotoChange} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe brevemente la imagen"
                    rows="3"
                  />
                </div>
                
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewPhoto({
                        title: '',
                        file: null,
                        preview: null,
                        description: ''
                      });
                      setShowPhotoForm(false);
                      setFileError('');
                    }}
                    className="mr-2 bg-white hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm"
                    disabled={uploading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm flex items-center"
                    disabled={uploading || !newPhoto.preview || !newPhoto.title}
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Guardando...
                      </>
                    ) : (
                      'Guardar Foto'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid de fotos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg">No hay fotos agregadas todavía</p>
                <p className="text-sm mt-2">Haz clic en "Agregar Foto" para comenzar</p>
              </div>
            ) : (
              photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 group">
                  <div className="relative aspect-video">
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    {photo.id !== 1 && ( // No permitir eliminar la foto de login
                      <button 
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                        title="Eliminar foto"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{photo.title}</h3>
                    <p className="text-gray-600 text-sm">{photo.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: CAMPOS IMPLEMENTADOS */}
      <section id="campos" className="mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
            </svg>
            Campos del Sistema de Inventario
          </h2>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-800 text-sm">
              <strong>Total de campos implementados:</strong> {implementedFields.length} de {implementedFields.length} campos
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="py-3 px-4 text-left font-semibold">#</th>
                  <th className="py-3 px-4 text-left font-semibold">Campo</th>
                  <th className="py-3 px-4 text-left font-semibold">Tipo de Dato</th>
                  <th className="py-3 px-4 text-left font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {implementedFields.map((field, index) => (
                  <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors`}>
                    <td className="py-3 px-4 border-b border-gray-100 text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 border-b border-gray-100 font-medium">{field.field}</td>
                    <td className="py-3 px-4 border-b border-gray-100">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        field.type === 'Select' ? 'bg-purple-100 text-purple-800' : 
                        field.type === 'Date' ? 'bg-yellow-100 text-yellow-800' : 
                        field.type === 'TextArea' ? 'bg-indigo-100 text-indigo-800' : 
                        field.type === 'Email' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {field.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100">
                      <div className="flex items-center text-green-600 font-semibold">
                        <svg className="w-5 h-5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
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

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 font-medium">
                Todos los campos han sido implementados exitosamente en el sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-8">
        <p>Sistema de Seguimiento de Proyectos © 2025</p>
        <p className="text-sm mt-2">Desarrollado para el control y monitoreo del inventario de equipos</p>
      </footer>

      {/* Estilos CSS para animaciones */}
      <style>{`
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