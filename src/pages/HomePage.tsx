import Post from "../components/Post";
import { useState, useEffect } from "react";
import useUserStore from "../stores/UserStore";
import PostModal from "../Modals/PostModal";

const HomePage = () => {
  const [posts, setPosts] = useState<PostModal[]>([]);
  const userId = useUserStore((state) => state.userId);

  const getPosts = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const data = await res.json();
    const posts = data.filter((post: PostModal) => {
      if (post.userId != userId) return post;
    });
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, [posts]);
  return (
    <div className="w-full">
      {posts.map((post: PostModal, index: number) => (
        <Post key={index} post={post} myPostFlag={false} />
      ))}
    </div>
  );
};

export default HomePage;
