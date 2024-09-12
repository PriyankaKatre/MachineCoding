import "./App.css";
import Button from "./components/button";
import Checkbox from "./components/checkbox";
import Slider from "./components/slider";
import { useState, useCallback } from "react";
import checkboxData from "./data/checkboxData";
import { checkBoxType } from "./modal/checkboxProps";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/strengtherChecker";


function App() {
  const [checkboxDataState, setCheckboxDataState] =
    useState<checkBoxType[]>(checkboxData);
  const [length, setLength] = useState<number>(0);
    const { password, errorMessage, generatePassword } = usePasswordGenerator();
    const [isCopied, setIsCopied] = useState(false)

  const handleCheckboxClick = useCallback(
    (index: number) => {
      setCheckboxDataState((prevState) => {
        const updatedCheckboxData = prevState.map((checkbox, i) =>
          i === index ? { ...checkbox, state: !checkbox.state } : checkbox
        );
        return updatedCheckboxData;
      });
    },
    []
  );
    const handleCopy = () => {
        navigator.clipboard.writeText(password)
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 500)
    }

  return (
    <div className="container">
      <div className="header">
        <div className="title">{password}</div>
        <Button
          text={isCopied ? "copied" : "copy"}
          customClass="copyBtn"
          onClick={handleCopy}
        />
      </div>

      <Slider length={length} setLength={setLength} />

      <Checkbox
        checkboxData={checkboxDataState}
        onChange={handleCheckboxClick}
      />
      <PasswordStrengthIndicator password={password} />

      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      <Button
        text="Generate Password"
        customClass="generateBtn"
        onClick={() => {
          generatePassword(checkboxDataState, length);
        }}
      />
    </div>
  );
}

export default App;
