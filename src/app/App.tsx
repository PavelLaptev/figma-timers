import * as React from "react";
import useStore from "./useStore";
import styles from "./app.module.scss";

import Button from "./components/Button";
import Timer from "./components/Timer";

console.clear();

const App = ({}) => {
  const [initialConfig, setInitialConfig] = React.useState({
    name: "UX Whiteboard Challange Interview",
    description:
      "Ask questions to specify the challenge. Ask about the users and their context. Write down the main steps of the story.",
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
    resetTimers(initialConfig.timers);
  };

  const handleFileUpload = file => {
    const reader = new FileReader();
    reader.onload = () => {
      const config = JSON.parse(reader.result as string);
      console.log("uploaded config: ", config);
      setInitialConfig(config);
    };
    reader.readAsText(file);
  };

  React.useEffect(() => {
    const configDeepCopy = JSON.parse(JSON.stringify(initialConfig));
    setConfig(configDeepCopy);
  }, [initialConfig]);

  return config ? (
    <div className={`${styles.darkTheme} ${styles.app}`}>
      <section className={styles.header}>
        <div className={styles.header_title}>
          <h1>{config.name}</h1>
          <div className={styles.header_buttons}>
            <Button
              icon={"save"}
              size="small"
              type="download"
              file={{
                content: config,
                name: config.name
              }}
            />
            <Button
              type="upload"
              icon={"load"}
              size="small"
              onFileUpload={handleFileUpload}
            />

            <Button
              onClick={() => {
                console.log("dummy");
              }}
              icon={"explore"}
              size="small"
            />
          </div>
        </div>
        <p>{config.description}</p>
      </section>
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
        {config.timers.map((_, index) => {
          return <Timer key={`timer-${index}`} index={index} />;
        })}
      </section>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default App;
