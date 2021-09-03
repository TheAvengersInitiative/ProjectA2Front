import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export const editProject = async (id, data) =>
  await axiosInstance.put(`/project/${id}`, data);
export const getProjectById = async (id) =>
  await axiosInstance.get(`/project/${id}`);
export const addProject = async (data) =>
  await axiosInstance.post("/project", data);
export const getAllProject = async () => await axiosInstance.get("/project");
export const deleteProjectById = async (id) =>
  await axiosInstance.delete(`/project/${id}`);
export const recoverPassword = async (data) =>
  await axiosInstance.post("/forgot-password", data);
export const resetPassword = async (data) =>
  await axiosInstance.post("/reset-password", data);
