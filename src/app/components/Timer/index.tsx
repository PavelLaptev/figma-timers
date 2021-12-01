import * as React from "react";

import styles from "./styles.module.scss";

interface TimerProps {
  timerConfig: Array<TimerConfigProps>;
}

interface TimerItemProps {
  index: number;
}

const Timers = (mainProps: TimerProps) => {
  const [newTimeConfig, setNewTimeConfig] = React.useState(
    mainProps.timerConfig.map(c => c.time)
  );
  const [newPlayConfig, setNewPlayConfig] = React.useState(
    mainProps.timerConfig.map(c => c.play)
  );

  console.log("newTimeConfig", newPlayConfig);

  const TimerItem = (props: TimerItemProps) => {
    React.useEffect(() => {
      const joinedTime =
        Number(newTimeConfig[props.index].minutes) * 60 +
        Number(newTimeConfig[props.index].seconds) -
        1;
      const splittedTime = {
        minutes: Math.floor(joinedTime / 60),
        seconds: joinedTime % 60
      };

      if (newPlayConfig[props.index]) {
        if (!(joinedTime + 1)) {
          if (mainProps.timerConfig[props.index + 1]) {
            setNewPlayConfig(() => {
              console.log(`Der timer ${props.index} ist vorbei`);
              const newState = mainProps.timerConfig.map(_ => false);
              newState[props.index + 1] = true;
              return newState;
            });
          }
          return;
        }

        const intervalId = setInterval(() => {
          setNewTimeConfig(prevState => {
            const newState = [...prevState];
            newState[props.index] = splittedTime;
            return newState;
          });

          console.log(splittedTime);
        }, 1000);

        return () => {
          clearInterval(intervalId);
        };
      }
    }, [newTimeConfig[props.index]]);

    const isButtonsDisabled = () => {
      if (
        !(
          newTimeConfig[props.index].minutes +
          newTimeConfig[props.index].seconds
        )
      ) {
        return true;
      }

      if (
        newPlayConfig.includes(true) &&
        newPlayConfig.indexOf(true) !== props.index
      ) {
        return true;
      }

      return false;
    };

    const handlePlay = () => {
      setNewPlayConfig(prevState => {
        const newState = [...prevState];
        newState[props.index] = true;
        return newState;
      });
    };

    const handlePause = () => {
      setNewPlayConfig(prevState => {
        const newState = [...prevState];
        newState[props.index] = false;
        return newState;
      });
    };

    return (
      <div>
        <h2>{props.index}</h2>
        <h3>
          {newTimeConfig[props.index].minutes}:
          {newTimeConfig[props.index].seconds}
        </h3>
        <section className={isButtonsDisabled() ? styles.disabled : ""}>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
        </section>
      </div>
    );
  };

  return (
    <div>
      {mainProps.timerConfig.map((_, index) => {
        return <TimerItem index={index} key={`timer-${index}`} />;
      })}
    </div>
  );
};

export default Timers;
