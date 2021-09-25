import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { Authorization: `${localStorage.getItem("token")}` },
});

export const login = async (data) => await axiosInstance.post("/login", data);
export const register = async (data) => await axiosInstance.post("/user", data);
// EDIT PROJECT BY ID
export const editProject = async (id, data) =>
  await axiosInstance.put(`/project/${id}`, data);

// GET PROJECT BY ID
export const getProjectById = async (id) =>
  await axiosInstance.get(`/project/${id}`);

// ADD NEW PROJECT
export const addProject = async (data) =>
  await axiosInstance.post("/project", data);

// GET ALL PROJECTS
export const getAllProject = async () => await axiosInstance.get("/project");

// DELETE PROJECT BY ID
export const deleteProjectById = async (id) =>
  await axiosInstance.delete(`/project/${id}`);
export const recoverPassword = async (data) =>
  await axiosInstance.post("/forgot-password", data);
export const resetPassword = async (data) =>
  await axiosInstance.post("/reset-password", data);
export const verifyEmail = async (id, token) =>
  await axiosInstance.get(`/user/confirm/${id}/${token}`);

// GET PROJECTS WITH FILTER
export const searchProjectByQuery = async (body) =>
  await axiosInstance.post(`/project/search`, body);

// GET TAGS
export const getTags = async () => await axiosInstance.get("/project/tags");

// GET LANGUAGES
export const getLanguages = async () =>
  await axiosInstance.get("/project/languages");
