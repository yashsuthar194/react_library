import React, { useCallback, useState } from "react";

const Test = React.memo(({ change }: { change: () => void }) => {
  console.log("Test Rerendered");
  return <button onClick={change}>Count</button>;
});

const Hello = React.memo(({ change }: { change: () => void }) => {
  console.log("Hello Rerendered");
  return <button onClick={change}>New Count</button>;
});

const Practice = () => {
  const [count, setCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  const handleCountChange = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleNewCOuntChange = useCallback(() => {
    setNewCount(newCount + 1);
  }, [newCount]);
  return (
    <div>
      <div>{count}</div>
      <div>{newCount}</div>
      <Test change={handleCountChange} />
      <Hello change={handleNewCOuntChange} />
    </div>
  );
};

export default Practice;
