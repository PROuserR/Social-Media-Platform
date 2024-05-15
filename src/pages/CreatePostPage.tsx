import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";

const CreatePostPage = () => {
  const titleRef = useRef(document.createElement("input"));
  const contentRef = useRef(document.createElement("textarea"));
  const imageRef = useRef(document.createElement("input"));
  const userId = useUserStore((state) => state.userId);
  const nav = useNavigate();

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

  const createPost = async () => {
    const imageId = await uploadImage();
    await fetch(`http://localhost:3000/posts/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        content: contentRef.current.value,
        imageId: imageId,
        userId: userId,
        comments: [],
        likes: [],
        saved: [],
      }),
    });
    nav("/");
  };

  return (
    <div className="space-y-10">
      <h1>Create a new Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
        }}
        className="flex flex-col space-y-6"
      >
        <input
          ref={titleRef}
          className="w-1/2 m-auto py-4 bg-transparent text-4xl text-center border-4 border-black outline-none"
          placeholder="Title"
        />
        <textarea
          ref={contentRef}
          className="w-1/2 m-auto p-4 bg-transparent outline-none border-4 border-black h-96"
          defaultValue="Content"
        ></textarea>
        <input
          ref={imageRef}
          className="w-1/2 m-auto p-4 bg-transparent outline-none border-4 border-black"
          placeholder="Image URL"
        />

        <button className="w-1/2 m-auto">Create</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
