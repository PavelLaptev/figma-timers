import * as React from "react";
import Timer from "./components/Timer";
import styles from "./app.module.scss";

console.clear();

const timerConfig = [
  {
    label: "Intro",
    time: {
      minutes: 0,
      seconds: 3
    }
  },
  {
    label: "Goals",
    time: {
      minutes: 0,
      seconds: 7
    }
  },
  {
    label: "Sketching",
    time: {
      minutes: 0,
      seconds: 2
    }
  }
];

const App = ({}) => {
  return (
    <section className={styles.app}>
      <Timer timerConfig={timerConfig} />
    </section>
  );
};

export default App;
