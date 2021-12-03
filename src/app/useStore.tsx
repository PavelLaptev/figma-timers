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
  setConfigTime: time =>
    set(state => (state.config[state.nowPlaying].time = time)),
  setConfigName: name =>
    set(state => (state.config[state.nowPlaying].name = name)),
  setConfigMinutes: minutes =>
    set(state => (state.config[state.nowPlaying].time.minutes = minutes)),
  setConfigSeconds: seconds =>
    set(state => (state.config[state.nowPlaying].time.seconds = seconds)),
  nowPlaying: 0,
  setNowPlaying: (index: number) => set(() => ({ nowPlaying: index })),
  isPlaying: false,
  setIsPlaying: (val: boolean) => set(() => ({ isPlaying: val }))
}));

export default useStore;
