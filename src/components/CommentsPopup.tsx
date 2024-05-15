import { useEffect, useState } from "react";
import useTrigerComponentStore from "../stores/TrigerComponentStore";
import CommentModal from "../Modals/CommentModal";

type CommentsPopupProps = {
  postId: number;
};

const CommentsPopup = ({ postId }: CommentsPopupProps) => {
  const commentPopupTrigger = useTrigerComponentStore(
    (state) => state.commentPopupTrigger
  );
  const setCommentPopupTrigger = useTrigerComponentStore(
    (state) => state.setCommentPopupTrigger
  );
  const [comments, setComments] = useState([]);

  const getCommentsIds = async () => {
    const res = await fetch(`http://localhost:3000/posts/${postId}`);
    const data = await res.json();
    return data.comments;
  };

  const getComments = async () => {
    const res = await fetch("http://localhost:3000/comments/");
    const data = await res.json();
    const commentsIds = await getCommentsIds();
    const comments = data.filter((comment: CommentModal) => {
      if (commentsIds.includes(comment.id)) return comment;
    });
    setComments(comments);
  };

  useEffect(() => {
    getComments();
  }, [commentPopupTrigger]);
  return (
    <>
      {commentPopupTrigger ? (
        <div className="fixed top-24 left-[12.5%] w-3/4 h-[550px] bg-gray-800 border-4 border-black">
          <div className="flex w-full">
            <button
              onClick={() => setCommentPopupTrigger(!commentPopupTrigger)}
              className="ml-auto bg-transparent"
            >
              X
            </button>
          </div>
          <div className="text-2xl">Comments</div>
          <div className="text-start p-8">
            {comments.map((comment: CommentModal, index: number) => (
              <li className="text-lg" key={index}>
                {comment.text}
              </li>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CommentsPopup;
