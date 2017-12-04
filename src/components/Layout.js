import React from 'react';
import Sidebar from "./Sidebar";
import DepartmentTable from "./department/DepartmentTable";
import EmployeeTable from "./employee/EmployeeTable";
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
          <Route path="/dashboard/department" component={DepartmentTable}/>
        </Switch>
        <Switch>
          <Route path="/dashboard/employees" component={EmployeeTable}/>
        </Switch>
      </div>
    </div>

  </div>
);

export default Layout;
