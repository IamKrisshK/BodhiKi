export default function DiscoverCard({ item }) {
  if (!item) return null;

  return (
    <div style={styles.card}>
      {item.image && (
        <img src={item.image} style={styles.image} alt={item.title} />
      )}

      <div style={styles.content}>
        <div style={styles.label}>Discover</div>
        <h3 style={styles.title}>{item.title}</h3>
        <p style={styles.desc}>{item.desc}</p>

        <a href={item.url} target="_blank" rel="noreferrer" style={styles.button}>
          Explore
        </a>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",              // KEY CHANGE
    gap: "12px",
    padding: "12px",
    borderRadius: "12px",
    background: "#1B211A",
    border: "1px solid #628141",
    color: "#EBD5AB",
    marginTop: "12px",
    alignItems: "center",
  },

  image: {
    width: "120px",              
    height: "10rem",             
    objectFit: "cover",
    borderRadius: "8px",
    flexShrink: 0,               
  },

  content: {
    flex: 1,                      
  },

  label: {
    fontSize: "11px",
    opacity: 0.6,
    marginBottom: "4px",
  },

  title: {
    margin: "4px 0",
    fontSize: "15px",
  },

  desc: {
    fontSize: "13px",
    opacity: 0.8,
  },

  button: {
    display: "inline-block",
    marginTop: "8px",
    background: "#628141",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
  },
};