import * as React from "react";
import useStore from "./useStore";
import styles from "./app.module.scss";

import Timer from "./components/Timer";

console.clear();

const App = ({}) => {
  const { config, setIsPlaying } = useStore();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <section className={styles.app}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </section>
      <section className={styles.timersList}>
        {config.map((_, index) => {
          return <Timer key={`timer-${index}`} index={index} />;
        })}
      </section>
    </div>
  );
};

export default App;
