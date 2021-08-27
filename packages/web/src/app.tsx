import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider as ReduxProvider, useSelector} from 'react-redux'
import store from "./store";

const App = () => {
  return <BrowserRouter>
    <ReduxProvider store={store}>
      <div>APP</div>
    </ReduxProvider>
  </BrowserRouter>
};

export default App;
