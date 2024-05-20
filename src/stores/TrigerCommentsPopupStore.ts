import { create } from "zustand";

type TrigerComponentStore = {
  commentPopupTrigger: number;
  setCommentPopupTrigger: (postId: number) => void;
};

const useTrigerComponentStore = create<TrigerComponentStore>()((set) => ({
  commentPopupTrigger: 0,
  setCommentPopupTrigger: (postId: number) =>
    set({ commentPopupTrigger: postId }),
}));

export default useTrigerComponentStore;
