import { create } from "zustand";

type UserStore = {
  userId: number;
  setUserId: (userId : number) => void;
};

const useUserStore = create<UserStore>()((set) => ({
  userId: 1,
  setUserId: (newUserID : number) => set({ userId: newUserID }),
}));

export default useUserStore;;
