import { useEffect, useState } from "react";
import "./App.css";

const Cell = ({ filled, label, isDisabled, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={filled ? "cell cell-activated" : "cell"}
      disabled={isDisabled}
    />
  );
};

function App() {
    const [order, setOrder] = useState([])
    const [isDeactivating, setIsDeactivating] = useState(false);

    const config = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]
    const deactivateCells = () => {
        setIsDeactivating(true);
        const timer = setInterval(() => {
            setOrder((orignalOrder) => {
                const newOrder = orignalOrder.slice();
                newOrder.pop();

                if (newOrder.length === 0) {
                    clearInterval(timer)
                    setIsDeactivating(false)
                }
                return newOrder;
            })
        }, 300)
    }

    const activateCells = (idx) => {
        const newOrder = [...order, idx];
        console.log('new', newOrder)
        setOrder(newOrder)

        if (newOrder.length === config.flat(1).filter(Boolean).length) {
            deactivateCells()
        }
    }
  return (
      <div className="wrapper">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${config[0].length }, 1fr)` }}>
              {config.flat(1).map((value, index) => {
                  return (
                      value ? <Cell key={index}
                          filled={order.includes(index)}
                          label={`Cell ${index}` }
                          isDisabled={ order.includes(index) || isDeactivating}
                          onClick={() => { activateCells(index) }} />
                          :<span />
                )
              }) }
          </div>
    </div>
  )
}

export default App;
