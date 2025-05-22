const API_BASE_URL = 'http://localhost:3001/api';

export const API_ENDPOINTS = {
    UPLOAD: `${API_BASE_URL}/upload`,
    FILES: `${API_BASE_URL}/files`,
    DELETE_FILE: (filename) => `${API_BASE_URL}/files/${filename}`
}; 