import create from "zustand";

const useStore = create<any>(set => ({
  config: [
    {
      name: "Intro",
      time: {
        minutes: 0,
        seconds: 3
      },
      skip: false
    },
    {
      name: "Goals",
      time: {
        minutes: 0,
        seconds: 7
      },
      skip: false
    },
    {
      name: "Sketching",
      time: {
        minutes: 0,
        seconds: 2
      },
      skip: false
    }
  ] as Array<TimerConfigProps>,
  nowPlaying: 0,
  isPlaying: false,
  setIsPlaying: () => set(state => ({ isPlaying: !state.isPlaying }))
}));

export default useStore;
