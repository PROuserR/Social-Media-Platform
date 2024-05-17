import HeartIcon from "../assets/heart.svg";
import RedHeartIcon from "../assets/heart-fill.svg";
import CommentIcon from "../assets/chat.svg";
import BookmarkIcon from "../assets/bookmark.svg";
import WhiteBookmarkIcon from "../assets/bookmark-fill.svg";
import EditIcon from "../assets/pencil.svg";
import DeleteIcon from "../assets/trash.svg";
import CommentsPopup from "./CommentsPopup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTrigerComponentStore from "../stores/TrigerComponentStore";
import useUserStore from "../stores/UserStore";
import usePostStore from "../stores/PostStore";
import PostModal from "../Modals/PostModal";

type PostProps = {
  post: PostModal;
  myPostFlag: boolean | null | undefined;
};

const Post = ({ post, myPostFlag }: PostProps) => {
  const setCommentPopupTrigger = useTrigerComponentStore(
    (state) => state.setCommentPopupTrigger
  );
  const setPostData = usePostStore((state) => state.setPostData);
  const deletePostTrigger = useTrigerComponentStore(
    (state) => state.deletePostTrigger
  );
  const setDeletePostTrigger = useTrigerComponentStore(
    (state) => state.setDeletePostTrigger
  );
  const userId = useUserStore((state) => state.userId);
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [likes, setLikes] = useState(post.likes.length);
  const [likeTrigger, setLikeTrigger] = useState(post.likes.includes(userId));
  const [savedTrigger, setSavedTrigger] = useState(post.saved.includes(userId));

  const nav = useNavigate();

  const getImage = async () => {
    const res = await fetch(`http://localhost:3000/images/${post.imageId}`);
    const data = await res.json();
    setUrl(data.url);
  };

  const getUsername = async () => {
    const res = await fetch(`http://localhost:3000/users/${post.userId}`);
    const data = await res.json();
    setUsername(data.username);
  };

  const likePost = async () => {
    const modPost = post;
    modPost.likes.push(userId);

    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(modPost),
    });
    setLikes(likes + 1);
    setLikeTrigger(true);
  };

  const unlikePost = async () => {
    const modPost = post;
    const likeId = modPost.likes.indexOf(userId);
    modPost.likes.splice(likeId, 1);

    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(modPost),
    });
    setLikes(likes - 1);
    setLikeTrigger(false);
  };

  const savePostToFavorites = async () => {
    const modPost = post;
    modPost.saved.push(userId);

    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(modPost),
    });
    setSavedTrigger(true);
  };

  const unsavePost = async () => {
    const modPost = post;
    const saveId = modPost.saved.indexOf(userId);
    console.log(modPost, userId);
    modPost.saved.splice(saveId, 1);

    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(modPost),
    });

    setSavedTrigger(false);
  };

  const deletePost = async () => {
    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  const deleteAndRefresh = () => {
    deletePost();

    setDeletePostTrigger(!deletePostTrigger);
  };

  const navToEditPostPage = () => {
    setPostData(post);
    nav("/edit-post");
  };

  useEffect(() => {
    getImage();
    getUsername();
  }, []);

  return (
    <div className="p-5 space-y-6 my-16 bg-[#191B1D]">
      <header className="px-1 space-y-3">
        <div className="flex items-center">
          <div className="font-extrabold">{username}</div>
          <div className="flex ml-auto">
            {myPostFlag ? (
              <div className="flex w-full space-x-4 items-center">
                <img
                  onClick={navToEditPostPage}
                  className="w-7 h-7 m-auto cursor-pointer"
                  src={EditIcon}
                />
                <img
                  onClick={deleteAndRefresh}
                  className="w-7 h-7 m-auto cursor-pointer"
                  src={DeleteIcon}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-3xl font-bold">{post.title}</div>
        <p>{post.content}</p>
      </header>
      <section className="flex">
        <img className="w-full rounded-lg" src={url} />
      </section>
      <footer className="px-1">
        <div className="flex w-full items-center">
          <div className="flex space-x-4 items-center">
            {likeTrigger ? (
              <img
                className="w-7 cursor-pointer"
                src={RedHeartIcon}
                onClick={unlikePost}
              />
            ) : (
              <img
                className="w-7 cursor-pointer"
                src={HeartIcon}
                onClick={likePost}
              />
            )}
            <img
              onClick={() => {
                setCommentPopupTrigger(post.id);
              }}
              className="w-7 cursor-pointer"
              src={CommentIcon}
            />

            {savedTrigger ? (
              <img
                onClick={unsavePost}
                className="w-7 cursor-pointer"
                src={WhiteBookmarkIcon}
              />
            ) : (
              <img
                onClick={savePostToFavorites}
                className="w-7 cursor-pointer"
                src={BookmarkIcon}
              />
            )}
          </div>
          <div className="ml-auto text-lg text-[#5C5D5E] text-start">
            {likes} likes
          </div>
        </div>
      </footer>
      <CommentsPopup post={post} />
    </div>
  );
};

export default Post;
