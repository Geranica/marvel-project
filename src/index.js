import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import MarvelService from "./services/MarvelService";
import "./style/style.scss";

const marvelService = new MarvelService();
marvelService.getAllCharacters().then (result => console.log (result));
marvelService.getCharacter (1017295).then (result => console.log (result.data.results));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
