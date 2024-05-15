import { useEffect, useRef, useState } from "react";
import usePostStore from "../stores/PostStore";
import { useNavigate } from "react-router-dom";

const EditPostPage = () => {
  const [editPostImageUrl, setEditPostImageUrl] = useState("");
  const titleRef = useRef(document.createElement("input"));
  const contentRef = useRef(document.createElement("textarea"));
  const imageRef = useRef(document.createElement("input"));
  const nav = useNavigate();
  const editPostData = usePostStore((state) => state);

  const uploadImage = async () => {
    const res = await fetch(`http://localhost:3000/images/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        url: imageRef.current.value,
      }),
    });
    const data = await res.json();
    return data.id;
  };

  const getImage = async () => {
    const res = await fetch(
      `http://localhost:3000/images/${editPostData.imageId}`
    );
    const data = await res.json();
    setEditPostImageUrl(data.url);
  };

  const editPost = async () => {
    const modPost = editPostData;
    modPost.title = titleRef.current.value;
    modPost.content = contentRef.current.value;
    modPost.imageId = await uploadImage();

    await fetch(`http://localhost:3000/posts/${editPostData.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(modPost),
    });
    nav("/");
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="space-y-10">
      <h1>Edit Post</h1>
      <div className="flex flex-col space-y-6">
        <input
          ref={titleRef}
          className="w-1/2 m-auto py-4 bg-transparent text-4xl text-center border-4 border-black outline-none"
          placeholder="Title"
          defaultValue={editPostData.title}
        />
        <textarea
          ref={contentRef}
          className="w-1/2 m-auto p-4 bg-transparent outline-none border-4 border-black h-96"
          defaultValue={editPostData.content}
        ></textarea>

        <input
          ref={imageRef}
          className="w-1/2 m-auto p-4 bg-transparent outline-none border-4 border-black"
          defaultValue={editPostImageUrl}
          placeholder="Image Url"
        />
      </div>

      <button onClick={editPost} className="w-1/2 m-auto">
        Update
      </button>
    </div>
  );
};

export default EditPostPage;
