import * as React from "react";

import Timer from "./components/Timer";
import styles from "./app.module.scss";

console.clear();

const timerConfig = [
  {
    name: "Intro",
    time: {
      minutes: 0,
      seconds: 3
    },
    skip: false
  },
  {
    name: "Goals",
    time: {
      minutes: 0,
      seconds: 7
    },
    skip: false
  },
  {
    name: "Sketching",
    time: {
      minutes: 0,
      seconds: 2
    },
    skip: false
  }
] as Array<TimerConfigProps>;

const App = ({}) => {
  return (
    <section className={styles.app}>
      <Timer timerConfig={timerConfig} />
    </section>
  );
};

export default App;
