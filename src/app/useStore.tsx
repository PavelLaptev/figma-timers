import create from "zustand";

const useStore = create<any>(set => ({
  config: null,

  setConfig: (config: ConfigProps) => set(state => ({ ...state, config })),
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

  // DRAGGING

  isDragging: false,
  setIsDragging: (val: boolean) => set(() => ({ isDragging: val })),

  draggingElement: null,
  setDraggingElement: (index: number) =>
    set(() => ({ draggingElement: index })),

  dragOverElement: null,
  setDragOverElement: (index: number) => set(() => ({ dragOverElement: index }))
}));

export default useStore;
