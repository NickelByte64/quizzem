import { create } from "zustand";

interface NavigationStore {
  drawerState: boolean;
  toggleDrawerState: (drawerState: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  drawerState: false,
  toggleDrawerState: (drawerState: boolean) =>
    set({ drawerState: !drawerState }),
}));
