import { deletePost, toggleLike } from "./feedAPI";
import { useState } from "react";
import { theme } from "../../styles/theme";
export default function PostCard({ post, reload }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = currentUser?._id === post.author?._id;
  const isLiked = Array.isArray(post.likes) &&
  post.likes.some(user => user._id === currentUser?._id);
  const [liked, setLiked] = useState(isLiked);
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this post?");
    if (!confirmDelete) return;

    await deletePost(post._id);
    reload();
  };
  const handleLike = async () => {
    setLiked(!liked);
    try {
      await toggleLike(post._id);
    } catch {
      setLiked(liked)
    }
  };
  return (
    <div style={theme.PostCard}>
      <div style={theme.header}>
        <h3 style={theme.title}>{post.title}</h3>
        <span style={theme.author}>~{post.author?.username}</span>
      </div>

      <p style={theme.content}>{post.content}</p>

      <div style={theme.footer}>
              <button onClick={handleLike}>
                {liked ? "Liked ✓" : "Like"}
              </button>

        {isOwner && (
          <button style={theme.delete} onClick={handleDelete}>
            delete
          </button>
        )}
      </div>
    </div>
  );
}

