import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [emi, setEmi] = useState(0);
  const [inputValues, setInputValues] = useState({
    loanAmount: 0,
    rateOfInterest: 0,
    time: 0,
  });
  console.log("emi", +emi);

  const handleINputChange = (e) => {
    const { name, value } = e.target;
    if (name === "loanAmount" && value > 200) {
      setInputValues((prev) => ({
        ...prev,
        [name]: 200,
      }));
    } else if (name === "rateOfInterest" && value > 20) {
      setInputValues((prev) => ({
        ...prev,
        [name]: 20,
      }));
    } else if (name === "time" && value > 30) {
      setInputValues((prev) => ({
        ...prev,
        [name]: 30,
      }));
    } else {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getSliderValue = (value: number | string) => {
    return value === "" ? 0 : value;
  };

  const calculateEMI = () => {
    const p = +inputValues.loanAmount * 100000;
    const r = (+inputValues.rateOfInterest / 100)/12;
    const t = +inputValues.time * 12;
    if (p ===0 || r === 0 || t===0) {
      return 0;
    }
    const emi = (p * r * (1 + r) ** t) / ((1 + r) ** t - 1);
    return emi && +(emi).toFixed(0);
  };

  const totalInterest = () => {
    const p = +inputValues.loanAmount * 100000;
    const t = +inputValues.time * 12;
    const totalInterestPayable = calculateEMI() * t - p;
    return totalInterestPayable;
  }

  useEffect(() => {
    if ((!inputValues.loanAmount && !inputValues.rateOfInterest && !inputValues.time))
      return;
    setEmi(calculateEMI());
  }, [inputValues.loanAmount, inputValues.rateOfInterest, inputValues.time]);

  return (
    <>
      <div className="slider-container">
        <div className="container">
          <div className="text-input-container">
            <span>Home Loan Amount</span>
            <input
              className="text"
              type="number"
              name="loanAmount"
              min="0"
              max="200"
              defaultValue={inputValues.loanAmount}
              onBlur={(e) => handleINputChange(e)}
            />
            <span>₹</span>
          </div>
          <input
            className="slider"
            type="range"
            name="loanAmount"
            min="0"
            max="200"
            defaultValue={getSliderValue(inputValues.loanAmount)}
            onBlur={(e) => handleINputChange(e)}
          />
        </div>
        <div className="ticks">
          <span className="tick">0</span>
          <span className="tick">25L</span>
          <span className="tick">50L</span>
          <span className="tick">75L</span>
          <span className="tick">100L</span>
          <span className="tick">125L</span>
          <span className="tick">150L</span>
          <span className="tick">175L</span>
          <span className="tick">200L</span>
        </div>
        <div className="text-input-container">
          <span>Interest Rate</span>
          <input
            className="text"
            type="number"
            min="0"
            max="20"
            name="rateOfInterest"
            defaultValue={inputValues.rateOfInterest}
            onBlur={(e) => handleINputChange(e)}
          />
          <span>%</span>
        </div>
        <input
          className="slider"
          type="range"
          min="0"
          max="20"
          name="rateOfInterest"
          defaultValue={getSliderValue(inputValues.rateOfInterest)}
          onBlur={(e) => handleINputChange(e)}
        />
        <div className="ticks">
          <span className="tick">0</span>
          <span className="tick">5</span>
          <span className="tick">10</span>
          <span className="tick">15</span>
          <span className="tick">20</span>
        </div>
        <div className="text-input-container">
          <span>Loan Tenure</span>
          <input
            className="text"
            type="number"
            name="time"
            min="0"
            max="30"
            defaultValue={inputValues.time}
            onBlur={(e) => handleINputChange(e)}
          />
        </div>

        <input
          className="slider"
          type="range"
          name="time"
          min="0"
          max="30"
          defaultValue={getSliderValue(inputValues.time)}
          onBlur={(e) => handleINputChange(e)}
        />
        <div className="ticks">
          <span className="tick">0</span>
          <span className="tick">5</span>
          <span className="tick">10</span>
          <span className="tick">15</span>
          <span className="tick">20</span>
          <span className="tick">25</span>
          <span className="tick">30</span>
        </div>
      </div>
      <div className="loanEMI">Loan EMI {emi}</div>
      <div className="loanEMI">Total Interest Payable {totalInterest()}</div>
      <div className="loanEMI">
        Total Payment (Principal + Interest) {emi + totalInterest()}
      </div>
    </>
  );
}

export default App;
