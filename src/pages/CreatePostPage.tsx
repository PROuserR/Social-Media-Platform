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
    <div className="my-12">
      <div className="flex flex-col w-full m-auto rounded-xl text-center p-14 space-y-10 text-xl bg-[#191B1D]">
        <div className="text-4xl font-bold">Create a new Post</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost();
          }}
          className="flex flex-col space-y-6"
        >
          <input
            ref={titleRef}
            className="w-4/5 m-auto py-4 bg-transparent text-3xl text-center border-2 rounded-xl border-black outline-none"
            placeholder="Title"
          />
          <textarea
            ref={contentRef}
            className="w-4/5 m-auto p-4 bg-transparent outline-none border-2 rounded-xl border-black h-96"
            defaultValue="Content"
          ></textarea>
          <input
            ref={imageRef}
            className="w-4/5 m-auto p-4 bg-transparent outline-none border-2 rounded-xl border-black"
            placeholder="Image URL"
          />

          <button className="w-4/5 m-auto py-3 px-8 bg-blue-700 rounded-2xl hover:bg-blue-600">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
