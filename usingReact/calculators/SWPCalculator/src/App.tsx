import { useState } from 'react'
import Header from './components/header'
import Swp from './components/swp';
import Emi from './components/emi';
import './App.css'

const App = () => {
    const [activeTab, setActiveTab] = useState("SWP");

    const renderContent = () => {
      switch (activeTab) {
        case "SWP":
          return <Swp />;
        case "EMI":
          return <Emi />;
        default:
          return null;
      }
    };
  return (
    <div className="calculator-container">
      <div className="wrapper">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
    </div>
  );
}

export default App
