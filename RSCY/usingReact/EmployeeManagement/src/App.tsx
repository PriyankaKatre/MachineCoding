import { useState, useRef } from "react";
import "./App.css";
import employeeType from "./modal/employee";
import UseFetchAPi from "./hooks/ftech.ts";
import EmployeeList from "./components/employeeList.tsx";
import Input from "./components/input.tsx";
import SingleEmployee from "./components/SingleEmployee.tsx";
const url = import.meta.env.VITE_API_URL;
console.log("url", url);

function App() {
  const [empData, setEmpData] = useState<employeeType[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<employeeType | null>(
    null
  );
  const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
    null
  );

  UseFetchAPi(url, setEmpData, setSelectedEmployee, setSelectedEmployeeID);

  const initialEmpInfo: employeeType = {
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    address: "",
    contactNumber: 0,
    email: "",
    imageUrl: "",
    salary: 0,
  };

  const [showForm, setShowForm] = useState(false);
  const [empInfo, setEmpInfo] = useState(initialEmpInfo);
  const formRef = useRef<HTMLFormElement>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    console.log("empInfo", empInfo);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      formRef.current &&
      e.target instanceof Node &&
      !formRef.current.contains(e.target)
    ) {
      setShowForm(false);
    }
  };

  const OnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditMode) {
      setEmpData(empData.map((emp) => (emp.id === empInfo.id ? empInfo : emp)));
      setSelectedEmployee(empInfo); // Update selected employee after edit
    } else {
      const newEmployee = { ...empInfo, id: (empData.length + 1).toString() };
      setEmpData([...empData, newEmployee]);
      setSelectedEmployee(newEmployee); // Set new employee as selected
    }
    setEmpInfo(initialEmpInfo);
    setShowForm(false);
    setIsEditMode(false);
  };

  const handleAdd = () => {
    setShowForm(true);
    setIsEditMode(false);
    setEmpInfo(initialEmpInfo);
  };
  return (
    <>
      <div id="app">
        <header className="header">
          <h1>Employee Database Management</h1>
          <button className="createEmployee" onClick={handleAdd}>
            Add Employee
          </button>
        </header>
        <div className="employees">
          <EmployeeList
            empData={empData}
            setEmpData={setEmpData}
            setSelectedEmployee={setSelectedEmployee}
            setSelectedEmployeeID={setSelectedEmployeeID}
            selectedEmployeeID={selectedEmployeeID}
          />
          <SingleEmployee
            selectedEmployee={selectedEmployee}
            setShowForm={setShowForm}
            setIsEditMode={setIsEditMode}
            setEmpInfo={setEmpInfo}
          />
        </div>
      </div>

      {/* <!-- Add Employee Code - START --> */}
      {showForm && (
        <div className="addEmployee" onClick={handleBackdropClick}>
          <form
            className="addEmployee_create"
            ref={formRef}
            onClick={(e) => e.stopPropagation()}
            onSubmit={OnSubmit}
          >
            Add a new Employee
            <div>
              <Input
                type="text"
                name="firstName"
                value={empInfo.firstName}
                placeholder="First Name"
                required
                setEmpInfo={setEmpInfo}
              />
              <Input
                type="text"
                name="lastName"
                value={empInfo.lastName}
                placeholder="Last Name"
                required
                setEmpInfo={setEmpInfo}
              />
            </div>
            <Input
              type="text"
              name="imageUrl"
              value={empInfo.imageUrl}
              placeholder="Image URL (Optional)"
              setEmpInfo={setEmpInfo}
            />
            <Input
              type="email"
              value={empInfo.email}
              name="email"
              placeholder="Email"
              required
              setEmpInfo={setEmpInfo}
            />
            <Input
              type="number"
              setEmpInfo={setEmpInfo}
              name="contactNumber"
              value={empInfo.contactNumber}
              placeholder="Contact"
              required
            />
            <Input
              type="number"
              setEmpInfo={setEmpInfo}
              value={empInfo.salary}
              name="salary"
              placeholder="Salary"
              required
            />
            <Input
              type="text"
              setEmpInfo={setEmpInfo}
              value={empInfo.address}
              name="address"
              placeholder="Address"
              required
            />
            <Input
              type="date"
              setEmpInfo={setEmpInfo}
              name="dob"
              value={empInfo.dob}
              placeholder="Date of Birth"
              className="addEmployee_create--dob"
              required
            />
            <Input
              type="submit"
              className="addEmployee_create--submit"
              value="Submit"
            />
          </form>
        </div>
      )}
      {/* <!-- Add Employee Code - END --> */}
    </>
  );
}

export default App;
