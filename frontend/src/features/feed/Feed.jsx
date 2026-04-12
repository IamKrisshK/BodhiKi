import { useEffect, useState } from "react";
import { getPosts } from "./feedAPI";
import PostCard from "./postCard";
import CreatePost from "./createPost";
import DiscoverCard from "./discoverCard";
import { getDiscoveryFeed } from "./discoverAPI";
import { theme } from "../../styles/theme";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      setPosts(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const loadDiscover = async () => {
    const items = await getDiscoveryFeed(20);
    setDiscover(items);
  };

  useEffect(() => {
    loadPosts();
    loadDiscover();
  }, []);

  const getDiscoverItem = (index) => {
    if (!discover.length) return null;
    return discover[index % discover.length];
  };

  const shouldInsertDiscover = (index) => (index + 1) % 2 === 0;

  return (
    <div style={theme.container}>
      <h2 style={theme.heading}>Your Feed</h2>

      <CreatePost reload={loadPosts} />

      {/* EMPTY STATE → DISCOVER ONLY */}
      {posts.length === 0 && !loading && (
        <div style={theme.feed}>
          {discover.map((item, i) => (
            <DiscoverCard key={i} item={item} />
          ))}
        </div>
      )}

      {/* NORMAL FEED */}
      <div style={theme.feed}>
        {posts.map((post, index) => (
          <div key={post._id}>
            <PostCard post={post} reload={loadPosts} />

            {shouldInsertDiscover(index) && getDiscoverItem(index) && (
              <DiscoverCard item={getDiscoverItem(index)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}