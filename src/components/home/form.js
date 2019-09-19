import React, {useState} from 'react'

const Form = (props)=>{
    const [count, setCount] = useState(1);

    const countHandler = (e)=>{
        setCount(parseInt(e.target.value));
    }

    const submitIncrementHandler = (e)=>{

        e.preventDefault()
        props.changeIncrement(count);
        
    }

    const submitDecrementHandler = (e)=>{

        e.preventDefault()
        props.changeDecrement(count);
        
    }

    return (
        <form>
            <input onChange={countHandler} value={count}></input>
            <button onClick={submitIncrementHandler}>Increment</button>
            <button onClick={submitDecrementHandler}>Decrement</button>
            
        </form>
    )
}
export default Form
