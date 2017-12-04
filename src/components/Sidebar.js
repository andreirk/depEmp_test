import React from 'react'
import {NavLink, Link} from "react-router-dom";



const Sidebar = (props) => {

  return (
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink to="/dashboard/department" className='side-bar-item' >
            Department
          </NavLink>
        </li>
          <li className="list-group-item">
            <NavLink to="/dashboard/employees" className='side-bar-item' >
              Employee
            </NavLink>
          </li>
      </ul>
  )
}

export default Sidebar