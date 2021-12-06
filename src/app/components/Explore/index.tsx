import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
  onClick?: (config: ConfigProps) => void;
}

const timers = {
  UXWhiteboard: {
    name: "UX Whiteboard Challange Interview",
    description:
      "Ask questions to specify the challenge. Ask about the users and their context. Write down the main steps of the story.",
    sound: false,
    timers: [
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
    ]
  } as ConfigProps
};

const Explore: React.FunctionComponent<Props> = props => {
  return (
    <section className={`${styles.wrap} ${props.className} }`}>
      <div
        className={styles.timer}
        onClick={() => {
          props.onClick(timers.UXWhiteboard);
        }}
      >
        <div>Image</div>
        <h2>Whiteboard challenge</h2>
        <p>This is the timer that will helps you to pass the interview</p>
      </div>
    </section>
  );
};

Explore.defaultProps = {
  className: ""
} as Partial<Props>;

export default Explore;
