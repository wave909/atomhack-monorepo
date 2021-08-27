import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider as ReduxProvider, useSelector} from 'react-redux'
import store from "./store";
import {DepartmentsTree} from "./components/DepartmentsTree/DepartmentsTree";
import '../src/styles/index.scss'

const App = () => {




  return <BrowserRouter>
    <ReduxProvider store={store}>
      <DepartmentsTree/>
    </ReduxProvider>
  </BrowserRouter>
};

export default App;
