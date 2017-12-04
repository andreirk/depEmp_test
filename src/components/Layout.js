import React from 'react';
import Sidebar from "./Sidebar";
import {Route, Switch} from "react-router-dom";
import 'react-table/react-table.css'

const Layout = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-2">
        <Sidebar/>
      </div>
      <div className="col-md-10">
        <Switch>
          <Route path="/dashboard/1" component={() => <div>Component1</div>}/>
        </Switch>
        <Switch>
          <Route path="/dashboard/2" component={() => <div>Component2</div>}/>
        </Switch>
      </div>
    </div>

  </div>
);

export default Layout;
