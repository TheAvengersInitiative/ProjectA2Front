import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers : {Authorization : "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QG1haWwuY29tIiwiZXhwIjoxNjMyNTI5NTQ2fQ.IrQWog9BmQfZFMwSaXEIOVqS-I_L8LIXyPgmBOk7Me3puaohKm18tf3Zf6gFfBiUFS31_9SJVfjI4PzCYy4M-w"}
});
export const register = async (data) => await axiosInstance.post("/user", data);
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

export const getUserInfoById = async () => await axiosInstance.get("/user");
export const editUserInfo = async (data) =>
  await axiosInstance.put("/user", data);
export const deleteUser = async () => await axiosInstance.delete("/user");
