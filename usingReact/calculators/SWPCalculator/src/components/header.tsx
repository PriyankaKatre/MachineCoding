
interface tabsTypes  {
    activeTab: string,
    setActiveTab:(tab: string) => void

}

const Header = ({ setActiveTab }: tabsTypes) => {
  const handleTabChange = (e) => {
    setActiveTab(e.target.value);
  };
  return (
    <div>
      <h1>Financial Calculator</h1>
      <div className="options">
        <div className="label">Select Calculator</div>
        <select
          className="select-calculator"
          onClick={(e) => handleTabChange(e)}
        >
          <option value="SWP"> SWP Calculator</option>
          <option value="EMI">EMI Calculator</option>
        </select>
      </div>
    </div>
  );
};

export default Header
