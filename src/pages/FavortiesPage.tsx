import { useState, useEffect } from "react";
import useUserStore from "../stores/UserStore";
import Post from "../components/Post";
import PostModal from "../Modals/PostModal";

const FavortiesPage = () => {
  const [posts, setPosts] = useState<PostModal[]>([]);
  const userId = useUserStore((state) => state.userId);

  const getMyFavoritePosts = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const data = await res.json();
    const favortiesPosts = data.filter((post: PostModal) => {
      return post.saved.includes(userId)
    });
    setPosts(favortiesPosts);
  };

  useEffect(() => {
    getMyFavoritePosts();
  }, []);
  return (
    <div className="w-full">
      {posts.length ? null : <div className="text-4xl p-14 text-center">No posts yet</div>}
      {posts.map((post, index) => (
        <Post key={index} post={post} myPostFlag={false} />
      ))}
    </div>
  );
};

export default FavortiesPage;
