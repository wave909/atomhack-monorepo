import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider as ReduxProvider, useSelector} from 'react-redux'
import store from "./store";

const App = () => {
  return <BrowserRouter>
    <ReduxProvider store={store}>
      <Route path="/" component={DepartmentsTree}/>
    </ReduxProvider>
  </BrowserRouter>
};

export default App;
