import * as React from "react";
import useStore from "./useStore";

import styles from "./app.module.scss";

console.clear();

const App = ({}) => {
  const config = useStore.getState().config;
  console.log(config);

  const handlePlay = () => {
    useStore.setState({ isPlaying: true });
  };

  const handlePause = () => {
    useStore.setState({ isPlaying: false });
  };

  return (
    <div>
      <section className={styles.app}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </section>
      <section className={styles.timersList}>
        {config.map((_, index) => {
          return <div>{index}</div>;
        })}
      </section>
    </div>
  );
};

export default App;
