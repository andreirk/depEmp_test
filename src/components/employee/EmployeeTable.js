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
import {isNumeric} from "../../redux/ducks/utils";

class EmployeeTable extends Component {

  componentDidMount(){
    const { employees } = this.props;
    const { departments } = this.props;

    if(employees.length === 0) this.props.fetchAllEmployees();

    if(departments.length === 0) this.props.fetchAllDepartments();
  }

  renderEditable = (cellInfo) => {
    const { employees } = this.props;
    const { departments } = this.props;
    let department;
    let columnName = employees[cellInfo.index][cellInfo.column.id]
    if(isNumeric(columnName))  department =  departments.find(el => el.id === parseInt(columnName));
    columnName = department ? department.name : columnName
    const editable = cellInfo.column.id !== 'departmentId'


    return (
        <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...employees];
              const row = cellInfo.index
              const field = cellInfo.index
              data[row][field] = e.target.innerHTML;

              this.props.chengeEmployee( data);
            }}
            dangerouslySetInnerHTML={{
              __html: columnName
            }}
        />
    );
  }

  render() {

    const { employees } = this.props;
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


