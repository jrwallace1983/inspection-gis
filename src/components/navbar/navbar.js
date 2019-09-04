import React from 'react'
import NavbarContainer from './nav-button-container/nav-button-container'

const navbar = (props)=>{
    return(
        <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
            <NavbarContainer></NavbarContainer>      
        </nav>
      </React.Fragment>
    )
}
export default navbar