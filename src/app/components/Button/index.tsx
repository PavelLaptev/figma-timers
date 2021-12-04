import * as React from "react";
import styles from "./styles.module.scss";

import Icon from "../Icon";

interface Props {
  className?: any;
  icon?: IconTypes;
  type?: string;
  size?: "large" | "medium";

  onClick?: (e) => void;
}

const Button: React.FunctionComponent<Props> = props => {
  const BtnIcon = () => {
    if (props.icon) {
      return <Icon name={props.icon} />;
    }
    return null;
  };

  const Text = () => {
    if (props.children) {
      return <span className={styles.text}>{props.children}</span>;
    }
    return null;
  };

  return (
    <button
      onClick={props.onClick}
      className={`${styles.button} ${props.className} ${styles[props.size]}`}
    >
      <BtnIcon />
      <Text />
    </button>
  );
};

Button.defaultProps = {
  className: "",
  size: "medium"
} as Partial<Props>;

export default Button;
