import React from "react";
import employeeType from "../modal/employee";

type empListType = {
  empData: employeeType[];
  setEmpData: React.Dispatch<React.SetStateAction<employeeType[]>>;
  setSelectedEmployee: React.Dispatch<
    React.SetStateAction<employeeType | null>
  >;
  setSelectedEmployeeID: React.Dispatch<React.SetStateAction<number | null>>;
  selectedEmployeeID: number | null;
};

const EmployeeList = ({
  empData,
  setEmpData,
  setSelectedEmployee,
  setSelectedEmployeeID,
  selectedEmployeeID,
}: empListType) => {
  const handleListItemClick = (
    e: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    const { tagName } = e.target as HTMLElement;
    if (tagName === "SPAN") {
      const newSelectedEmployee = empData.filter((emp) => +emp.id === +id);
      if (newSelectedEmployee) {
        setSelectedEmployee(newSelectedEmployee[0]);
        setSelectedEmployeeID(+newSelectedEmployee[0].id);
      }
    }

    if (tagName === "I") {
      const filteredEmp = empData.filter((emp) => +emp.id !== +id);
      setEmpData(filteredEmp);
      setSelectedEmployee(filteredEmp[0] || null);
      setSelectedEmployeeID(+filteredEmp[0]?.id || null);
    }
  };
  return (
    <div className="employees__names">
      <span className="employees__names--title">Employee List</span>
      <div className="employees__names--list">
        {empData &&
          empData.map((emp: employeeType) => {
            return (
              <span
                key={emp.id}
                id={emp.id}
                onClick={(e) => handleListItemClick(e, emp.id)}
                className={`employees__names--item
                        ${selectedEmployeeID === +emp.id ? "selected" : ""}`}
              >
                {emp.firstName} {emp.lastName}
                <i>X</i>
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default EmployeeList;
