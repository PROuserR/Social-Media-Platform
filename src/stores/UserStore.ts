import { create } from "zustand";

type UserStore = {
  userId: number;
  setUserId: (userId: number) => void;
  username: string | null;
  setUsername: (username: string) => void;
};

const useUserStore = create<UserStore>()((set) => ({
  userId: Number(localStorage.getItem("myId")),
  setUserId: (newUserID: number) => set({ userId: newUserID }),
  username: localStorage.getItem("myUsername"),
  setUsername: (newUsername: string) => set({ username: newUsername }),
}));

export default useUserStore;;
