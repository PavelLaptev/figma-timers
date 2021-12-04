import create from "zustand";

const useStore = create<any>(set => ({
  config: null,

  setConfig: (config: ConfigProps) => set(state => ({ ...state, config })),
  resetTimers: (timers: Array<TimerConfigProps>) =>
    set(state => {
      state.nowPlaying = 0;
      state.config.timers.forEach((timer, i) => (timer.time = timers[i].time));
    }),

  setConfigTime: time =>
    set(state => (state.config.timers[state.nowPlaying].time = time)),
  setConfigName: name =>
    set(state => (state.config.timers[state.nowPlaying].name = name)),
  setConfigMinutes: (minutes, index) =>
    set(state => (state.config.timers[index].time.minutes = minutes)),
  setConfigSeconds: (seconds, index) =>
    set(state => (state.config.timers[index].time.seconds = seconds)),

  nowPlaying: 0,
  setNowPlaying: (index: number) => set(() => ({ nowPlaying: index })),

  isPlaying: false,
  setIsPlaying: (val: boolean) => set(() => ({ isPlaying: val }))
}));

export default useStore;
