import * as React from "react";
import Timer from "./components/Timer";
// import styles from "./app.module.scss";

const timerConfig = [
  {
    time: {
      minutes: "00",
      seconds: "05"
    }
  },
  {
    time: {
      minutes: "00",
      seconds: "03"
    }
  },
  {
    time: {
      minutes: "00",
      seconds: "34"
    }
  }
];

const App = ({}) => {
  const [playStates, setPlayStates] = React.useState(
    timerConfig.map(() => false)
  );

  return (
    <div>
      {timerConfig.map((timer, index) => {
        return (
          <Timer
            onComplete={isComplete => {
              if (isComplete) {
                const arrayCopy = [...playStates];
                arrayCopy[index + 1] = isComplete;
                setPlayStates(arrayCopy);
              }
            }}
            key={`timer-${index}`}
            time={timer.time}
            play={playStates[index]}
          />
        );
      })}
    </div>
  );
};

export default App;
