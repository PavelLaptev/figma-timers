import * as React from "react";
import useStore from "../../useStore";
import styles from "./styles.module.scss";

interface TimerItemProps {
  index: number;
}

const Timer = (props: TimerItemProps) => {
  const {
    config,
    isPlaying,
    nowPlaying,
    setIsPlaying,
    setNowPlaying,
    setConfigTime,
    setConfigMinutes,
    setConfigSeconds,
    setConfigName
  } = useStore();

  React.useEffect(() => {
    // Check if it is the lasat timer
    if (config.length < nowPlaying + 1) {
      setIsPlaying(false);
    }

    // Chceck if it is playing and run only one timer
    if (isPlaying && nowPlaying === props.index) {
      // Run the interval for the timer
      const intervalId = setInterval(() => {
        const joinedTime =
          Number(config[props.index].time.minutes) * 60 +
          Number(config[props.index].time.seconds) -
          1;
        const splittedTime = {
          minutes: Math.floor(joinedTime / 60),
          seconds: joinedTime % 60
        };

        setConfigTime(splittedTime);

        // If the tied is over switch to the next timer
        if (!joinedTime) {
          setNowPlaying(props.index + 1);
          return;
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isPlaying, nowPlaying, setNowPlaying, setConfigTime]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfigName(e.target.value);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfigMinutes(e.target.value);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfigSeconds(e.target.value);
  };

  return (
    <section
      className={`${styles.draggableWrap} ${isPlaying ? styles.disabled : ""}`}
    >
      <div>{isPlaying}</div>
      <div className={`${styles.timer}`}>
        <input
          onChange={handleNameChange}
          value={config[props.index].name}
        ></input>
        <div>
          <input
            onChange={handleMinutesChange}
            value={config[props.index].time.minutes}
          />
          <span>:</span>
          <input
            onChange={handleSecondsChange}
            value={config[props.index].time.seconds}
          />
        </div>
      </div>
    </section>
  );
};

export default Timer;
