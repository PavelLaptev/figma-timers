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
    sound: boolean;
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
    | "mute"
    | "load"
    | "save"
    | "explore"
    | "fold";
}
