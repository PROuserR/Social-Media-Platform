import Post from "../components/Post";
import { useState } from "react";
import PostModal from "../Modals/PostModal";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const [posts, setPosts] = useState<PostModal[]>([]);

  const getPosts = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const data = await res.json();
    return new Promise((resolve) => {
      setPosts(data);
      resolve("Success");
    });
  };

  const query = useQuery({
    queryKey: ["feed"],
    queryFn: getPosts,
  });

  if (query.isLoading) return <div>Loading ...</div>;
  else
    return (
      <div className="w-full">
        {posts.map((post: PostModal, index: number) => (
          <Post key={index} post={post} myPostFlag={false} />
        ))}
      </div>
    );
};

export default HomePage;
