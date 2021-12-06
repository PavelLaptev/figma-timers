import * as React from "react";
import useStore from "./useStore";
import styles from "./app.module.scss";

import writeToStorage from "./utils/writeToStorage";
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
    resetTimers,
    setConfigName,
    setConfigDescription
  } = useStore();

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    writeToStorage(config);
  };

  const handleReset = () => {
    resetTimers(initialConfig.timers);
    writeToStorage(initialConfig);
  };

  const haandleNameChange = e => {
    console.log(e.target.innerText);
    setConfigName(e.target.innerText);
    writeToStorage(config);
  };

  const haandleDescriptionChange = e => {
    setConfigDescription(e.target.innerText);
    writeToStorage(config);
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
    onmessage = event => {
      if (event.data.pluginMessage.data) {
        setConfig(event.data.pluginMessage.data);
      }
    };

    const configDeepCopy = JSON.parse(JSON.stringify(initialConfig));
    setConfig(configDeepCopy);
    writeToStorage(configDeepCopy);
  }, [initialConfig]);

  return config ? (
    <div className={`${styles.darkTheme} ${styles.app}`}>
      <section className={styles.header}>
        <div className={styles.header_title}>
          <h1
            contentEditable
            suppressContentEditableWarning
            onInput={haandleNameChange}
          >
            {initialConfig.name}
          </h1>
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
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={haandleDescriptionChange}
        >
          {initialConfig.description}
        </p>
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
