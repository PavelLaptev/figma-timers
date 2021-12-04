import * as React from "react";
import useStore from "./useStore";
import styles from "./app.module.scss";

import Button from "./components/Button";

import Timer from "./components/Timer";

console.clear();

const App = ({}) => {
  const [initialConfig, setInitialConfig] = React.useState({
    name: "Interview",
    sound: false,
    timers: [
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
    ]
  } as ConfigProps);
  const configDeepCopy = JSON.parse(JSON.stringify(initialConfig));
  const {
    config,
    isPlaying,
    setIsPlaying,
    setConfig,
    resetTimers
  } = useStore();

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    console.log(initialConfig.timers[0].time);
    resetTimers(initialConfig.timers);
  };

  React.useEffect(() => {
    setConfig(configDeepCopy);
  }, []);

  return (
    <div className={`${styles.darkTheme} ${styles.app}`}>
      <section className={styles.generalButtons}>
        <Button
          onClick={handlePlay}
          icon={isPlaying ? "pause" : "play"}
          size="large"
        />
        <Button onClick={handleReset} icon="reset" size="large" />
        <Button
          onClick={() => {
            console.log("dummy");
          }}
          icon="mute"
          size="large"
        />
        <Button
          onClick={() => {
            console.log("dummy");
          }}
          icon="fold"
          size="large"
        />
      </section>
      <section className={styles.timersList}>
        {config ? (
          config.timers.map((_, index) => {
            return <Timer key={`timer-${index}`} index={index} />;
          })
        ) : (
          <div>Config is miissing</div>
        )}
      </section>
    </div>
  );
};

export default App;
