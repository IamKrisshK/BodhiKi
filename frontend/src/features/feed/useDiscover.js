import { useEffect, useState } from "react";
import { getDiscoveryFeed } from "./discoverAPI";

export default function useDiscover(limit = 20) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getDiscoveryFeed(limit);
      setItems(data);
    } catch (err) {
      console.error("Discover load failed:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { items, loading, reload: load };
}