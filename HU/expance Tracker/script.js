document.addEventListener('DOMContentLoaded', () => {
    let expenseName = document.querySelector("#expenseName");
    let expenseAmount = document.querySelector("#expenseAmount");
    let AddExpenseBtn = document.querySelector("#AddExpenseBtn");
    let expensesList = document.querySelector(".expenses-list");
    let totalExpences = document.querySelector(".total");

    let expensesData = JSON.parse(localStorage.getItem("expenses")) || [];


    AddExpenseBtn.addEventListener('click', () => {
        let name = expenseName.value.trim();
        let amount = expenseAmount.value.trim();
        let newExpenses = {
            id: Date.now(),
            name,
            amount
        }
        expensesData.push(newExpenses);
        expenseName.value = '';
        expenseAmount.value = '';
        saveTask()
        render()
    })

    const render = () => {
        expensesList.innerHTML = "";
        let total = 0;
        expensesData.forEach((exp) => {
            const div = document.createElement("div");
            div.classList.add("expense-item");
          total += parseInt(exp.amount);
          totalExpences.textContent = `Total: $${total}`;
          div.innerHTML = `
            <span>${exp.name.charAt(0).toUpperCase() + exp.name.slice(1)} - $${
            exp.amount
          }</span>
            <button class='delete_btn' data-id=${exp.id}>Delete Item</button>`;

            div.querySelector(".delete_btn").addEventListener('click', (e) => {
                const id = e.target.getAttribute("data-id");
                expensesData = expensesData.filter((item) => item.id != id);
                saveTask();
                render();
            })
             expensesList.appendChild(div);

        });

    }

    const saveTask = () => {
        localStorage.setItem("expenses", JSON.stringify(expensesData));
    }
    render();

})
