import React, {Component} from 'react';
import Option from './option/option'
import axios from 'axios';


class Form extends Component {
    
    constructor(props){
        super(props)
    }
    state={
        
        metroline:"",
        station:"",

        dataUrl:"http://maps.lacity.org/lahub/rest/services/Metro_Bus_and_Rail/MapServer/1/query?"
    }

    metrolineHandler = (e)=>{
        this.setState({metroline:e.target.value})
    }

    stationHandler = (e)=>{
        this.setState({station:e.target.value})
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        const person = "this is a test"
        this.props.querySet(this.state.metroline, this.state.station)}

    componentDidMount(){
        console.log("Form Component Did Mount")



    }

    componentDidUpdate(){
        console.log("Form Component did Update")
    }

    render(){
        console.log("Form Render")


        const stationSelectlist = this.props.stationList.map((station,key)=>
        <Option key={key}>{station}</Option>
)
console.log(this.props.metrolinelist)

const metroLineSelectlist = this.props.metrolineList.map((metroline,key)=>
        <Option key={key}>{metroline}</Option>
)

        return(

            <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                    <label className="col-form-label col-form-label-lg">Metroline</label>
                    <select className="form-control form-control-lg" onChange={this.metrolineHandler} value={this.state.metroline}>
                        <option> </option>
                        {metroLineSelectlist}
                    </select>
                </div>
                <div className="form-group">
                    <label className="col-form-label col-form-label-lg">Station</label>
                    <select className="form-control form-control-lg" onChange={this.stationHandler} value={this.state.station}>
                        <option></option>
                        {stationSelectlist}
                    </select>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Filter</button>
                </div>
                </div>
                
            </form>
        )
    }
}
export default Form