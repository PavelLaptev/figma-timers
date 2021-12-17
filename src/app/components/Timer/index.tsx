import * as React from "react";
import writeToStorage from "../../utils/writeToStorage";
import useStore from "../../useStore";

import moveArrayItem from "../../utils/moveArrayItem";

import Icon from "../Icon";

import styles from "./styles.module.scss";

const SortIcon = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={`rotate(${props.rotate ? 180 : 0})`}
      className={`${styles.sortIcon} ${props.className}`}
      onClick={props.onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.99995 10.0858V3H8.99995V10.0858L10.7928 8.29289L12.2071 9.70711L7.99995 13.9142L3.79285 9.70711L5.20706 8.29289L6.99995 10.0858Z"
      />
    </svg>
  );
};

interface TimerItemProps {
  initialConfig: ConfigProps;
  index: number;
  lastTimer: boolean;
  sound: {
    middle: HTMLAudioElement;
    end: HTMLAudioElement;
  };
}

////////////////////////
////////////////////////
////////////////////////

const Timer = (props: TimerItemProps) => {
  const {
    config,
    setConfig,
    isPlaying,
    nowPlaying,
    setIsPlaying,
    setNowPlaying,
    setConfigTime,
    setConfigMinutes,
    setConfigSeconds,
    setConfigTimerName,
    setTimers,
    resetTimers
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
      // Play sound 5 seconds before end
      if (joinedTime === 0 && !props.lastTimer) props.sound.middle.play();
      if (joinedTime === 0 && props.lastTimer) props.sound.end.play();

      // if current time is not 0, next timer
      if (joinedTime === 0) {
        console.log("Timer is over");
        if (config.timers.length > nowPlaying + 1) {
          setNowPlaying(props.index + 1);
        } else {
          resetTimers(props.initialConfig.timers);
        }
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
    config.timers[props.index].time,
    isPlaying,
    nowPlaying,
    setNowPlaying,
    setConfigTime,
    setConfigMinutes,
    setConfigSeconds
  ]);

  ////////////////////////
  ////////////////////////
  ////////////////////////

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfigTimerName(e.target.value, props.index);
    writeToStorage(config);
  };

  const handleDeleteTimer = () => {
    const newConfig = {
      ...config,
      timers: config.timers.filter((_, index) => index !== props.index)
    };

    setConfig(newConfig);
    writeToStorage(newConfig);
    setNowPlaying(0);
  };

  const handleTimeIncrease = () => {
    const joinedTime =
      Number(config.timers[props.index].time.minutes) * 60 +
      Number(config.timers[props.index].time.seconds);
    const joinedTimePlusTenSec = joinedTime + 10;

    if (joinedTimePlusTenSec < 0) return;

    setConfigMinutes(Math.floor(joinedTimePlusTenSec / 60), props.index);
    setConfigSeconds(joinedTimePlusTenSec % 60, props.index);
    writeToStorage(config);
  };

  const handleTimeDecrease = () => {
    const joinedTime =
      Number(config.timers[props.index].time.minutes) * 60 +
      Number(config.timers[props.index].time.seconds);
    const joinedTimeMinusTenSec = joinedTime - 10;

    if (joinedTimeMinusTenSec < 0) return;

    setConfigMinutes(Math.floor(joinedTimeMinusTenSec / 60), props.index);
    setConfigSeconds(joinedTimeMinusTenSec % 60, props.index);
    writeToStorage(config);
  };

  ///////////////////////
  //// TIME HANDLERS ////
  ///////////////////////

  const setNumbersOnly = (str: string, type: "min" | "sec") => {
    const regex = /[^0-9]/g;

    if (str.length > 2) return str.slice(-1).replace(regex, str);
    if (Number(str) > 60 && type === "min") return "60";
    if (Number(str) > 59 && type === "sec") return "59";

    return str.replace(regex, "");
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowPlaying(0);
    setConfigMinutes(setNumbersOnly(e.target.value, "min"), props.index);
    writeToStorage(config);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowPlaying(0);
    setConfigSeconds(setNumbersOnly(e.target.value, "sec"), props.index);
    writeToStorage(config);
  };

  const handleFocus = e => {
    e.target.select();
  };

  ////////////////////////
  ///////// SORT /////////
  ////////////////////////

  const moveTimerUp = () => {
    setTimers(moveArrayItem(config.timers, props.index, props.index - 1));
  };

  const moveTimerDown = () => {
    setTimers(moveArrayItem(config.timers, props.index, props.index + 1));
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
        <div className={styles.dragThumb}>
          <SortIcon
            className={
              props.index === config.timers.length - 1 ? styles.hide : ""
            }
            onClick={moveTimerDown}
          />
          <SortIcon
            rotate
            className={props.index === 0 ? styles.hide : ""}
            onClick={moveTimerUp}
          />
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.time}>
          <input
            maxLength={3}
            onChange={handleMinutesChange}
            value={config.timers[props.index].time.minutes}
            onFocus={handleFocus}
            onClick={handleFocus}
            className={styles.time_input}
            style={{
              width:
                String(config.timers[props.index].time.minutes).length > 1
                  ? "44px"
                  : "26px"
            }}
          />

          <span className={styles.time_divider}>:</span>

          <input
            maxLength={3}
            onChange={handleSecondsChange}
            value={config.timers[props.index].time.seconds}
            onFocus={handleFocus}
            onClick={handleFocus}
            className={styles.time_input}
            style={{
              width:
                String(config.timers[props.index].time.seconds).length > 1
                  ? "44px"
                  : "26px"
            }}
          />
        </div>

        <section className={styles.timeButtons}>
          <div className={`${styles.button}`}>
            <div onClick={handleTimeIncrease}>
              <Icon name="plus-small" />
            </div>
            <div onClick={handleTimeDecrease}>
              <Icon name="minus" />
            </div>
          </div>
          <div
            className={`${styles.button} ${
              config.timers.length === 1 ? styles.disabled : ""
            }`}
            onClick={handleDeleteTimer}
          >
            <Icon name="bin" />
          </div>
        </section>
      </section>
    </section>
  );
};

export default Timer;
