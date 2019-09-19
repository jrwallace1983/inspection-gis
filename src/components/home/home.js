import React from 'react';
import Jumbotron from '../jumbotron/jumbotron';
import Form from '../home/form';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'

const Home =(props)=> {

    //render(){

    return (
        <React.Fragment>
            <Form changeIncrement={props.onIncrementCounter}
                    changeDecrement={props.onDecrementCounter}></Form>
        <Jumbotron>{props.ctr}</Jumbotron>
        </React.Fragment>
    )//}
}

const mapDispatchProps = dispatch=>{
    return{
        onIncrementCounter: (value)=> dispatch({type: actionTypes.INCREMENT_COUNT, value}),
        onDecrementCounter: (value)=> dispatch({type: actionTypes.DECREMENT_COUNT, value})
    };
};
const mapStateToProps = state=>{
    return {
        ctr: state.counter
    };
};
export default connect(mapStateToProps, mapDispatchProps)(Home)
