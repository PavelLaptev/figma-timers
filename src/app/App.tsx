import * as React from "react";
import useStore from "./useStore";
import styles from "./app.module.scss";

import Button from "./components/Button";

import Timer from "./components/Timer";

console.clear();

const App = ({}) => {
  const { config, isPlaying, setIsPlaying } = useStore();

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`${styles.darkTheme} ${styles.app}`}>
      <section className={styles.generalButtons}>
        <Button
          onClick={handlePlay}
          icon={isPlaying ? "pause" : "play"}
          size="large"
        />
        <Button onClick={handlePause} icon="reset" size="large" />
        <Button onClick={handlePause} icon="mute" size="large" />
        <Button onClick={handlePause} icon="fold" size="large" />
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
