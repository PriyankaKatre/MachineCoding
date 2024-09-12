import React from 'react'

interface sliderProps {
  length: number,
  setLength: (value: number) => void
}

const Slider = ({ length, setLength }: sliderProps) => {
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLength(Number(event.target.value));
    };

  return (
    <div className="charlength">
      <span>
        <label>Character Length</label>
        <label>{length}</label>
      </span>
      <input
        type="range"
        min="0"
        max="20"
        value={length}
              onChange={(e) => { handleSliderChange(e) }}
      />
    </div>
  );
};

export default Slider
