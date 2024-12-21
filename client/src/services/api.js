import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Students API
export const getStudents = (page, limit) =>
  axios.get(`${API_URL}/students?page=${page}&limit=${limit}`);
export const getStudentById = (id) => axios.get(`${API_URL}/students/${id}`);
export const createStudent = (data) => axios.post(`${API_URL}/students`, data);
export const updateStudent = (id, data) =>
  axios.put(`${API_URL}/students/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API_URL}/students/${id}`);

// Marks API
export const createMark = (data) => axios.post(`${API_URL}/marks`, data);
export const getMarksByStudentId = (studentId) =>
  axios.get(`${API_URL}/marks/student/${studentId}`);
export const updateMark = (id, data) =>
  axios.put(`${API_URL}/marks/${id}`, data);
export const deleteMark = (id) => axios.delete(`${API_URL}/marks/${id}`);
