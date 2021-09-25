import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

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

// GET PROJECTS WITH FILTER
export const searchProjectByQuery = async (body) =>
  await axiosInstance.post(`/project/search`, body);

// GET TAGS
export const getTags = async () => await axiosInstance.get("/project/tags");

// GET LANGUAGES
export const getLanguages = async () =>
  await axiosInstance.get("/project/languages");
