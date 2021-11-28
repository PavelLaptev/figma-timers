import * as React from "react";

import styles from "./styles.module.scss";

interface Props {
  className?: any;
  time: {
    minutes: string;
    seconds: string;
  };
  disabled?: boolean;
  play?: boolean;
  onComplete: (isComplete) => void;
}

const Button: React.FunctionComponent<Props> = props => {
  const [isActive, setIsActive] = React.useState(props.play);

  const [minutes, setMinutes] = React.useState(props.time.minutes);
  const [seconds, setSeconds] = React.useState(props.time.seconds);

  const [timeLeft, setTimeLeft] = React.useState(0);

  const mergeMinutesAndSeconds = () => {
    const time = Number(minutes) * 60 + Number(seconds);
    setTimeLeft(time);
  };

  const countAndSplit = timeLeft => {
    setTimeLeft(timeLeft);
    const format = val => `0${Math.floor(val)}`.slice(-2);
    const minutes = (timeLeft % 3600) / 60;

    setMinutes(format(minutes));
    setSeconds(format(timeLeft % 60));
  };

  React.useEffect(() => {
    mergeMinutesAndSeconds();

    if (isActive) {
      if (!timeLeft) return;

      const intervalId = setInterval(() => {
        const newTimeLeft = timeLeft - 1;

        countAndSplit(newTimeLeft);
        props.onComplete(newTimeLeft === 0);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [minutes, seconds, isActive, timeLeft, props.play]);

  return (
    <section className={`${styles.timer} ${props.className}`}>
      <h1>{timeLeft}</h1>
      <div className={styles.inputs}>
        <input
          type="text"
          value={minutes}
          maxLength={2}
          onChange={e => setMinutes(e.target.value.replace(/\D/, minutes))}
          onFocus={e => e.target.select()}
          onBlur={() => minutes.length < 2 && setMinutes("0" + minutes)}
        />
        <input
          type="text"
          value={seconds}
          maxLength={2}
          onChange={e => setSeconds(e.target.value.replace(/\D/, seconds))}
          onFocus={e => e.target.select()}
          onBlur={() => seconds.length < 2 && setSeconds("0" + seconds)}
        />
      </div>

      <button onClick={() => setIsActive(true)}>Play</button>
      <button onClick={() => setIsActive(false)}>Pause</button>
    </section>
  );
};

Button.defaultProps = {
  className: "",
  disabled: false,
  play: false
} as Partial<Props>;

export default Button;
