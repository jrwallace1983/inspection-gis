import React, {useState} from 'react'

const Form = (props)=>{
    const [count, setCount] = useState(1);

    const incrementHandler = (e)=>{
        setCount(parseInt(e.target.value));
    }

    const submitHandler = (e)=>{

        e.preventDefault()
        props.changeIncrement(count);
    }
    return (
        <form onSubmit={submitHandler}>
            <input onChange={incrementHandler} value={count}></input>
            <button type="submit">Increment</button>
            
        </form>
    )
}
export default Form
