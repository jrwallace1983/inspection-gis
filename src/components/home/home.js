import React from 'react'
import {connect} from 'react-redux';
import MapImage from './map-image'
//import * as actionTypes from '../store/actions'

const Home = (props)=>{
    return (
        <div>
test
            
        </div>
    )
}

const mapStateToProps = state=>{
    return {
        qry: state.query
    };
};

export default connect(mapStateToProps)(Home)

