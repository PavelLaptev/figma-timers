import * as React from "react";
import * as ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import "./styles/base.scss";
import App from "./App";

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("react-page")
);
