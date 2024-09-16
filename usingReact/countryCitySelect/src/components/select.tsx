import React from 'react'

interface types {
  data: { name: string; value: string; cities: string[] }[] | string[];
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ data,handleChange }: types) => {
  return (
      <select
        onChange={(e) => {
            if (handleChange) {
                handleChange(e)
            }
        }}
      >
        {data.map((item, index) => {
          return (
            <option key={index} value={index}>
              {typeof item === 'string' ? item : item.name}
            </option>
          );
        })}
      </select>
  );
};

export default Select
