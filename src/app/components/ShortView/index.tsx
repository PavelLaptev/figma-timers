import * as React from "react";

import globalStyles from "../../styles/base.scss";
import styles from "./styles.module.scss";

import useStore from "../../useStore";

import Button from "../Button";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const ShortView = (props: Props) => {
  const {
    config,
    nowPlaying,
    isPlaying,
    setIsPlaying,
    setIsShort
  } = useStore();

  return (
    <section
      className={`${props.className} ${styles.wrap}`}
      style={props.style}
    >
      <h4 className={styles.name}>{config.timers[nowPlaying].name}</h4>
      <div className={styles.body}>
        <div className={styles.time}>
          <span className={styles.time_item}>
            {config.timers[nowPlaying].time.minutes}
          </span>
          <span className={styles.time_divider}>:</span>
          <span className={styles.time_item}>
            {config.timers[nowPlaying].time.seconds}
          </span>
        </div>

        <div className={styles.buttons}>
          <Button
            icon={isPlaying ? "pause" : "play"}
            className={`${isPlaying ? globalStyles.activeButton : ""} ${
              styles.button
            } `}
            style={{
              width: "60px"
            }}
            onClick={() => setIsPlaying(!isPlaying)}
          />
          <Button
            onClick={setIsShort}
            icon="fold"
            className={`${styles.button}`}
            style={{
              width: "40px"
            }}
          />
        </div>
      </div>
    </section>
  );
};

ShortView.defaultProps = {
  className: ""
} as Partial<Props>;

export default ShortView;
