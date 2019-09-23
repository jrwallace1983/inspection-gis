import React from 'react'
import Button from '../../button/button'
import {Link} from 'react-router-dom'

const navbarList = (props)=>{
    const buttonlist = [["Home", ""],["Table","table"], ["Form","form"],
    ["Map","map"], ["Counter", "counter"]]
    //const buttonlist = [{map:[{name:"Map"},{url:'wwww.google.com'}]},
    //{table:[{name:"table"},{url:'www.google.com'}]}]

    const mapButtons = buttonlist.map((button, key) =>
        <Button key={key} href={button[1]}>{button[0]}</Button>)
return(
<ul className="navbar-nav mr-auto" buttonlist={buttonlist}>
{mapButtons}
</ul>
)

}
export default navbarList