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
    mainProps.timerConfig
  );
  const [playState, setPlayState] = React.useState(false);
  const [nowPlaying, setNowPlaying] = React.useState(0);

  const TimerItem = (props: TimerItemProps) => {
    const [dragOverState, setDragOverState] = React.useState(false);
    const [isDraggingState, setIsDraggingState] = React.useState(false);

    React.useEffect(() => {
      const joinedTime =
        Number(newTimeConfig[props.index].time.minutes) * 60 +
        Number(newTimeConfig[props.index].time.seconds) -
        1;
      const splittedTime = {
        minutes: Math.floor(joinedTime / 60),
        seconds: joinedTime % 60
      };

      // Check if it is the lasat timer
      if (newTimeConfig.length < nowPlaying + 1) {
        setPlayState(false);
      }

      // Chceck if it is playing and run only one timer
      if (playState && nowPlaying === props.index) {
        // If the tied is over switch to the next timer
        if (!(joinedTime + 1)) {
          setNowPlaying(props.index + 1);
          return;
        }

        // Run the interval for the timer
        const intervalId = setInterval(() => {
          setNewTimeConfig(prevState => {
            const newState = [...prevState];
            newState[props.index].time = splittedTime;
            return newState;
          });

          console.log(splittedTime);
        }, 1000);

        return () => {
          clearInterval(intervalId);
        };
      }
    }, [newTimeConfig[props.index]]);

    /////////////////////
    // HANDLE DRAGGING //
    /////////////////////

    const handleDragStart = e => {
      setIsDraggingState(true);
      e.dataTransfer.setData("index", props.index);
    };

    const handleDragEnd = () => {
      setIsDraggingState(false);
    };

    const handleDragOver = e => {
      e.preventDefault();
      setDragOverState(true);
    };

    const handleDragLeave = () => {
      setDragOverState(false);
    };

    const handleDrop = e => {
      setDragOverState(false);
      const draggedIndex = Number(e.dataTransfer.getData("index"));

      setNewTimeConfig(prevState => {
        const newState = [...prevState];
        const draggedItem = newState[draggedIndex];
        newState.splice(draggedIndex, 1);
        newState.splice(props.index, 0, draggedItem);
        return newState;
      });

      setNowPlaying(0);
    };

    ///////////////////
    // HANDLE INPUTS //
    ///////////////////

    const handlleLabellChange = e => {
      const newState = [...newTimeConfig];
      newState[props.index].name = e.target.value;
      setNewTimeConfig(newState);
    };

    return (
      <section
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${styles.draggableWrap} ${
          playState ? styles.disabled : ""
        }`}
      >
        <div
          className={`${styles.timer} ${dragOverState ? styles.dragOver : ""} ${
            isDraggingState ? styles.dragging : ""
          }`}
        >
          <input
            className={styles.timer_label}
            value={newTimeConfig[props.index].name}
            onChange={handlleLabellChange}
          />
          <h3>
            {newTimeConfig[props.index].time.minutes}:
            {newTimeConfig[props.index].time.seconds}
          </h3>
        </div>
      </section>
    );
  };

  const handlePlay = () => {
    setPlayState(true);
  };

  const handlePause = () => {
    setPlayState(false);
  };

  return (
    <div>
      <section className={""}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </section>
      <section className={styles.timersList}>
        {mainProps.timerConfig.map((_, index) => {
          return <TimerItem index={index} key={`timer-${index}`} />;
        })}
      </section>
    </div>
  );
};

export default Timers;
