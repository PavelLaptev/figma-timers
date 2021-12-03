import * as React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";

import Timer from "./components/Timer";
import styles from "./app.module.scss";

console.clear();

const config = atom({
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

const App = ({}) => {
  const handlePlay = () => {
    // setPlayState(true);
  };

  const handlePause = () => {
    // setPlayState(false);
  };

  return (
    <RecoilRoot>
      <div>
        <section className={styles.app}>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
        </section>
        <section className={styles.timersList}>
          {/* {mainProps.timerConfig.map((_, index) => {
          return <TimerItem index={index} key={`timer-${index}`} />;
        })} */}
        </section>
      </div>
    </RecoilRoot>
  );
};

export default App;
