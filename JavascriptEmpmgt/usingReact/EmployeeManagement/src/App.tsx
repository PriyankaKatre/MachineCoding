import { useState, useEffect, useRef } from "react";
import "./App.css";

type employeeType = {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  dob: string;
  address: string;
  contactNumber: number;
  email: string;
  imageUrl: string;
  salary: number;
};

function App() {
  const [empData, setEmpData] = useState<employeeType[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<employeeType | null>(
    null
  );
  const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
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

  const [empInfo, setEmpInfo] = useState(initialEmpInfo);
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      formRef.current &&
      e.target instanceof Node &&
      !formRef.current.contains(e.target)
    ) {
      setShowForm(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const fetchEmployees = async () => {
    try {
      const res = await fetch("../data.json");
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
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

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
  const handleEdit = (selectedEmployee: EmployeeType) => {
    setShowForm(true);
      setIsEditMode(true);
      let formatedDate;
       if (selectedEmployee.dob) {
         if (selectedEmployee.dob.includes("/")) {
           let [date, month, year] = selectedEmployee.dob.split("/");
           formatedDate = `${year}-${month}-${date}`;
         } else if (selectedEmployee.dob.includes("-")) {
           formatedDate = selectedEmployee.dob;
         }
       }
    setEmpInfo({
      ...selectedEmployee,
      dob: formatedDate,
    });
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

          <div className="employees__single">
            <div className="employees__single--title">Employee Information</div>
            {selectedEmployee && (
              <>
                <div className="employees__single--info">
                  <img src={selectedEmployee?.imageUrl} />
                  <span className="employees__single--heading">
                    {selectedEmployee?.firstName} {selectedEmployee?.lastName}
                    {selectedEmployee?.age}
                  </span>
                  <span> {selectedEmployee?.address}</span>
                  <span> {selectedEmployee?.email}</span>
                  <span>Mobile - {selectedEmployee?.contactNumber}</span>
                  <span>DOB - {selectedEmployee?.dob}</span>
                </div>
                <button
                  className="editEmployee"
                  onClick={() => handleEdit(selectedEmployee)}
                >
                  Edit Employee
                </button>
              </>
            )}
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
                <input
                  type="text"
                  name="firstName"
                  value={empInfo.firstName}
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  value={empInfo.lastName}
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="imageUrl"
                value={empInfo.imageUrl}
                placeholder="Image URL (Optional)"
                onChange={handleChange}
              />
              <input
                type="email"
                value={empInfo.email}
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
              />
              <input
                type="number"
                name="contactNumber"
                value={empInfo.contactNumber}
                placeholder="Contact"
                required
                onChange={handleChange}
              />
              <input
                type="number"
                value={empInfo.salary}
                name="salary"
                placeholder="Salary"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                value={empInfo.address}
                name="address"
                placeholder="Address"
                required
                onChange={handleChange}
              />
              <input
                type="date"
                name="dob"
                value={empInfo.dob}
                placeholder="Date of Birth"
                className="addEmployee_create--dob"
                required
                onChange={handleChange}
              />
              <input
                type="submit"
                className="addEmployee_create--submit"
                value="Submit"
              />
            </form>
          </div>
        )}
        {/* <!-- Add Employee Code - END --> */}
      </div>
    </>
  );
}

export default App;
