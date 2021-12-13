import * as React from "react";
import styles from "./styles.module.scss";

import Icon from "../Icon";

import downloadJSON from "../../utils/downloadJSON";

interface Props {
  className?: any;
  icon?: IconTypes;
  type?: "default" | "download" | "upload";
  size?: "large" | "medium" | "small";
  noHeight?: boolean;
  file?: {
    content: string;
    name: string;
  };
  style?: React.CSSProperties;
  onClick?: (e) => void;
  onFileUpload?: (file) => void;
}

const Button: React.FunctionComponent<Props> = props => {
  const inputRef = React.useRef(null);

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

  const handleClick = e => {
    if (props.type === "download") {
      downloadJSON(props.file.content, props.file.name);
    }
    if (props.type === "upload") {
      inputRef.current.click();
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const handleFileUpload = e => {
    props.onFileUpload(e.target.files[0]);
    e.target.value = null;
  };

  return props.type !== "upload" ? (
    <button
      onClick={handleClick}
      style={props.style}
      className={`${props.className} ${styles.button} ${styles[props.size]} ${
        props.noHeight ? styles.noHeight : ""
      }`}
    >
      <BtnIcon />
      <Text />
    </button>
  ) : (
    <div className={`${props.className} ${styles.wrap} ${styles[props.size]}`}>
      <input
        type="file"
        onChange={handleFileUpload}
        className={styles.fileInput}
        ref={inputRef}
      />
      <button
        onClick={handleClick}
        className={`${props.className} ${styles.button} ${styles[props.size]}`}
      >
        <BtnIcon />
        <Text />
      </button>
    </div>
  );
};

Button.defaultProps = {
  className: "",
  type: "default",
  size: "medium",
  noHeight: false
} as Partial<Props>;

export default Button;
