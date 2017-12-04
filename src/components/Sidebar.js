import React from 'react'
import {NavLink, Link} from "react-router-dom";



const Sidebar = (props) => {

  return (
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink to="/dashboard/1" className='side-bar-item' >
            link1
          </NavLink>
        </li>
          <li className="list-group-item">
            <NavLink to="/dashboard/2" className='side-bar-item' >
             link2
            </NavLink>
          </li>
      </ul>
  )
}

export default Sidebar