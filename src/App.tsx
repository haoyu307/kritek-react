import React from "react";
import { Provider } from "react-redux";
// *
import store from "./store";
import Crud from "./crud";
// * styles
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Crud />
    </Provider>
  );
}

export default App;
