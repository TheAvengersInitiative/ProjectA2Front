import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export const getProjectById = async (id) =>
  await axiosInstance.get(`/project/${id}`);
export const addProject = async (data) =>
  await axiosInstance.post("/project", data);
