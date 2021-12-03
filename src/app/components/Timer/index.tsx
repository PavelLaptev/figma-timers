import * as React from "react";
import useStore from "../../useStore";
import styles from "./styles.module.scss";

interface TimerItemProps {
  index: number;
}

const Timer = (props: TimerItemProps) => {
  const config = useStore.getState().config;
  const isPlaying = useStore.getState().isPlaying;
  const nowPlaying = useStore.getState().nowPlaying;
  const setNowPlaying = (val: number) => useStore.setState({ nowPlaying: val });
  const setIsPlaying = (val: boolean) => useStore.setState({ isPlaying: val });

  // const [dragOverState, setDragOverState] = React.useState(false);
  // const [isDraggingState, setIsDraggingState] = React.useState(false);

  React.useEffect(() => {
    const joinedTime =
      Number(config[props.index].time.minutes) * 60 +
      Number(config[props.index].time.seconds) -
      1;
    const splittedTime = {
      minutes: Math.floor(joinedTime / 60),
      seconds: joinedTime % 60
    };

    // Check if it is the lasat timer
    if (config.length < nowPlaying + 1) {
      setIsPlaying(false);
    }

    // Chceck if it is playing and run only one timer
    if (isPlaying && nowPlaying === props.index) {
      // If the tied is over switch to the next timer
      if (!(joinedTime + 1)) {
        setNowPlaying(props.index + 1);
        return;
      }

      // Run the interval for the timer
      const intervalId = setInterval(() => {
        // setNewTimeConfig(prevState => {
        //   const newState = [...prevState];
        //   newState[props.index].time = splittedTime;
        //   return newState;
        // });

        console.log(splittedTime);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isPlaying]);

  return (
    <section
      className={`${styles.draggableWrap} ${isPlaying ? styles.disabled : ""}`}
    >
      <div className={`${styles.timer}`}>
        <div>{isPlaying}</div>
        <div className={styles.timer_label}>{config[props.index].name}</div>
        <h3>
          {config[props.index].time.minutes}:{config[props.index].time.seconds}
        </h3>
      </div>
    </section>
  );
};

export default Timer;
