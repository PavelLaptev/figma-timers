import * as React from "react";
import Timer from "./components/Timer";
// import styles from "./app.module.scss";

const App = ({}) => {
  return (
    <div>
      <Timer onComplete={time => console.log(time)} />
      <Timer onComplete={time => console.log(time)} />
    </div>
  );
};

export default App;
