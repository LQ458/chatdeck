import { create } from "zustand";

interface TourState {
  showTour: boolean;
  setShowTour: (show: boolean) => void;
}

export const useTourStore = create<TourState>((set) => ({
  showTour: false, // 初始值为 false
  setShowTour: (show) => set({ showTour: show }),
}));
