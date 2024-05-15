import HeartIcon from "../assets/heart.svg";
import CommentIcon from "../assets/chat.svg";
import BookmarkIcon from "../assets/bookmark.svg";
import EditIcon from "../assets/pencil.svg";
import DeleteIcon from "../assets/trash.svg";
import CommentsModal from "./CommentsPopup";
import { useEffect, useRef, useState } from "react";
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
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [likes, setLikes] = useState(post.likes.length);
  const [commentInputTrigger, setCommentInputTrigger] = useState(false);
  const commentPopupTrigger = useTrigerComponentStore(
    (state) => state.commentPopupTrigger
  );
  const setCommentPopupTrigger = useTrigerComponentStore(
    (state) => state.setCommentPopupTrigger
  );
  const commentInput = useRef(document.createElement("input"));
  const setPostData = usePostStore((state) => state.setPostData);

  const deletePostTrigger = useTrigerComponentStore(
    (state) => state.deletePostTrigger
  );
  const setDeletePostTrigger = useTrigerComponentStore(
    (state) => state.setDeletePostTrigger
  );
  const userId = useUserStore((state) => state.userId);
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
    if (modPost.likes.includes(userId)) return;
    modPost.likes.push(userId);

    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(modPost),
    });
    setLikes(likes + 1);
  };

  const createComment = async () => {
    const res = await fetch(`http://localhost:3000/comments/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: commentInput.current.value,
        userId: userId,
      }),
    });
    const data = await res.json();
    const commentId = data.id;

    return commentId;
  };

  const addCommentToPost = async () => {
    const commentId = await createComment();
    const modPost = post;
    modPost.comments.push(commentId);

    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(modPost),
    });

    setCommentInputTrigger(!commentInputTrigger);
  };

  const savePostToFavorites = async () => {
    const modPost = post;
    if (modPost.saved.includes(userId)) return;
    modPost.saved.push(userId);

    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(modPost),
    });
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
    <div className="block my-16 border-4 border-black">
      <header className="flex">
        <img className="w-full" src={url} />
      </header>
      <section className="block p-6 space-y-8 border-b-4 border-t-4 border-black">
        <div className="flex items-center">
          <div className="text-xl">{username}</div>
          <div className="flex ml-auto space-x-4">
            <div className="m-auto">{likes} Likes</div>
            <div
              onClick={() => setCommentPopupTrigger(!commentPopupTrigger)}
              className="m-auto underline cursor-pointer"
            >
              View all comments
            </div>
          </div>
        </div>
        <div className="text-4xl font-bold">{post.title}</div>
        <p>{post.content}</p>
      </section>
      {myPostFlag ? (
        <footer className="block  p-4">
          <div className="flex w-full items-center">
            <img
              onClick={navToEditPostPage}
              className="w-12 h-10 m-auto cursor-pointer"
              src={EditIcon}
            />
            <img
              onClick={deleteAndRefresh}
              className="w-12 h-10 m-auto cursor-pointer"
              src={DeleteIcon}
            />
          </div>
          {commentInputTrigger ? (
            <div className="flex space-x-6 p-4">
              <input
                className="w-full text-lg bg-transparent outline-none border-4 border-black m-auto p-3 rounded-2xl"
                placeholder="Write a comment ..."
                ref={commentInput}
              />
              <button className="m-auto p-4" onClick={addCommentToPost}>
                Comment
              </button>
            </div>
          ) : null}
        </footer>
      ) : (
        <footer className="block p-4">
          <div className="flex w-full items-center">
            <img
              onClick={likePost}
              className="w-12 h-10 m-auto cursor-pointer"
              src={HeartIcon}
            />
            <img
              onClick={() => {
                setCommentInputTrigger(!commentInputTrigger);
              }}
              className="w-12 h-10 m-auto cursor-pointer"
              src={CommentIcon}
            />
            <img
              onClick={savePostToFavorites}
              className="w-12 h-10 m-auto cursor-pointer"
              src={BookmarkIcon}
            />
          </div>
          {commentInputTrigger ? (
            <div className="flex space-x-6 p-4">
              <input
                className="w-full text-lg bg-transparent outline-none border-4 border-black m-auto p-3 rounded-2xl"
                placeholder="Write a comment ..."
                ref={commentInput}
              />
              <button className="m-auto p-4" onClick={addCommentToPost}>
                Comment
              </button>
            </div>
          ) : null}
        </footer>
      )}

      <CommentsModal postId={post.id} />
    </div>
  );
};

export default Post;
