import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider as ReduxProvider, useSelector} from 'react-redux'
import store from "./store";
import {DepartmentsTree} from "./components/DepartmentsTree/DepartmentsTree";
import './styles/index.scss'
import ChatWidget from "./classifier-widget";

const App = () => {
  return <BrowserRouter>
    <ReduxProvider store={store}>
      <Switch>
        <Route path="/classifier" component={ChatWidget}/>
        <Route path="/" component={DepartmentsTree}/>
      </Switch>
    </ReduxProvider>
  </BrowserRouter>
};

export default App;
