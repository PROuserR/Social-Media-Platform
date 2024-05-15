import { create } from "zustand";
import PostModal from "../Modals/PostModal";

interface PostModalStore extends PostModal {
  setPostData: (postData: PostModal) => void;
}

const usePostStore = create<PostModalStore>()((set) => ({
  id: 0,
  title: "",
  content: "",
  imageId: 0,
  userId: 0,
  likes: [],
  comments: [],
  saved: [],
  setPostData: (postData: PostModal) => set(postData),
}));

export default usePostStore;
