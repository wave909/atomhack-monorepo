import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Provider as ReduxProvider} from 'react-redux'
import store from "./store";
import GraphScreen from "./feature/graph/index";

const App = () => {
  return <BrowserRouter>
    <ReduxProvider store={store}>
      <Route path="/" component={GraphScreen}/>
    </ReduxProvider>
  </BrowserRouter>
};

export default App;
