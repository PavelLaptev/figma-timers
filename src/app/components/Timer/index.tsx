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
    const joinedTime =
      Number(config[props.index].time.minutes) * 60 +
      Number(config[props.index].time.seconds);
    const joinedTimeMinusSecond = joinedTime - 1;
    const splittedTime = {
      minutes: Math.floor(joinedTimeMinusSecond / 60),
      seconds: joinedTimeMinusSecond % 60
    };
    const totalTime = config.reduce(
      (acc, cur) => acc + (cur.time.minutes + cur.time.seconds),
      0
    );

    // Check if it is the lasat timer
    if (config.length < nowPlaying + 1) setIsPlaying(false);

    // if total time sum is 0, stop timer
    if (totalTime === 0) setIsPlaying(false);

    // Chceck if it is playing and run only one timer
    if (isPlaying && nowPlaying === props.index) {
      // if current time is not 0, next timer
      if (joinedTime === 0) {
        console.log("Timer is over");
        setNowPlaying(props.index + 1);
        return;
      }

      // Run the interval for the timer
      const intervalId = setInterval(() => {
        setConfigTime(splittedTime);

        // If the tied is over switch to the next timer
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [
    config[props.index].time,
    isPlaying,
    nowPlaying,
    setNowPlaying,
    setConfigTime,
    setConfigMinutes,
    setConfigSeconds
  ]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfigName(e.target.value);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowPlaying(0);
    setConfigMinutes(e.target.value, props.index);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowPlaying(0);
    setConfigSeconds(e.target.value, props.index);
  };

  return (
    <section className={` ${isPlaying ? styles.disabled : ""}`}>
      <div>{isPlaying}</div>
      <div className={`${styles.timer}`}>
        <input
          onChange={handleNameChange}
          value={config[props.index].name}
        ></input>
        <div className={styles.time}>
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
