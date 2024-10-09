import { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./components/progressbar";

function App() {
  const [value, setValue] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((val) => {
        if (val >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }
        return val + 1;
      });
    }, 100);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
    useEffect(() => {
console.log("vale", value);
    }, [value])


  return (
    <div className="container">
      <h2>Progress Bar</h2>
      <ProgressBar value={value} />
      <span>{isComplete ? "Complete" : "Loading"}</span>
    </div>
  );
}

export default App;
