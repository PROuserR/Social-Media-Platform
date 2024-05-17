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
    <div className="my-12">
      <div className="flex flex-col w-full m-auto rounded-xl text-center p-14 space-y-10 text-xl bg-[#191B1D]">
        <div className="text-4xl font-bold">Edit Post</div>
        <div className="flex flex-col space-y-6">
          <input
            ref={titleRef}
            className="w-4/5 m-auto rounded-xl py-4 bg-transparent text-3xl text-center border-2 border-black outline-none"
            placeholder="Title"
            defaultValue={editPostData.title}
          />
          <textarea
            ref={contentRef}
            className="w-4/5 m-auto rounded-xl p-4 bg-transparent outline-none border-2 border-black h-96"
            defaultValue={editPostData.content}
          ></textarea>

          <input
            ref={imageRef}
            className="w-4/5 m-auto rounded-xl p-4 bg-transparent outline-none border-2 border-black"
            defaultValue={editPostImageUrl}
            placeholder="Image Url"
          />
        </div>

        <button
          onClick={editPost}
          className="w-4/5 m-auto py-3 px-8 bg-blue-700 rounded-2xl hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditPostPage;
