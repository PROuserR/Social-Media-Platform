import EditIcon from "../assets/pencil.svg";
import DeleteIcon from "../assets/trash.svg";
import { useEffect, useState, useRef } from "react";
import useUserStore from "../stores/UserStore";
import CommentModal from "../Modals/CommentModal";
import PostModal from "../Modals/PostModal";
import UserModal from "../Modals/UserModal";
import useTrigerComponentStore from "../stores/TrigerComponentStore";

type CommentsPopupProps = {
  post: PostModal;
};

const CommentsPopup = ({ post }: CommentsPopupProps) => {
  const userId = useUserStore((state) => state.userId);
  const [comments, setComments] = useState([]);
  const [editedComment, setEditedComment] = useState({
    id: 0,
    text: "",
    userId: 0,
  });
  const commentInput = useRef(document.createElement("input"));
  const commentPopupTrigger = useTrigerComponentStore(
    (state) => state.commentPopupTrigger
  );
  const setCommentPopupTrigger = useTrigerComponentStore(
    (state) => state.setCommentPopupTrigger
  );

  const getCommentsIds = async () => {
    const res = await fetch(`http://localhost:3000/posts/${post.id}`);
    const data = await res.json();
    return data.comments;
  };



  const getComments = async () => {
    const res = await fetch("http://localhost:3000/comments/");
    const data = await res.json();
    const commentsIds = await getCommentsIds();


    const comments = data.filter((comment: CommentModal) => {
      return commentsIds.includes(comment.id);
    });

    setComments(comments);
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

    getComments();
  };

  const copyCommentToCommentInput = (comment: CommentModal) => {
    commentInput.current.value = comment.text;
    setEditedComment(comment);
  };

  const editComment = async (comment: CommentModal) => {
    const modComment = comment;
    modComment.text = commentInput.current.value;
    console.table(modComment);

    await fetch(`http://localhost:3000/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(modComment),
    });
  };

  const commentOnPost = async (editedComment: CommentModal) => {
    if (editedComment.id) await editComment(editedComment);
    else await addCommentToPost();
    commentInput.current.value = "";
    getComments();
  };

  const deleteComment = async (commentId: number) => {
    await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  const deleteAndRefresh = (commentId: number) => {
    deleteComment(commentId);

    setComments([]);
    getComments();
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <>
      {commentPopupTrigger === post.id ? (
        <div className="fixed top-0 left-[30.5%] w-[54%] h-[95%] bg-[#191B1D] border-2 border-black">
          <div className="flex w-full">
            <button
              onClick={() => setCommentPopupTrigger(0)}
              className="p-4 text-xl ml-auto bg-transparent"
            >
              X
            </button>
          </div>
          <div className="px-2 space-y-8 h-[75%]">
            <div className="text-3xl font-bold text-center">Comments</div>
            <div className="text-start px-4 space-y-6">
              {comments.map((comment: CommentModal, index: number) => (
                <div className="flex" key={index}>
                  <li className="text-lg">
                    {comment.username} {comment.text}
                  </li>
                  {comment.userId === userId ? (
                    <div className="flex ml-auto space-x-4">
                      <img
                        className="w-7 h-7 cursor-pointer"
                        src={EditIcon}
                        onClick={() => copyCommentToCommentInput(comment)}
                      />
                      <img
                        className="w-7 h-7 cursor-pointer"
                        src={DeleteIcon}
                        onClick={() => deleteAndRefresh(comment.id)}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-6 p-4 m-auto">
            <input
              className="w-full text-lg bg-transparent outline-none border-2 border-black m-auto p-3 rounded-2xl"
              placeholder="Add a comment ..."
              ref={commentInput}
            />
            <button
              className="m-auto p-4 bg-blue-700 rounded-2xl hover:bg-blue-600"
              onClick={() => commentOnPost(editedComment)}
            >
              Comment
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CommentsPopup;
