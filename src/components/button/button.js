import React from 'react'
import { Link } from 'react-router-dom'

const button = (props)=>{
    return(
        <li className="nav-item">
        <Link className="nav-link" to={props.href}>{props.children}<span className="sr-only">(current)</span></Link>
      </li>

    )
}

export default button