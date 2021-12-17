export {};

declare global {
  interface TimerConfigProps {
    name: string;
    time: {
      minutes: number;
      seconds: number;
    };
    skip: boolean;
  }
  interface ConfigProps {
    name: string;
    description: string;
    isMuted: boolean;
    timers: Array<TimerConfigProps>;
  }
  type IconTypes =
    | "play"
    | "pause"
    | "bin"
    | "plus"
    | "plus-small"
    | "reset"
    | "minus"
    | "grab"
    | "sound-off"
    | "sound-on"
    | "load"
    | "save"
    | "explore"
    | "fold";
}
