(async () => {
  const res = await fetch("./src/data.json");
  const data = await res.json();
  let employees = data;

  let selectedEmployeeId = data[0].id;
  let selectedEmployee = data[0];

  let employeeList = document.querySelector(".employees__names--list");
  let singleEmployeeInfo = document.querySelector(".employees__single--info");

  // Add/Edit employee
  let addEmployeeModal = document.querySelector(".addEmployee");
  let addEmployeeForm = document.querySelector(".addEmployee_create");
  let createEmployeeBtn = document.querySelector(".createEmployee");
  let editEmployee = document.querySelector(".EditEmployee");

  editEmployee.addEventListener("click", () => {
    addEmployeeForm.dataset.mode = "edit";
    selectedEmployeeId = parseInt(selectedEmployeeId, 10);
    selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId);
    populateFormForEdit(selectedEmployee);
    addEmployeeModal.style.display = "flex";
    renderSelectedEmployee();
  });

  createEmployeeBtn.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
    addEmployeeForm.reset();
    addEmployeeForm.dataset.mode = "add";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee")
      addEmployeeModal.style.display = "none";
  });

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    let values = [...formData.entries()];
    let empData = {};

    for (let val of values) {
      empData[val[0]] = val[1];
    }

    empData.age = new Date().getFullYear() - +empData["dob"].slice(0, 4);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";

    if (addEmployeeForm.dataset.mode === "add") {
      empData.id = employees[employees.length - 1].id + 1;
      employees.push(empData);
    } else {
      let index = employees.findIndex((emp) => emp.id === selectedEmployeeId);
      employees[index] = { ...employees[index], ...empData };
    }

    renderEmployeeList();
    renderSelectedEmployee();
    //addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployeeList();
      renderSelectedEmployee();
    }
    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => e.target.parentNode.id !== String(emp.id)
      );

      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSelectedEmployee();
      }
    }
    renderEmployeeList();
    renderSelectedEmployee();
  });

  const renderEmployeeList = () => {
    employeeList.innerHTML = "";

    employees.forEach((emp) => {
      let employee = document.createElement("span");
      employee.classList.add("employees__names--item");
      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i>X</i>`;
      employeeList.append(employee);
    });
  };

  const renderSelectedEmployee = () => {
    if (selectedEmployeeId === -1) {
      singleEmployeeInfo.innerHTML = "";
      return;
    }
    singleEmployeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single--heading">
            ${selectedEmployee.firstName} ${selectedEmployee.lastName} ${selectedEmployee.age}
        </span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
    `;
  };

  const populateFormForEdit = (employee) => {
    addEmployeeForm.dataset.mode = "edit";
    for (let key in employee) {
      if (key === "dob") {
        // Format the date to YYYY-MM-DD
        const dob = employee[key];
        const [date, month, year] = dob.split("/");
        addEmployeeForm.elements[key].value = `${year}-${month}-${date}`;
      } else if (addEmployeeForm.elements[key]) {
        addEmployeeForm.elements[key].value = employee[key];
      }
    }
  };

  renderEmployeeList();
  if (selectedEmployee) renderSelectedEmployee();
})();
