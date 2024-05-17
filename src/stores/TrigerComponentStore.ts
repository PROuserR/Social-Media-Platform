import { create } from "zustand";

type TrigerComponentStore = {
  deletePostTrigger: boolean;
  setDeletePostTrigger: (postId: boolean) => void;
  commentPopupTrigger: number;
  setCommentPopupTrigger: (postId: number) => void;
};

const useTrigerComponentStore = create<TrigerComponentStore>()((set) => ({
  deletePostTrigger: false,
  commentPopupTrigger: 0,
  setDeletePostTrigger: (trigerFlag: boolean) =>
    set({ deletePostTrigger: trigerFlag }),
  setCommentPopupTrigger: (postId: number) =>
    set({ commentPopupTrigger: postId }),
}));

export default useTrigerComponentStore;
