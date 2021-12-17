import * as React from "react";

import styles from "./styles.module.scss";

import timerEmoji from "./assets/timer-clock.png";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const Loader = (props: Props) => {
  return (
    <div className={`${props.className} ${styles.wrap}`} style={props.style}>
      <img src={timerEmoji} className={styles.emoji} alt="timer" />
      <h3 className={styles.text}>Loading …</h3>
    </div>
  );
};

Loader.defaultProps = {
  className: ""
} as Partial<Props>;

export default Loader;
