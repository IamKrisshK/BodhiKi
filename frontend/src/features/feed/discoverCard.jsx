export default function DiscoverCard({ item }) {
  if (!item) return null;

  return (
    <div style={styles.card}>
      <div style={styles.label}>Discover</div>

      {item.image && (
        <img src={item.image} style={styles.image} alt={item.title} />
      )}

      <h3 style={styles.title}>{item.title}</h3>
      <p style={styles.desc}>{item.desc}</p>

      <a href={item.url} target="_blank" rel="noreferrer" style={styles.button}>
        Explore
      </a>
    </div>
  );
}

const styles = {
  card: {
    padding: "16px",
    borderRadius: "12px",
    background: "#1B211A",
    border: "1px solid #628141",
    color: "#EBD5AB",
    marginTop: "12px",
  },
  label: {
    fontSize: "11px",
    opacity: 0.6,
    marginBottom: "6px",
  },
  title: {
    margin: "6px 0",
    fontSize: "16px",
  },
  desc: {
    fontSize: "13px",
    opacity: 0.8,
  },
  button: {
    display: "inline-block",
    marginTop: "10px",
    background: "#628141",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "8px",
  },
};