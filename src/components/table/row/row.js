import React from 'react'
import TableData from '../table-data/table-data'

const row = (props)=>{
    console.log(props.attributes)
    const gisData = {...props.attributes}
    console.log(Object.keys(gisData))

    const data = Object.keys(gisData).map((attribute, key)=>{
        console.log(attribute)
        return(
        <React.Fragment>
        <TableData>{gisData[attribute]}</TableData>
        </React.Fragment>
        );

    });

    return (
        <tr className="table-light">
            {data}
        </tr>
    );
}
export default row
