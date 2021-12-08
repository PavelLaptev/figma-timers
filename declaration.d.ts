declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.mp3" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
