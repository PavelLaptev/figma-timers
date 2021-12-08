import * as React from "react";
import writeToStorage from "../../utils/writeToStorage";
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
    setConfigTimerName
  } = useStore();

  ////////////////////////
  ////// USE EFFECT //////
  ////////////////////////

  React.useEffect(() => {
    const joinedTime =
      Number(config.timers[props.index].time.minutes) * 60 +
      Number(config.timers[props.index].time.seconds);
    const joinedTimeMinusSecond = joinedTime - 1;
    const splittedTime = {
      minutes: Math.floor(joinedTimeMinusSecond / 60),
      seconds: joinedTimeMinusSecond % 60
    };
    const totalTime = config.timers.reduce(
      (acc, cur) => acc + (cur.time.minutes + cur.time.seconds),
      0
    );

    // Check if it is the lasat timer
    if (config.timers.length < nowPlaying + 1) setIsPlaying(false);

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
    config,
    config.timers[props.index].time,
    isPlaying,
    nowPlaying,
    setNowPlaying,
    setConfigTime,
    setConfigMinutes,
    setConfigSeconds
  ]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfigTimerName(e.target.value, props.index);
    writeToStorage(config);
  };

  ////////////////////////
  //// TIME HANDLERS /////
  ////////////////////////

  const setNumbersOnly = (str: string) => {
    const regex = /[^0-9]/g;
    return str.replace(regex, "");
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowPlaying(0);
    setConfigMinutes(setNumbersOnly(e.target.value), props.index);
    writeToStorage(config);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowPlaying(0);
    setConfigSeconds(setNumbersOnly(e.target.value), props.index);
    writeToStorage(config);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  ////////////////////////
  //////// RENDER ////////
  ////////////////////////

  return (
    <section className={`${styles.timer} ${isPlaying ? styles.disabled : ""}`}>
      <section className={styles.header}>
        <input
          className={styles.name}
          onChange={handleNameChange}
          value={config.timers[props.index].name}
        />
      </section>

      <section className={styles.body}>
        <div className={styles.time}>
          <div className={styles.time_inputWrap}>
            <input
              maxLength={2}
              onChange={handleMinutesChange}
              value={config.timers[props.index].time.minutes}
              onFocus={handleFocus}
              className={styles.time_input}
            />
          </div>

          <span className={styles.time_divider}>:</span>

          <div className={styles.time_inputWrap}>
            <input
              maxLength={2}
              onChange={handleSecondsChange}
              value={config.timers[props.index].time.seconds}
              onFocus={handleFocus}
              className={styles.time_input}
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Timer;
