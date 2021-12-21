import * as React from "react";
import useStore from "./useStore";

import globalStyles from "./styles/base.scss";
import styles from "./app.module.scss";

import writeToStorage from "./utils/writeToStorage";

import ExploreDropdown from "./components/ExploreDropdown";
import Resizer from "./components/Resizer";
import Button from "./components/Button";
import Timer from "./components/Timer";
import ShortView from "./components/ShortView";
import Loader from "./components/Loader";

console.clear();

////////////////////////
//////// AUDIO /////////
////////////////////////

const middleSound = new Audio(
  "https://github.com/PavelLaptev/figma-timers/raw/main/src/app/components/Timer/assets/microwave-sound.mp3"
);

const endSound = new Audio(
  "https://github.com/PavelLaptev/figma-timers/raw/main/src/app/components/Timer/assets/final1.mp3"
);

const initialState = {
  name: `⏰ Welcome to Timers`,
  description: `Use Timers when you need to divide a large task into smaller pieces and keep within the time frame of each one. Create your own timers or use templates. You can edit this text, the main name and even suggest your own timers. The plugin also has AutoSave feature. Have fun!`,
  isMuted: false,
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
} as ConfigProps;

const App = ({}) => {
  const [initialConfig, setInitialConfig] = React.useState(null);

  const {
    config,
    setConfig,
    isPlaying,
    setIsPlaying,
    resetTimers,
    setConfigName,
    setConfigDescription,
    hideExploreDropdown,
    toggleExploreDropdown,
    setFrameSize,
    setMuteSound,
    isMuted,
    isShort,
    setIsShort
  } = useStore();

  ////////////////////////////
  ///// CONTROL BUTTONS //////
  ////////////////////////////

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
    middleSound.volume = !isMuted ? 1 : 0;
    endSound.volume = !isMuted ? 1 : 0;
  }, [isMuted, setMuteSound]);

  React.useEffect(() => {
    middleSound.load();
    endSound.load();
    document.body.classList.add(styles.darkTheme);
  }, []);

  React.useEffect(() => {
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

      if (
        event.data.pluginMessage.type === "read-from-storage" &&
        !event.data.pluginMessage.data
      ) {
        setInitialConfig(initialState);
      }
    };

    const configDeepCopy = JSON.parse(JSON.stringify(initialConfig));
    setConfig(configDeepCopy);
    writeToStorage(configDeepCopy);
  }, [initialConfig]);

  ///////////////////////////
  /////////// REF ///////////
  ///////////////////////////

  const appRef = React.useCallback(
    el => {
      if (el !== null) {
        let frameSize =
          parseFloat(
            window.getComputedStyle(el).getPropertyValue("padding-top")
          ) * 2;

        [...el.children].forEach(element => {
          const style = window.getComputedStyle(element);

          frameSize +=
            element.clientHeight +
            parseFloat(style.getPropertyValue("margin-bottom")) +
            parseFloat(style.getPropertyValue("margin-top"));
        });

        setFrameSize(frameSize);
      }
    },
    [config]
  );

  ///////////////////////////
  ///////// RENDER //////////
  ///////////////////////////

  return (
    <section
      ref={appRef}
      className={`${styles.app} ${isShort ? styles.shortApp : ""}`}
      style={{
        overflow: hideExploreDropdown ? "visible" : "hidden"
      }}
    >
      {config ? (
        <>
          <ShortView
            style={{
              display: !isShort ? "none" : "block"
            }}
          />

          <div
            style={{
              display: isShort ? "none" : "block"
            }}
          >
            <Resizer />

            <div
              className={`${styles.dimBackground} ${
                hideExploreDropdown ? styles.hideBackground : ""
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

                  <div className={styles.dropdown}>
                    <Button
                      onClick={toggleExploreDropdown}
                      icon={"explore"}
                      size="small"
                    />
                    <ExploreDropdown
                      className={`${hideExploreDropdown ? styles.hide : ""}`}
                      onClick={handleSelectTemplate}
                    />
                  </div>
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
                onClick={() => setIsPlaying(!isPlaying)}
                icon={isPlaying ? "pause" : "play"}
                size="large"
                className={isPlaying ? globalStyles.activeButton : ""}
              />
              <Button onClick={handleReset} icon="reset" size="large" />
              <Button
                onClick={setMuteSound}
                icon={isMuted ? "sound-off" : "sound-on"}
                size="large"
                className={isMuted ? globalStyles.activeButton : ""}
              />
              <Button onClick={setIsShort} icon="fold" size="large" />
            </section>
            <section className={`${styles.timersList} timer-list`}>
              {config.timers.map((_, index) => {
                return (
                  <Timer
                    sound={{ middle: middleSound, end: endSound }}
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
              className={`${styles.addTimer} ${
                isPlaying ? styles.disabled : ""
              }`}
              icon="plus"
              onClick={handleAddNewTimer}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default App;
