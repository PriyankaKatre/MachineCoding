import { useCallback, useEffect } from "react";
import employeeType from "../modal/employee";

const UseFetchAPi = (
  url: string,
  setEmpData: React.Dispatch<React.SetStateAction<employeeType[]>>,
  setSelectedEmployee: React.Dispatch<
    React.SetStateAction<employeeType | null>
  >,
  setSelectedEmployeeID: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const fetchEmployees = useCallback(async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      setEmpData(data);
      if (data.length > 0) {
        setSelectedEmployee(data[0]);
        setSelectedEmployeeID(data[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  }, [url, setEmpData, setSelectedEmployee, setSelectedEmployeeID]);
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
};

export default UseFetchAPi;
