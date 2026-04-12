const topics = [
  "Artificial intelligence",
  "Quantum mechanics",
  "World literature",
  "Space exploration",
  "Climate change",
  "Psychology"
];

async function fetchWiki(topic) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`
    );

    if (!res.ok) return null;

    const data = await res.json();

    return {
      title: data.title,
      desc: data.extract,
      image: data.thumbnail?.source || null,
      url: data.content_urls?.desktop?.page || null
    };
  } catch (err) {
    return null;
  }
}

export async function discoverCtrl(req, res) {
  try {
    const limit = Number(req.query.limit || 20);

    const results = [];

    let i = 0;
    let safety = 0;

    while (results.length < limit && safety < 50) {
      const topic = topics[i % topics.length];
      const item = await fetchWiki(topic);

      if (item) results.push(item);

      i++;
      safety++;
    }

    return res.json({ items: results });

  } catch (err) {
    console.error("Discover error:", err);

    return res.status(500).json({
      message: "Discovery failed",
      items: []
    });
  }
}