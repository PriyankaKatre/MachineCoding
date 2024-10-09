
import "./App.css";
import data from "./data/data.json";
import Select from "./components/select";
import { useState } from "react";

function App() {
      const [selectedIndex, setSelectedIndex] = useState<number>(0);

      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedIndex(Number(e.target.value));
      };

    return (
      <>
        <Select data={data} handleChange={handleChange} />
        <Select data={data[selectedIndex].cities} />
      </>
    );
}

export default App;
