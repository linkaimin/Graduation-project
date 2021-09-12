import './logo.svg';
import React,{useState} from 'react';
import VoteIndex from './page/VoteIndex' 
import ChartDetail from './page/ChartDetail' 
import VoteLayout from './VoteLayout'
import { HashRouter, Route,Switch } from 'react-router-dom'
import './App.css';
function App() {
  return (
    <div className="App">
      <HashRouter>
      <Switch>
    <Route exact path="/:role/:id" component={VoteIndex}/>
    <Route exact  path="/:id" component={ChartDetail}/>
    <Route exact  path="/" component={VoteLayout}/>
    </Switch>
  </HashRouter>
    </div>
  );
}

export default App;
