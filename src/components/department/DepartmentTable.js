import React, {Component} from 'react';
import {
  addDepartment,
  chengeDepartmentName, departmentListSelector,
  fetchAllDepartments
} from "../../redux/ducks/departmens";
import {connect} from "react-redux";
import ReactTable from 'react-table'
import NewDepartmentForm from "./NewDepartmentForm";


class DepartmentTable extends Component {
  constructor(props) {
    super();

    this.renderEditable = this.renderEditable.bind(this);
  }
  componentDidMount(){
    const { departments } = this.props;
    if(departments.length === 0) this.props.fetchAllDepartments();
  }

  renderEditable(cellInfo) {
    const { departments } = this.props;
    return (
        <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...departments];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.props.chengeDepartmentName(data);
            }}
            dangerouslySetInnerHTML={{
              __html: departments[cellInfo.index][cellInfo.column.id]
            }}
        />
    );
  }

  render() {

    const { departments } = this.props;
    console.log('departmensts in render', departments)
    return (
        <div className="row">
          <div className="col-md-10">
            <ReactTable
                data={departments}
                columns={[

                  {
                    Header: "Name",
                    accessor: "name",
                    Cell: this.renderEditable
                  }

                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
          </div>
          <div className="col-md-2">
            <NewDepartmentForm onSubmit={this.props.addDepartment}/>
          </div>
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
}, {fetchAllDepartments,chengeDepartmentName, addDepartment}) (DepartmentTable);
