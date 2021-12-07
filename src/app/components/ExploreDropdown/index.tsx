import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
}

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkButton = (props: LinkButtonProps) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.linkButton}`}
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
    <section className={`${styles.wrap} ${props.className}`}>
      <div className={styles.templates}>
        {templates.map((template, index) => {
          return (
            <LinkButton key={index} href={"template.url"}>
              {template.name}
            </LinkButton>
          );
        })}
      </div>
      <LinkButton href={""}>Suggest template</LinkButton>
    </section>
  );
};

export default ExploreDropdown;
