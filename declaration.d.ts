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
    label: string;
    time: {
      minutes: number;
      seconds: number;
    };
  }
}

export {};
