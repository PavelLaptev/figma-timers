import * as React from "react";
import styles from "./styles.module.scss";

import useStore from "../../useStore";

interface Props {
  className?: any;
  index: number;
}

const Switcher: React.FunctionComponent<Props> = props => {
  const { config } = useStore();

  return (
    <div
      className={`${styles.switcher} ${props.className} ${
        !config.timers[props.index].skip ? styles.active : ""
      }`}
    />
  );
};

Switcher.defaultProps = {
  className: ""
} as Partial<Props>;

export default Switcher;
