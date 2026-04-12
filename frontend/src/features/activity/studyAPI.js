import api from "../services/apiClient";

export const logSession = (data) => api.post("/api/activity", data);