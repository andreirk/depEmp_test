import React, {Component} from 'react';
import {
  addEmployee,
  chengeEmployee,
  employeesListSelector,
  fetchAllEmployees} from "../../redux/ducks/employees";
import {departmentListSelector, fetchAllDepartments} from "../../redux/ducks/departmens";
import NewEmployeeForm from "./NewEmployeeForm";
import {connect} from "react-redux";
import ReactTable from 'react-table'

class EmployeeTable extends Component {

  componentDidMount(){
    this.props.fetchAllEmployees();
    this.props.fetchAllDepartments();
  }

  renderEditable = (cellInfo) => {
    console.log('---in render editagle--', cellInfo)
    const { employees } = this.props;
    return (
        <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...employees];
              const row = cellInfo.index
              const field = cellInfo.index
              data[row][field] = e.target.innerHTML;

              this.props.chengeEmployee( data);
            }}
            dangerouslySetInnerHTML={{
              __html: employees[cellInfo.index][cellInfo.column.id]
            }}
        />
    );
  }

  render() {

    const { employees } = this.props;
    console.log('emploees in render', employees)
    return (
        <div className="row">
          <div className="col-md-10">
            <ReactTable
                data={employees}
                columns={[

                  {
                    Header: "First Name",
                    accessor: "firstName",
                    Cell: this.renderEditable
                  },
                  {
                    Header: "Last Name",
                    accessor: "lastName",
                    Cell: this.renderEditable
                  },
                  {
                    Header: "Department id",
                    accessor: "departmentId",
                    Cell: this.renderEditable
                  }

                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
          </div>
          <div className="col-md-2">
            <NewEmployeeForm onSubmit={this.props.addEmployee} departments={this.props.departments}/>
          </div>
        </div>
    );
  }
}

EmployeeTable.propTypes = {};
EmployeeTable.defaultProps = {};

export default connect((state) => {
  return {
    employees: employeesListSelector(state),
    departments: departmentListSelector(state)
  }
}, {fetchAllEmployees,fetchAllDepartments, chengeEmployee, addEmployee}) (EmployeeTable);


