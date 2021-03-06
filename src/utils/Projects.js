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

// ACCEPT APPLICANTS

export const acceptApplicant = async (userId, projId) =>
  await axiosInstance.put(`/project/accept/${projId}/${userId}/`);

// REJECT APPLICANTS

export const rejectApplicant = async (userId, projId) =>
  await axiosInstance.put(`/project/reject/${projId}/${userId}/`);

// GET REVIEWS BY ID OF PROJECT AND USER

export const getReviewById = async (userId, projId) =>
  await axiosInstance.get(`/project/reviews/${projId}/${userId}/`);

// PUT REVIEWS BY ID OF PROJECT AND USER

export const AddReviewById = async (body, projId) =>
  await axiosInstance.put(`/project/review/${projId}`, body);

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

// START A DISCUSSION
export const startDiscussion = async (id, data) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: localStorage.getItem("token") },
    })
    .post(`/project/${id}/discussion`, data);

// HIGHLIGHT DISCUSSION COMMENT
export const highlightComment = async (commentId, token) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: token },
    })
    .put(`/discussion/highlight/${commentId}`);

// HIDE DISCUSSION COMMENT
export const hideComment = async (commentId, token) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: token },
    })
    .put(`/discussion/hide/${commentId}`);

// GET NOTIFS
export const getNotfs = async () => await axiosInstance.get("/notification");

// MODIFY DISCUSSION
export const modifyDiscussion = async (id, data) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: localStorage.getItem("token") },
    })
    .put(`discussion/${id}`, data);

// DELETE A DISCUSSION
export const deleteDiscussion = async (id) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: localStorage.getItem("token") },
    })
    .delete(`/discussion/${id}`);

export const getNotification = async (token) =>
  axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: token },
    })
    .get("/notification/first-five");

// USER PRIVACY

export const editUserPrivacy = async (data) =>
  await axiosInstance.put(`/user/privacy`, data);

// NOTIFICATION PREFERENCES

export const notificationPreferences = async (data) =>
  await axiosInstance.put(`/user/notification-preferences`, data);

// SEEN NOTIFICATION
export const seenNotif = async (id) =>
  await axiosInstance.put(`/notification/${id}`);

// BLACKLIST OF ENDPOINTS

// GET USER WITH TOKEN
export const getUserInfoByIdWithToken = async (token) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: token },
    })
    .get("/user");

// JOIN TO PROJECT WITH TOKEN
export const putJoinToProjectWithToken = async (id, token) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: token },
    })
    .put(`/project/apply/${id}`);

// ADD COMMENT TO DISCUSSION BY ID WITH TOKEN
export const putCommentDiscussionWithToken = async (body, id, token) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: token },
    })
    .put(`/discussion/comment/${id}`, body);

// ADD COMMENT TO DISCUSSION BY ID WITH TOKEN
export const putCommentEditDiscussionWithToken = async (body, id, token) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: token },
    })
    .put(`/discussion/comment-update/${id}`, body);

// DELETE COMMENT
export const deleteComment = async (id) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: localStorage.getItem("token") },
    })
    .delete(`/discussion/comment/${id}`);

// GET COMMENTS
export const getComments = async (discussionId) =>
  await axios
    .create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: localStorage.getItem("token") },
    })
    .get(`/discussion/comments/${discussionId}`);
