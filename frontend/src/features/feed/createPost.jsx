import { useState } from "react";
import { createPost } from "./feedAPI";
import { theme } from "../../styles/theme";

export default function CreatePost({ reload }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content) return;

    await createPost(form);

    setForm({
      title: "",
      content: "",
      category: "",
      tags: "",
    });

    setFocused(false);
    reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        ...theme.container,
        borderColor: focused
          ? theme.colors.accent
          : theme.colors.border,
      }}
    >
      {/* Title */}
      <input
        style={theme.title}
        value={form.title}
        onFocus={() => setFocused(true)}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Give it a title..."
      />

      {/* Content */}
      <textarea
        style={theme.content}
        value={form.content}
        onFocus={() => setFocused(true)}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        placeholder="What's on your mind?"
      />

      {/* Footer */}
      <div style={theme.footer}>
        <div style={theme.meta}>
          <input
            style={theme.metaInput}
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            placeholder="category"
          />

          <input
            style={theme.metaInput}
            value={form.tags}
            onChange={(e) =>
              setForm({ ...form, tags: e.target.value })
            }
            placeholder="#tags"
          />
        </div>

        <button style={theme.button} type="submit">
          Post →
        </button>
      </div>
    </form>
  );
}