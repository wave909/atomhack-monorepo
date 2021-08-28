import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider as ReduxProvider, useSelector} from 'react-redux'
import store from "./store";
import ChatWidget from "./classifier-widget";

const App = () => {
  return <BrowserRouter>
    <ReduxProvider store={store}>
      <Route path="/" component={ChatWidget}/>
      <Route path="/classifier" component={ChatWidget}/>
    </ReduxProvider>
  </BrowserRouter>
};

export default App;
