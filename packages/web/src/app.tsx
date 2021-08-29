import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider as ReduxProvider} from 'react-redux'
import store from "./store";
import {DepartmentsTree} from "./components/DepartmentsTree/DepartmentsTree";
import './styles/index.scss'
// @ts-ignore
import {SheduleManager} from "./shedule-manager/SheduleManager";

const App = () => {
  return <BrowserRouter>
    <ReduxProvider store={store}>
      <Switch>
        <Route path="/shedule" component={SheduleManager}/>
        <Route path="/" component={DepartmentsTree}/>
      </Switch>
    </ReduxProvider>
  </BrowserRouter>
};

export default App;
