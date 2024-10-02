import { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
//import "./App.css";

function Emi() {
  const [emi, setEmi] = useState(0);
  const [inputValues, setInputValues] = useState({
    loanAmount: 0,
    rateOfInterest: 0,
    time: 0,
  });
  const chartRef = useRef(null);

  const handleINputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: Math.min(
        value,
        name === "loanAmount" ? 200 : name === "rateOfInterest" ? 20 : 30
      ),
    }));
  };

  const calculateEMI = () => {
    const p = +inputValues.loanAmount * 100000;
    const r = +inputValues.rateOfInterest / 100 / 12;
    const t = +inputValues.time * 12;
    if (p === 0 || r === 0 || t === 0) {
      return 0;
    }
    const emi = (p * r * (1 + r) ** t) / ((1 + r) ** t - 1);
    return emi && +emi.toFixed(0);
  };

  const totalInterest = () => {
    const p = +inputValues.loanAmount * 100000;
    const t = +inputValues.time * 12;
    const totalInterestPayable = calculateEMI() * t - p;
    return totalInterestPayable;
  };

  const totalPayment = () => {
    const p = +inputValues.loanAmount * 100000;
    return p + totalInterest();
  };

  useEffect(() => {
    setEmi(calculateEMI());
  }, [inputValues]);

  const totalInterestValue = totalInterest();
  const totalPaymentValue = totalPayment();

  const totalInterestPercent: number =
    totalInterestValue && totalPaymentValue
      ? parseFloat(((totalInterestValue / totalPaymentValue) * 100).toFixed(0))
      : 0;

  const totalPrincipalPercent = 100 - totalInterestPercent;

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "My Pie Chart",
    },
    series: [
      {
        name: "Share",
        data: [
          { name: "Total Interest", y: totalInterestPercent },
          { name: "Principal Loan Amount", y: totalPrincipalPercent },
        ],
      },
    ],
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f} %",
        },
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
  };

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
              value={inputValues.loanAmount}
              onChange={(e) => handleINputChange(e)}
            />
            <span>₹</span>
          </div>
          <input
            className="slider"
            type="range"
            name="loanAmount"
            min="0"
            max="200"
            value={inputValues.loanAmount}
            onChange={(e) => handleINputChange(e)}
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
            value={inputValues.rateOfInterest}
            onChange={(e) => handleINputChange(e)}
          />
          <span>%</span>
        </div>
        <input
          className="slider"
          type="range"
          min="0"
          max="20"
          name="rateOfInterest"
          value={inputValues.rateOfInterest}
          onChange={(e) => handleINputChange(e)}
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
            value={inputValues.time}
            onChange={(e) => handleINputChange(e)}
          />
          <span>Year</span>
        </div>
        <input
          className="slider"
          type="range"
          name="time"
          min="0"
          max="30"
          value={inputValues.time}
          onChange={(e) => handleINputChange(e)}
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
      <div className="loanEMI">Total Interest Payable {totalInterestValue}</div>
      <div className="loanEMI">
        Total Payment (Principal + Interest) {totalPaymentValue}
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </>
  );
}

export default Emi;
