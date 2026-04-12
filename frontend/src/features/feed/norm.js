export function normalizeArticles(list = []) {
  return list.map((item) => ({
    id: item.url || item.title,
    title: item.title,
    description: item.description,
    image: item.image,
    url: item.url,
    source: item.source,
    topic: item.topic,
  }));
}