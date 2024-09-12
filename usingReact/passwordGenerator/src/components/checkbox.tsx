import { checkBoxType } from "../modal/checkboxProps";

interface CheckboxProps {
  checkboxData: checkBoxType[];
  onChange: (index: number) => void;
}

const Checkbox = ({ checkboxData, onChange }: CheckboxProps) => {
  return (
    <div>
      <form className="checkboxes">
        {checkboxData.map((checkbox: checkBoxType, index: number) => (
          <div key={checkbox.id}>
            <input
              id={checkbox.id.toString()}
              type="checkbox"
              title={checkbox.title}
              checked={checkbox.state}
              onChange={() => onChange(index)}
            />
            <label htmlFor={checkbox.id.toString()}>{checkbox.title}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Checkbox;
