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
  const [draggableState, setDraggableState] = React.useState(true);
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

      // if (newTimeConfig.length < nowPlaying + 1) {
      //   setPlayState(false);
      // }

      if (playState && nowPlaying === props.index) {
        if (!(joinedTime + 1)) {
          setNowPlaying(props.index + 1);
          return;
        }

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

    return (
      <section
        draggable={draggableState}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={styles.draggableWrap}
        data-index={props.index}
      >
        <div
          className={`${styles.timer} ${dragOverState ? styles.dragOver : ""} ${
            isDraggingState ? styles.dragging : ""
          }`}
        >
          <h3>{newTimeConfig[props.index].label}</h3>
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
    setDraggableState(false);
  };

  const handlePause = () => {
    setPlayState(false);
    setDraggableState(true);
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
