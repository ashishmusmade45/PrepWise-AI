// Base API URL - change this to match your backend server
export const BASE_URL = 'http://localhost:8000/api';

// Authentication endpoints
export const AUTH_PATHS = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  PROFILE: `${BASE_URL}/auth/profile`,
};

// Session endpoints
export const SESSION_PATHS = {
  CREATE: `${BASE_URL}/sessions/create`,
  GET_ALL: `${BASE_URL}/sessions`,
  GET_MY_SESSIONS: `${BASE_URL}/sessions/my-session`,
  GET_BY_ID: (id) => `${BASE_URL}/sessions/${id}`,
  DELETE: (id) => `${BASE_URL}/sessions/${id}`,
};

// Question endpoints
export const QUESTION_PATHS = {
  ADD_TO_SESSION: `${BASE_URL}/questions/add`,
  TOGGLE_PIN: (id) => `${BASE_URL}/questions/${id}/pin`,
  UPDATE_NOTE: (id) => `${BASE_URL}/questions/${id}/note`,
};

// AI endpoints
export const AI_PATHS = {
  GENERATE_QUESTIONS: `${BASE_URL}/ai/generate-questions`,
  GENERATE_EXPLANATION: `${BASE_URL}/ai/generate-explanation`,
};

// Upload endpoints
export const UPLOAD_PATHS = {
  PROFILE_IMAGE: `${BASE_URL}/uploads/profile`,
};

// Helper function to get full URL with query parameters
export const buildUrl = (basePath, params = {}) => {
  const url = new URL(basePath, window.location.origin);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

// Export all paths as a single object for easy access
export const API_PATHS = {
  ...AUTH_PATHS,
  ...SESSION_PATHS,
  ...QUESTION_PATHS,
  ...AI_PATHS,
  ...UPLOAD_PATHS,
};

export default API_PATHS;
