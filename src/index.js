// Para React 18
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TaskTracker from './components/TaskTracker';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaskTracker />
  </React.StrictMode>
);