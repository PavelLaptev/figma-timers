import * as React from "react";
import styles from "./styles.module.scss";

import icons from "./icons";

interface Props {
  className?: any;
  name: IconTypes;
}

const Icon: React.FunctionComponent<Props> = props => {
  return (
    <i className={`${props.className} ${styles.icon}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        fillRule="evenodd"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={icons[props.name]} fill="var(--white-clr)" />
      </svg>
    </i>
  );
};

Icon.defaultProps = {} as Partial<Props>;

export default Icon;
