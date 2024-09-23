import React, { useEffect, useState } from 'react'
import { formatCurrency } from '../utils/currencyFormatter';

const Swp = () => {
      const [swpData, setSwpData] = useState({
        principal: "",
        withdrawal: "",
        returnRate: 0,
        tenure: 0
      });
    const [swpResult, setSwpResult] = useState('')
    const [errors, setErrors] = useState({});
console.log("swpResult", swpResult);
     const validateField = (name, value) => {
       let error = "";

       if (value <= 0) {
         error = `${
           name.charAt(0).toUpperCase() + name.slice(1)
         } must be a positive number.`;
       }

       setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
     };

    const handleINputChange= (e: any) => {

        const { name, value} = e.target
        setSwpData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
        validateField(name, value);
    }

    const { principal, withdrawal, returnRate, tenure } = swpData;
    const calculateSwp = () => {
      const P = parseFloat(principal);
      const W = parseFloat(withdrawal);
      const r = parseFloat(returnRate) / 100 / 12;
        const n = parseInt(tenure) * 12;
        if (isNaN(P) || isNaN(W) || isNaN(r) || isNaN(n)) {
            console.log('Invalid Input Values')
            return;
        }
        const A = P * Math.pow(1 + r, n) - W * ((Math.pow(1 + r, n) - 1) / r);
        const formatedCurrency = formatCurrency(A.toFixed(0));
        console.log("formatedCurrency", formatedCurrency);
        setSwpResult(formatedCurrency);
    };

    useEffect(() => {calculateSwp()}, [principal, withdrawal, returnRate, tenure]);
  return (
    <div className="conatiner">
      <div className="slider-container">
        <div className="container">
          <div className="text-input-container">
            <span className="label">Initial Investment</span>
            <div className="number-input-container">
              <span className="symbol">₹</span>
              <input
                className="text"
                type="number"
                name="principal"
                min="0"
                max="infinite"
                value={swpData.principal}
                onChange={(e) => handleINputChange(e)}
              />
            </div>
            {errors.principal && (
              <span className="error">{errors.principal}</span>
            )}
          </div>
        </div>

        <div className="text-input-container">
          <span className="label">Monthly Withdrawal</span>
          <div className="number-input-container">
            <span className="symbol">₹</span>
            <input
              className="text"
              type="number"
              min="0"
              max="20"
              name="withdrawal"
              value={swpData.withdrawal}
              onChange={(e) => handleINputChange(e)}
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
              onChange={(e) => handleINputChange(e)}
            />
            <input
              className="text"
              type="number"
              name="returnRate"
              min="0"
              max="100"
              value={swpData.returnRate}
              onChange={(e) => handleINputChange(e)}
            />
          </div>
          {errors.returnRate && (
            <span className="error">{errors.returnRate}</span>
          )}
        </div>

        <div className="text-input-container">
          <span className="label">Tenure (years)</span>
          <div className="input-container">
            <input
              className="slider"
              type="range"
              name="tenure"
              min="0"
              max="100"
              value={swpData.tenure}
              onChange={(e) => handleINputChange(e)}
            />
            <input
              className="text"
              type="number"
              name="tenure"
              min="0"
              max="100"
              value={swpData.tenure}
              onChange={(e) => handleINputChange(e)}
            />
          </div>
          {errors.tenure && <span className="error">{errors.tenure}</span>}
        </div>
        {swpResult && (
          <div className="result label">
            Amount Left After Withdrawals: {swpResult}
          </div>
        )}
      </div>
    </div>
  );
}

export default Swp
