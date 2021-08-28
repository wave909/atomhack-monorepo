import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider as ReduxProvider, useSelector} from 'react-redux'
import store from "./store";
import {DepartmentsTree} from "./components/DepartmentsTree/DepartmentsTree";
import './styles/index.scss'

const App = () => {
  return <BrowserRouter>
    <ReduxProvider store={store}>
      <Route path="/" component={DepartmentsTree}/>
    </ReduxProvider>
  </BrowserRouter>
};

export default App;
