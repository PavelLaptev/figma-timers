import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
  onComplete: (time) => void;
}

const Button: React.FunctionComponent<Props> = props => {
  const [minutes, setMinutes] = React.useState("00");
  const [seconds, setSeconds] = React.useState("00");
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  // const handleComplete = () => {
  //   props.onComplete(timeLeft);
  // };

  React.useEffect(() => {
    console.log(Number(minutes), Number(seconds));
    // exit early when we reach 0
    // if (!timeLeft) return;
    // if (isActive) {
    // const intervalId = setInterval(() => {
    //   setTimeLeft(timeLeft - 1);
    //   handleComplete();
    // }, 1000);
    // return () => clearInterval(intervalId);
    // }
  }, [minutes, seconds, isActive]);

  return (
    <section className={`${styles.timer} ${props.className}`}>
      <h1>{timeLeft}</h1>
      <div className={styles.inputs}>
        <input
          type="text"
          value={minutes}
          maxLength={2}
          onChange={e => setMinutes(e.target.value.replace(/\D/, ""))}
          onFocus={e => e.target.select()}
          onBlur={() => seconds.length < 2 && setSeconds("0" + seconds)}
        />
        <input
          type="text"
          value={seconds}
          maxLength={2}
          onChange={e => setSeconds(e.target.value.replace(/\D/, ""))}
          onFocus={e => e.target.select()}
          onBlur={() => seconds.length < 2 && setSeconds("0" + seconds)}
        />
      </div>

      <button onClick={() => setIsActive(true)}>Play</button>
      <button onClick={() => setIsActive(false)}>Pause</button>
      {/* <button onClick={() => setTimeLeft(props.seconds)}>Reset</button> */}
    </section>
  );
};

Button.defaultProps = {
  className: "",
  onComplete: () => {}
} as Partial<Props>;

export default Button;
