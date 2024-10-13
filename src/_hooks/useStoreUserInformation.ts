import { create } from "zustand";
import { UserInformation } from "../types";
import { persist } from "zustand/middleware";

interface UserInformationState {
  userData: UserInformation[];
  addUser: (value: UserInformation[]) => void;
  updateUser: (id: string, value: UserInformation) => void;
  removeUser: (id: string) => void;
}

export const useStoreUserInformation = create<UserInformationState>()(
  persist(
    (set, get) => ({
      userData: [],
      addUser: (value: UserInformation[]) =>
        set({
          userData: [
            ...get().userData,
            ...value.map((res) => ({ ...res, key: crypto.randomUUID(), id: crypto.randomUUID() })),
          ],
        }),
      updateUser: (id: string, newValues: UserInformation) =>
        set({
          userData: get().userData.map((item) =>
            item.id === id ? { ...item, ...newValues } : item
          ),
        }),
      removeUser: (id: string) =>
        set({
          userData: get().userData.filter((item) => item.id !== id),
        }),
    }),
    {
      name: "user-information-data",
      partialize: (state) => ({
        userData: state.userData,
      }),
    }
  )
);
