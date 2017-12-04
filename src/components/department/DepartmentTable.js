import React, {Component} from 'react';
import {departmentListSelector, fetchAllDepartments} from "../../redux/ducks/departmens";
import {connect} from "react-redux";


class DepartmentTable extends Component {

  componentDidMount(){
    this.props.fetchAllDepartments();
  }

  render() {

    return (
        <div className="row">
          Departments table
        </div>
    );
  }
}

DepartmentTable.propTypes = {};
DepartmentTable.defaultProps = {};

export default connect((state) => {
  return {
    departments: departmentListSelector(state)
  }
}, {fetchAllDepartments}) (DepartmentTable);
