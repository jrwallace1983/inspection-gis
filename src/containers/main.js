import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch, Link, HashRouter } from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions'
import Counter from '../components/counter/counter'
import Home from '../components/home/home'
import Navbar from '../components/navbar/navbar'
import Navbar2 from '../components/navbar/navbar2-bk'
import Form from '../containers/form/form'
import Form2 from '../containers/form/form2'
import Table from '../components/table/table'
import Mapleaflet from './leaflet-map/map'
import MapComponent from '../components/leaflet-component/map-component';
import MapTest from '../components/leaflet-component/maptest'

class Main extends Component{
    constructor(props){
        super(props)
    }

    state = {
        data:[],
        //query:"MetroLine = 'Expo Line'",
        fieldList:[],
        metrolineList:["Blue Line", "Expo Line"],
        stationList:["a", "b"],
        dataUrl:"https://maps.lacity.org/lahub/rest/services/Metro_Bus_and_Rail/MapServer/1/query?",
        markerPosition:[33.8, -117.8]//[49.8419, 24.0315]
            }

    componentDidMount(){
        console.log("Main component did mount")

        //This is to get Data
        let query = {params:{f:'json', outFields:'*', where:"1<>1", returnGeometry: "true",
        outSpatialReference:4326,
        orderByFields: "MetroLine"}}
        axios.get(this.state.dataUrl, query)
        .then(res=>{
            const newList = res.data.features.map((feature)=>{
                return feature//.attributes.MetroLine
            })
            this.setState({data:newList})
        })
        //This is to get field list
        axios.get("https://maps.lacity.org/lahub/rest/services/Metro_Bus_and_Rail/MapServer/1/?f=pjson")
        .then(res=>{

            //const fieldList = res.data.fields
            //console.log(fieldList)
            const fieldList = res.data.fields.map(field=>field.name)
            console.log(fieldList)
            this.setState({fieldList:fieldList})
        })

        let queryMetroline = {params:{f:'json', where:"1=1", returnGeometry: "false",
        outFields: "MetroLine", orderByFields: "MetroLine", returnDistinctValues: true}}
        axios.get(this.state.dataUrl, queryMetroline)
        .then(res=>{
            console.log("form first query Component did Mount")
            console.log(res.data.features)
            const newList = res.data.features.map((feature)=>{
                return feature.attributes.MetroLine
            })
            this.setState({metrolineList:newList})
        })

        let queryStation = {params:{f:'json', where:"1=1", returnGeometry: "false",
        outFields: "Station", orderByFields: "Station", returnDistinctValues: true}}
        axios.get(this.state.dataUrl, queryStation)
        .then(res=>{
            console.log("Form second query component did mount")
            console.log(res.data.features)
            const newList = res.data.features.map((feature)=>{
                return feature.attributes.Station
            })
            this.setState({stationList:newList})
        })

    }
    componentDidUpdate(prevState){
        console.log("Main Component DidUpdate");
        console.log(prevState)
    }

    querySet = (metroline, station)=>{
        let queryValue='';
        let operator ='';
        //if (metroline || station === null){operator = 'OR'}
        if (metroline && station){
            queryValue = `MetroLine = '${metroline}' AND Station = '${station}'`
        }else if(!station){
            queryValue = `MetroLine = '${metroline}'`
        }else if (!metroline){
            queryValue = `Station = '${station}'`
        }
        
        this.props.onChangeQuery(queryValue)
       //this.setState({query:query},()=>{
           //console.log(this.state.query)

        let query = {params:{f:'json', outFields:'*', where: queryValue, returnGeometry: "true",
        outSR: "4326",
        orderByFields: "MetroLine", returnDistinctValues: false}}
        axios.get(this.state.dataUrl, query)
        .then(res=>{
            console.log(res.data)
            const newList = res.data.features.map((feature)=>{
                return feature
            });
            this.setState({data:newList})
        });

       //})
    }

    render(){
        console.log("Main Render")
        return(

            <Router basename='/inspection-gis'>
            <React.Fragment>
                <Navbar></Navbar>
                <div className="container">
                <Switch>
                <Route path='/' exact render={(props) =>
                    <React.Fragment>
                    <Home></Home>
                    </React.Fragment>}/>

                <Route path='/counter' render={(props) =>
                    <React.Fragment>
                    <Counter></Counter>
                    </React.Fragment>}/>

                <Route path='/form' render={(props) =>
                <React.Fragment>
                <h3>You have {this.state.data.length} selected locations</h3>
                <Form2 
                gisData={this.state.data}
                metrolineList={this.state.metrolineList}
                stationList={this.state.stationList}
                querySet={this.querySet}/>
                
                </React.Fragment>}/>

                <Route path='/table' render={(props) =>
                <Table 
                fieldList={this.state.fieldList}
                gisData={this.state.data}/>}/>

                <Route path='/map' render={(props) =>
                <React.Fragment>
                <MapTest
                gisData={this.state.data} markerPosition={this.state.markerPosition}/>
                </React.Fragment>}/>

                </Switch>
                </div>
            </React.Fragment>
            </Router>


        )
    }
};

const mapDispatchProps = dispatch=>{
    return{
        onChangeQuery: (value)=> dispatch({type: actionTypes.CHANGE_QUERY, value}),
        onDecrementCounter: (value)=> dispatch({type: actionTypes.DECREMENT_COUNT, value})
    };
};
const mapStateToProps = state=>{
    return {
        qry: state.query
    };
};
export default connect(mapStateToProps, mapDispatchProps)(Main)