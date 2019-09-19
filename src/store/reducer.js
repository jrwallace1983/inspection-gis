import * as actionTypes from './actions';

const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.INCREMENT_COUNT:
        console.log(typeof action.value)
        return {
            ...state,
            counter: state.counter + action.value
        }
    case actionTypes.DECREMENT_COUNT:
        return{
            ...state,
            counter: state.counter - action.value
        }
    }
    
    return state;
};

export default reducer;