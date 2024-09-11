import employeeType from "../modal/employee";

type singleEmpType = {
  selectedEmployee: employeeType |null;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEmpInfo: React.Dispatch<React.SetStateAction<employeeType>>;
};
const SingleEmployee = ({
  selectedEmployee,
  setShowForm,
  setIsEditMode,
  setEmpInfo,
}: singleEmpType) => {
    
  const handleEdit = (selectedEmployee: employeeType) => {
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
      dob: formatedDate ?? '',
    });
  };
  return (
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
  );
};

export default SingleEmployee;
