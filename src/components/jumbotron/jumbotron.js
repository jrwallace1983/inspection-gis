import React from 'react'

const Jumbotron= (props)=> {

    return (
        <React.Fragment>
         <div className="jumbotron">
            {props.children}
         </div> 
        </React.Fragment>
    )
}
export default Jumbotron
