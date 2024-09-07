import React from "react";

const Input = ({ type, placeholder, value, name, required, setEmpInfo } : any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpInfo((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={handleChange}
    />
  );
};

export default Input;
