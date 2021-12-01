import * as React from "react";
import Timer from "./components/Timer";
// import styles from "./app.module.scss";

console.clear();

const timerConfig = [
  {
    time: {
      minutes: 0,
      seconds: 3
    },
    play: false
  },
  {
    time: {
      minutes: 1,
      seconds: 3
    },
    play: false
  },
  {
    time: {
      minutes: 0,
      seconds: 2
    },
    play: false
  }
];

const App = ({}) => {
  return <Timer timerConfig={timerConfig} />;
};

export default App;
