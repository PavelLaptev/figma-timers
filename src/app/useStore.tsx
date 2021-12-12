import create from "zustand";

const useStore = create<any>(set => ({
  config: null,

  setConfig: (config: ConfigProps) => set(state => ({ ...state, config })),
  setTimers: timers => set(state => ({ ...state, timers })),
  resetTimers: (timers: Array<TimerConfigProps>) =>
    set(state => {
      state.nowPlaying = 0;
      state.config.timers.forEach((timer, i) => (timer.time = timers[i].time));
    }),

  setConfigName: name => set(state => (state.config.name = name)),
  setConfigDescription: description =>
    set(state => (state.config.description = description)),

  setConfigTime: time =>
    set(state => (state.config.timers[state.nowPlaying].time = time)),
  setConfigTimerName: (name, index) =>
    set(state => (state.config.timers[index].name = name)),
  setConfigMinutes: (minutes, index) =>
    set(state => (state.config.timers[index].time.minutes = Number(minutes))),
  setConfigSeconds: (seconds, index) =>
    set(state => (state.config.timers[index].time.seconds = Number(seconds))),

  nowPlaying: 0,
  setNowPlaying: (index: number) => set(() => ({ nowPlaying: index })),

  isPlaying: false,
  setIsPlaying: (val: boolean) => set(() => ({ isPlaying: val })),

  hideExploreDropdown: true,
  toggleExploreDropdown: () =>
    set(state => ({ hideExploreDropdown: !state.hideExploreDropdown })),

  // DARK THEME

  darkTheme: false,
  toggleDarkTheme: () => set(state => ({ darkTheme: !state.darkTheme })),

  // SOUND

  isMuted: false,
  setMuteSound: () => set(state => ({ isMuted: !state.isMuted })),

  // IS SHORT VERSION

  isShort: false,
  setIsShort: () => set(state => ({ isShort: !state.isShort })),

  // FRAME SIZE

  frameSize: 400,
  setFrameSize: (size: number) =>
    set(() => {
      parent.postMessage(
        { pluginMessage: { type: "write-size-to-storaage", size: size } },
        "*"
      );
      return { frameSize: size };
    })
}));

export default useStore;
