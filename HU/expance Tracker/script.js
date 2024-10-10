document.addEventListener('DOMContentLoaded', () => {
    let expenseForm = document.querySelector("#expense-form");
    let expenseName = document.querySelector("#expenseName");
    let expenseAmount = document.querySelector("#expenseAmount");
    let AddExpenseBtn = document.querySelector("#AddExpenseBtn");
    let expensesList = document.querySelector(".expenses-list");
    let totalExpences = document.querySelector(".total");

    let expensesData = JSON.parse(localStorage.getItem("expenses")) || [];

    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let name = expenseName.value.trim();
      let amount = parseInt(expenseAmount.value.trim());
      if (name !== "" && !isNaN(amount) && amount > 0) {
        let newExpense = {
          id: Date.now(),
          name,
          amount,
        };
        expensesData.push(newExpense);
        expenseName.value = "";
        expenseAmount.value = "";
        saveTaskToLOcalStorage();
        render();
      } else {
        alert("Please add the values");
      }
    });

    const render = () => {
      expensesList.innerHTML = "";
      let total = 0;
      expensesData.forEach((exp) => {
        const expenseListItem = document.createElement("div");
        expenseListItem.classList.add("expense-item");
        total += exp.amount;
        totalExpences.textContent = `Total: $${total.toFixed(2)}`;
        expenseListItem.innerHTML = `
            <span>${exp.name.charAt(0).toUpperCase() + exp.name.slice(1)} - $${
          exp.amount
        }</span>
            <button class='delete_btn' data-id=${exp.id}>Delete Item</button>`;
        expensesList.appendChild(expenseListItem);
      });
    };
    expensesList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const id = e.target.getAttribute("data-id");
        expensesData = expensesData.filter((item) => item.id != id);
        saveTaskToLOcalStorage();
        render();
      }
    });
    const saveTaskToLOcalStorage = () => {
      localStorage.setItem("expenses", JSON.stringify(expensesData));
    };
    render();

})
