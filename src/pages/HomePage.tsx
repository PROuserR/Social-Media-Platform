import Post from "../components/Post";
import { useState, useEffect } from "react";
import PostModal from "../Modals/PostModal";

const HomePage = () => {
  const [posts, setPosts] = useState<PostModal[]>([]);

  const getPosts = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="w-full">
      {posts.map((post: PostModal, index: number) => (
        <Post key={index} post={post} myPostFlag={false} />
      ))}
    </div>
  );
};

export default HomePage;
