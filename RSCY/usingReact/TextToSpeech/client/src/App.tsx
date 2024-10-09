import React, { useEffect, useState } from "react";
import Big from "big.js";
import "./App.css";

const Swp = () => {
  const [swpData, setSwpData] = useState({
    principal: "",
    withdrawal: "",
    returnRate: 0,
    tenure: 0,
  });
  const [swpResult, setSwpResult] = useState();
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (value <= 0) {
      error = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be a positive number.`;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSwpData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const calculateSwp = () => {
    const { principal, withdrawal, returnRate, tenure } = swpData;
    const P = new Big(principal);
    const W = new Big(withdrawal);
    const r = new Big(returnRate).div(100).div(12);
    const n = new Big(tenure).times(12);

    if (P.lte(0) || W.lte(0) || r.lte(0) || n.lte(0)) {
      console.log("Invalid Input Values");
      return;
    }

    const onePlusR = Big(1).plus(r);
    const compoundFactor = onePlusR.pow(n);
    const withdrawalFactor = compoundFactor.minus(1).div(r);

    const A = P.times(compoundFactor).minus(W.times(withdrawalFactor));
    setSwpResult(A.toFixed(2));
  };

  useEffect(() => {
    calculateSwp();
  }, [swpData]);

  return (
    <div className="container">
      <div className="slider-container">
        <div className="text-input-container">
          <span className="label">Initial Investment</span>
          <div className="number-input-container">
            <span className="symbol">₹</span>
            <input
              className="text"
              type="number"
              name="principal"
              min="0"
              value={swpData.principal}
              onChange={handleInputChange}
            />
          </div>
          {errors.principal && (
            <span className="error">{errors.principal}</span>
          )}
        </div>

        <div className="text-input-container">
          <span className="label">Monthly Withdrawal</span>
          <div className="number-input-container">
            <span className="symbol">₹</span>
            <input
              className="text"
              type="number"
              name="withdrawal"
              min="0"
              value={swpData.withdrawal}
              onChange={handleInputChange}
            />
          </div>
          {errors.withdrawal && (
            <span className="error">{errors.withdrawal}</span>
          )}
        </div>

        <div className="text-input-container">
          <span className="label">Annual Return (%)</span>
          <div className="input-container">
            <input
              className="slider"
              type="range"
              name="returnRate"
              min="0"
              max="100"
              value={swpData.returnRate}
              onChange={handleInputChange}
            />
          </div>
          {errors.returnRate && (
            <span className="error">{errors.returnRate}</span>
          )}
        </div>

        <div className="text-input-container">
          <span className="label">Tenure (years)</span>
          <div className="number-input-container">
            <input
              className="text"
              type="number"
              name="tenure"
              min="0"
              value={swpData.tenure}
              onChange={handleInputChange}
            />
          </div>
          {errors.tenure && <span className="error">{errors.tenure}</span>}
        </div>

        <button onClick={calculateSwp}>Calculate</button>
        {swpResult && <div className="result">Final Value: ₹{swpResult}</div>}
      </div>
    </div>
  );
};

export default Swp;
