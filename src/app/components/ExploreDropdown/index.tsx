import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  onClick?: (template) => void;
}

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const LinkButton = (props: LinkButtonProps) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.button} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
};

const ExploreDropdown = (props: Props) => {
  const [templates, setTemplates] = React.useState([]);

  React.useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/PavelLaptev/figma-timers/configs/index.json";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setTemplates(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={`${props.className} ${styles.wrap}`}>
      {templates.map((template, index) => {
        return (
          <LinkButton
            key={index}
            href={""}
            className={styles.linkButton}
            onClick={() => props.onClick(template)}
          >
            {template.name}
          </LinkButton>
        );
      })}
      <LinkButton
        href={"https://github.com/PavelLaptev/figma-timers/tree/configs"}
        className={styles.suggest}
      >
        Suggest template
      </LinkButton>
    </section>
  );
};

ExploreDropdown.defaultProps = {
  className: ""
};

export default ExploreDropdown;
