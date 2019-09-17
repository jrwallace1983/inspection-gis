import React from 'react';
import Jumbotron from '../jumbotron/jumbotron'
import {connect} from 'react-redux'

const Home =(props)=> {

    //render(){

    return (
        <React.Fragment>
            <button onClick={props.onIncrementCounter}>click me</button>
        <Jumbotron>{props.ctr}</Jumbotron>
        </React.Fragment>
    )//}
}

const mapDispatchProps = dispatch=>{
    return{
        onIncrementCounter: ()=> dispatch({type: 'INCREMENT'})
    };
};
const mapStateToProps = state=>{
    return {
        ctr: state.counter
    };
};
export default connect(mapStateToProps, mapDispatchProps)(Home)
