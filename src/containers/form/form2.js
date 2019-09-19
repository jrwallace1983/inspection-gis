import React, {useState, useEffect} from 'react';
import Option from './option/option'
import axios from 'axios';
import MapTest from '../../components/leaflet-component/maptest'


const Form2 = (props)=> {

    const [metroline, setMetroline] = useState("");
    const [station, setStation] = useState("");
    const [dataUrl, setDataUrl] = useState("https://maps.lacity.org/lahub/rest/services/Metro_Bus_and_Rail/MapServer/1/query?")
    

    const metrolineHandler = (e)=>{
        setMetroline(e.target.value)
    }

    const stationHandler = (e)=>{
        setStation(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const person = "this is a test"
        props.querySet(metroline, station)}

        console.log("Form Render")


        const stationSelectlist = props.stationList.map((station,key)=>
        <Option key={key}>{station}</Option>
)
console.log(props.metrolinelist)

const metroLineSelectlist = props.metrolineList.map((metroline,key)=>
        <Option key={key}>{metroline}</Option>
)

        return(
            <React.Fragment>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label className="col-form-label col-form-label-lg">Metroline</label>
                    <select className="form-control form-control-lg" onChange={metrolineHandler} value={metroline}>
                        <option> </option>
                        {metroLineSelectlist}
                    </select>
                </div>
                <div className="form-group">
                    <label className="col-form-label col-form-label-lg">Station</label>
                    <select className="form-control form-control-lg" onChange={stationHandler} value={station}>
                        <option></option>
                        {stationSelectlist}
                    </select>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Filter</button>
                </div>
                </div>
                
            </form>
            <MapTest gisData={props.gisData}></MapTest>
            </React.Fragment>
        )
    
}
export default Form2