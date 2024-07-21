import { useState } from "react";
import "./All.css";
import CounterButton from "./CounterButton";

export default function Counter() {
  const [count, setCount] = useState(0);

  function incrementCounterFunction(value) {
    setCount(count + value);
  }
  function decrementCounterFunction(value) {
    setCount(count - value);
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <>
      <CounterButton
        by={1}
        incMethod={incrementCounterFunction}
        decMethod={decrementCounterFunction}
      />
      <CounterButton
        by={2}
        incMethod={incrementCounterFunction}
        decMethod={decrementCounterFunction}
      />
      <CounterButton
        by={3}
        incMethod={incrementCounterFunction}
        decMethod={decrementCounterFunction}
      />
      <span className="count">{count}</span>
      <br />
      <button className="resetButton" onClick={resetCount}>
        reset
      </button>
    </>
  );
}
