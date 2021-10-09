import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  ...(localStorage.getItem("token") && {
    headers: { Authorization: `${localStorage.getItem("token")}` },
  }),
});

// LOGIN
export const login = async (data) => await axiosInstance.post("/login", data);

// REGISTER
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

export const getMyProjects = async () =>
  await axiosInstance.get("/project/my-projects");

// DELETE PROJECT BY ID
export const deleteProjectById = async (id) =>
  await axiosInstance.delete(`/project/${id}`);

// GET APPLICANTS
export const getApplicants = async (id) =>
    await axiosInstance.get(`/project/applicants/${id}`);

// RECOVER PASSWORD
export const recoverPassword = async (data) =>
  await axiosInstance.post("/user/recover/request", data);

// RESET PASSWORD
export const resetPassword = async (data) =>
  await axiosInstance.post("/user/recover", data);

// VERIFY EMAIL
export const verifyEmail = async (data) =>
  await axiosInstance.post("/user/confirm", data);

// GET PROJECTS WITH FILTER
export const searchProjectByQuery = async (body) =>
  await axiosInstance.post(`/project/search`, {
    ...body,
    ...{ featured: false },
  });

// JOIN TO PROJECT
export const putJoinToProject = async (id) =>
  await axiosInstance.put(`/project/apply/${id}`);

// GET TAGS
export const getTags = async () => await axiosInstance.get("/project/tags");

// GET LANGUAGES
export const getLanguages = async () =>
  await axiosInstance.get("/project/languages");

// GET USER
export const getUserInfoById = async () => await axiosInstance.get("/user");

// EDIT USER
export const editUserInfo = async (data) =>
  await axiosInstance.put("/user", data);

// DELETE USER
export const deleteUser = async () => await axiosInstance.delete("/user");
export const getOtherUsersInfoById = async (id) =>
  await axiosInstance.get(`/user/${id}`);
