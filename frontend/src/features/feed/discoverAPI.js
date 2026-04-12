import api from "../services/apiClient";

export async function getDiscoveryFeed(limit = 20) {
  const res = await api.get("/api/discover", {
    params: { limit },
  });

  return res.data?.items || [];
}
