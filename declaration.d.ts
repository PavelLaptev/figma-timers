declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

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

export {};
