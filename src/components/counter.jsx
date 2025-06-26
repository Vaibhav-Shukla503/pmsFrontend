import React,{useState} from "react";
function Counter()
{
    const [count, setCount] = useState(0);
    return (
        <div>
            <h2>
                Count:{count}
                <button onClick={()=>setCount(count+1)}>Button</button>
            </h2>
        </div>
    );
}
export default Counter;