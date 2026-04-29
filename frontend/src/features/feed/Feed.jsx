import { useEffect, useRef, useState } from "react";
import { getPosts } from "./feedAPI";
import PostCard from "./postCard";
import CreatePost from "./createPost";
import DiscoverCard from "./discoverCard";
import { getDiscoveryFeed } from "./discoverAPI";
import { theme } from "../../styles/theme";
import { activityService } from "../../features/services/tracker";

/**
 * Each PostCard is wrapped in an observed div.
 * As soon as it enters the viewport it's logged once.
 */
function ObservedPost({ post, reload, observer }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !observer) return;
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [observer]);

  return (
    <div ref={ref} data-post-id={post._id}>
      <PostCard post={post} reload={reload} />
    </div>
  );
}

export default function Feed({ moodBefore }) {
  const [posts, setPosts]       = useState([]);
  const [discover, setDiscover] = useState([]);
  const [loading, setLoading]   = useState(true);
  const observerRef             = useRef(null);
  const sessionStarted          = useRef(false);

  /* ── start feed session on mount ── */
  useEffect(() => {
    activityService.start({
      category:  "feed",
      technique: "user-posts",
      moodBefore,
    });
    sessionStarted.current = true;

    // Flush on unmount (tab close / navigation)
    const handleUnload = () => activityService.stop();
    window.addEventListener("pagehide", handleUnload);

    return () => {
      window.removeEventListener("pagehide", handleUnload);
      activityService.stop();
      sessionStarted.current = false;
    };
  }, []);  // intentionally once — moodBefore is captured at mount

  /* ── IntersectionObserver ── */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = entry.target.dataset.postId;
            if (postId) activityService.trackPost(postId);
          }
        });
      },
      { threshold: 0 }   // as soon as any pixel enters viewport
    );

    return () => observerRef.current?.disconnect();
  }, []);

  /* ── data loading ── */
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

  const getDiscoverItem    = (index) => (!discover.length ? null : discover[index % discover.length]);
  const shouldInsertDiscover = (index) => (index + 1) % 2 === 0;

  return (
    <div style={theme.container}>
      <h2 style={theme.heading}>Your Feed</h2>
      <CreatePost reload={loadPosts} />

      {posts.length === 0 && !loading && (
        <div style={theme.feed}>
          {discover.map((item, i) => <DiscoverCard key={i} item={item} />)}
        </div>
      )}

      <div style={theme.feed}>
        {posts.map((post, index) => (
          <div key={post._id}>
            <ObservedPost
              post={post}
              reload={loadPosts}
              observer={observerRef.current}
            />
            {shouldInsertDiscover(index) && getDiscoverItem(index) && (
              <DiscoverCard item={getDiscoverItem(index)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}