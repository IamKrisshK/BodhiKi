import { deletePost, toggleLike } from "./feedAPI";
import { theme } from "../../styles/theme";
export default function PostCard({ post, reload }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = currentUser?._id === post.author?._id;
  return (
    <div style={theme.card}>
      <div style={theme.header}>
        <h3 style={theme.title}>{post.title}</h3>
        <span style={theme.author}>~{post.author?.username}</span>
      </div>

      <p style={theme.content}>{post.content}</p>

      <div style={theme.footer}>
              <button onClick={async () => {
                await toggleLike(post._id);
                reload();
              }}>
                Like
              </button>

        {isOwner && (
          <button style={theme.delete} onClick={() => deletePost(post._id)}>
            delete
          </button>
        )}
      </div>
    </div>
  );
}

