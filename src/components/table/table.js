import React, {Component} from 'react'
import Row from './row/row'
import './table.css'

 class table extends Component {

    state = {
        sortedData: [],
        lastSortedField:"",
        sortfieldAsc:true

    }

    componentDidMount(){console.log("Table component did Mount")

        this.sortDataHandler("OBJECTID", "ASC")
        this.setState({sortfieldAsc:true})
        //this.setState({sortedData:this.props.gisData})

};

    componentDidUpdate(){console.log("Table component did update")};

    sortDataHandler(field, order){
        let sortDataList=[]
        let sortField
        //let order = sortOrder
        if(order=== "ASC"){
            sortDataList = [...this.props.gisData.sort((a,b)=>{
            if(a.attributes[field]<b.attributes[field]){
                return -1
            }
            else if(a.attributes[field]>b.attributes[field]){
                return 1
            }
            return 0
        
        })]

        sortField = false
    
    }else if(order === "DESC"){
                sortDataList = [...this.props.gisData.sort((a,b)=>{
                if(a.attributes[field]<b.attributes[field]){
                    return 1
                }
                else if(a.attributes[field]>b.attributes[field]){
                    return -1
                }
                return 0
            
            })]
            sortField = true
        }
        this.setState({sortedData:sortDataList, lastSortedField:field, sortfieldAsc:sortField})
    }

    render(){
        const gisData = [...this.state.sortedData]//[...this.props.gisData]
        const fields = [...this.props.fieldList]
        const rows = gisData.map((row,key)=>{
            //console.log(row)
            return(
                <Row key={row.attributes.OBJECTID}
                    attributes={row.attributes}>
                </Row>
            )
        })
       // console.log(gisData)
        console.log("Table Render")
        //const attributes = {...this.props.gisData[0].attributes}
           const headerRow = fields.filter(field=>field !== "Shape").map((data, key)=>
           <React.Fragment>
           <th key={key} scope="col">
            <div className="dropdown">
            <div className="head-dropbtn">
           {data}
           <div className = "dropdown-content">
               <div className = "sort-div" onClick={()=>this.sortDataHandler(data, "ASC")}>ASC</div>
               <div className = "sort-div" onClick={()=>this.sortDataHandler(data, "DESC")}>DESC</div>
            </div>
           </div>
           </div>
           </th>
           </React.Fragment>
           )
            console.log(this.props.fieldList)
        return (
            <table className="table table-hover">
                <thead className="thead-dark">
                <tr>
                {headerRow}
                </tr>
                </thead>

                <tbody>
                    {rows}
                </tbody>
            </table>
        )

    }

}
export default table