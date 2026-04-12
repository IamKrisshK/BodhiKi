import { useEffect, useState } from "react";
import { getPosts } from "./feedAPI";
import PostCard from "./postCard";
import CreatePost from "./createPost";
import { theme } from "../../styles/theme";
export default function Feed() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await getPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
  <div style={theme.container}>
    <h2 style={theme.heading}>Your Feed</h2>

    <CreatePost reload={loadPosts} />

    <div style={theme.feed}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} reload={loadPosts} />
      ))}
    </div>
  </div>
  );
}