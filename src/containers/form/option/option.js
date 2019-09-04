import React from 'react'

const option = (props)=>{
    return(
<React.Fragment>
<option>{props.children}</option>
</React.Fragment>
    )
}

export default option