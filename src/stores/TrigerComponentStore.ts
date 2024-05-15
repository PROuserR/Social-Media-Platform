import { create } from "zustand";

type TrigerComponentStore = {
  deletePostTrigger: boolean;
  commentPopupTrigger: boolean;
  setDeletePostTrigger: (trigerFlag: boolean) => void;
  setCommentPopupTrigger: (trigerFlag: boolean) => void;
};

const useTrigerComponentStore = create<TrigerComponentStore>()((set) => ({
  deletePostTrigger: false,
  commentPopupTrigger: false,
  setDeletePostTrigger: (trigerFlag: boolean) =>
    set({ deletePostTrigger: trigerFlag }),
  setCommentPopupTrigger: (trigerFlag: boolean) =>
    set({ commentPopupTrigger: trigerFlag }),
}));

export default useTrigerComponentStore;
