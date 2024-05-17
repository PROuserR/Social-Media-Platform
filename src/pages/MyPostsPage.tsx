import { useEffect, useState } from "react";
import useTrigerComponentStore from "../stores/TrigerComponentStore";
import useUserStore from "../stores/UserStore";
import Post from "../components/Post";
import PostModal from "../Modals/PostModal";

const MyProfilePage = () => {
  const [myPosts, setMyPosts] = useState<PostModal[]>([]);
  const deletePostTrigger = useTrigerComponentStore(
    (state) => state.deletePostTrigger
  );
  const userId = useUserStore((state) => state.userId);

  const getMyPosts = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const data = await res.json();
    const myPosts = data.filter((post: PostModal) => {
      return post.userId === userId
    });
    setMyPosts(myPosts);
  };

  useEffect(() => {
    getMyPosts();
  }, [deletePostTrigger]);

  useEffect(() => {
    setMyPosts([]);
  }, [deletePostTrigger]);

  return (
    <div className="w-full">
      {myPosts.length ? null : (
        <div className="text-4xl p-14 text-center">No posts yet</div>
      )}
      {myPosts.map((myPostData: PostModal, index: number) => (
        <Post key={index} post={myPostData} myPostFlag={true} />
      ))}
    </div>
  );
};

export default MyProfilePage;
