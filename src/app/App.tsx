import * as React from "react";
import useStore from "./useStore";

import styles from "./app.module.scss";

import writeToStorage from "./utils/writeToStorage";

import ExploreDropdown from "./components/ExploreDropdown";
import Resizer from "./components/Resizer";
import Button from "./components/Button";
import Timer from "./components/Timer";

console.clear();

const App = ({}) => {
  const [initialConfig, setInitialConfig] = React.useState({
    name: `Welcome to Timers ⏰`,
    description: `Use Timers when you need to divide a large task into smaller pieces and keep within the time frame of each one. Create your own timers or use templates. You can edit this text, the main name and even suggest your own timers. The plugin also has AutoSave feature. Have fun!`,
    sound: false,
    timers: [
      {
        name: "Read the description",
        time: {
          minutes: 0,
          seconds: 20
        },
        skip: false
      },
      {
        name: "Play around",
        time: {
          minutes: 1,
          seconds: 0
        },
        skip: false
      },
      {
        name: "Leave a like",
        time: {
          minutes: 0,
          seconds: 15
        },
        skip: false
      }
    ]
  } as ConfigProps);

  const {
    config,
    setConfig,
    isPlaying,
    setIsPlaying,
    resetTimers,
    setConfigName,
    setConfigDescription,
    hideExploreDropdown,
    toggleExploreDropdown
  } = useStore();

  ////////////////////////////
  ///// CONTROL BUTTONS //////
  ////////////////////////////
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    writeToStorage(config);
  };

  const handleReset = () => {
    resetTimers(initialConfig.timers);
    writeToStorage(initialConfig);
  };

  //////////////////////////////
  /////// HANDLE HEADER ////////
  //////////////////////////////

  const haandleNameChange = e => {
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
      setInitialConfig(config);
      writeToStorage(config);
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    writeToStorage(config);
    setInitialConfig(JSON.parse(JSON.stringify(config)));
  };

  const handleSelectTemplate = template => {
    toggleExploreDropdown();
    setInitialConfig(template);
    writeToStorage(template);
  };

  const handleAddNewTimer = () => {
    const newTimer = {
      name: "New timer",
      time: {
        minutes: 1,
        seconds: 0
      },
      skip: false
    };
    setInitialConfig({
      ...config,
      timers: [...config.timers, newTimer]
    });
  };

  ///////////////////////////
  /////// USE EFFECT ////////
  ///////////////////////////
  React.useEffect(() => {
    document.body.classList.add(styles.darkTheme);

    onmessage = event => {
      console.log(event.data);
      if (
        event.data.pluginMessage.type === "read-from-storage" &&
        event.data.pluginMessage.data
      ) {
        setInitialConfig(
          JSON.parse(JSON.stringify(event.data.pluginMessage.data))
        );
      }
    };

    const configDeepCopy = JSON.parse(JSON.stringify(initialConfig));
    setConfig(configDeepCopy);
    writeToStorage(configDeepCopy);
  }, [initialConfig]);

  ///////////////////////////
  ///////// RENDER //////////
  ///////////////////////////
  return config ? (
    <div
      className={`${styles.app}`}
      style={{
        overflow: hideExploreDropdown ? "visible" : "hidden"
      }}
    >
      <Resizer />

      <ExploreDropdown
        className={`${hideExploreDropdown ? styles.hide : ""}`}
        onClick={handleSelectTemplate}
      />

      <div
        className={`${styles.dimBackground} ${
          hideExploreDropdown ? styles.hide : ""
        }`}
        onClick={toggleExploreDropdown}
      />

      <section className={styles.header}>
        <div className={styles.header_title}>
          <div className={styles.header_buttons}>
            <Button
              icon={"save"}
              size="small"
              type="download"
              file={{
                content: config,
                name: config.name
              }}
              onClick={handleSave}
            />
            <Button
              type="upload"
              icon={"load"}
              size="small"
              onFileUpload={handleFileUpload}
            />

            <Button
              onClick={toggleExploreDropdown}
              icon={"explore"}
              size="small"
            />
          </div>
          <h1
            contentEditable
            suppressContentEditableWarning
            onInput={haandleNameChange}
          >
            {initialConfig.name}
          </h1>
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
      <section className={`${styles.timersList} timer-list`}>
        {config.timers.map((_, index) => {
          return (
            <Timer
              initialConfig={initialConfig}
              key={`timer-${index}`}
              index={index}
              lastTimer={index === config.timers.length - 1}
            />
          );
        })}
      </section>
      <Button
        size="large"
        className={styles.addTimer}
        icon="plus"
        onClick={handleAddNewTimer}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default App;
