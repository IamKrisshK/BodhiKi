import api from "../services/apiClient";

export const getPosts = () => api.get("feed");
export const createPost = (data) => api.post("/post", data);
export const deletePost = (postId) => api.delete(`/${postId}`);
export const toggleLike = (postId) => api.post(`/${postId}/like`);