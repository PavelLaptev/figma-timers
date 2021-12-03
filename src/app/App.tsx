import * as React from "react";
import { atom, useRecoilValue, useRecoilState } from "recoil";

import styles from "./app.module.scss";

console.clear();

const configAtom = atom({
  key: "config", // unique ID (with respect to other atoms/selectors)
  default: [
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
  ] as Array<TimerConfigProps> // default value (aka initial value)
});

const playStateAtom = atom({
  key: "playStateAtom",
  default: false
});

const App = ({}) => {
  const [playState, setPlayState] = useRecoilState(playStateAtom);
  // const [nowPlaying, setNowPlaying] = useRecoilState(0);
  const [config] = useRecoilState(configAtom);

  const handlePlay = () => {
    setPlayState(true);
  };

  const handlePause = () => {
    setPlayState(false);
  };

  return (
    <div>
      <div>{playState}</div>
      <section className={styles.app}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </section>
      <section className={styles.timersList}>
        {config.map((_, index) => {
          <div>{index}</div>;
        })}
      </section>
    </div>
  );
};

export default App;
