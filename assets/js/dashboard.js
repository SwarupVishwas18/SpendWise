var expNameDOM = document.querySelector("#exp-name");
var expDateDOM = document.querySelector("#exp-date");
var expCatDOM = document.querySelector("#exp-cat");
var expRateDOM = document.querySelector("#exp-rate");

var incNameDOM = document.querySelector("#inc-name");
var incDateDOM = document.querySelector("#inc-date");
var incCatDOM = document.querySelector("#inc-cat");
var incRateDOM = document.querySelector("#inc-rate");

function getUser() {
  var user = JSON.parse(localStorage.getItem("loginedUser"));
  return user;
}

document
  .querySelector("#expense-submit-btn")
  .addEventListener("click", function () {
    var expName = expNameDOM.value;
    var expDate = expDateDOM.value;
    var expCat = expCatDOM.value;
    var expRate = expRateDOM.value;

    if (expName == "" || expDate == "" || expCat == 0 || expRate == "") {
      alert("Please fill all the fields");
      return;
    }

    var expense = {
      id: getLatestId()[0],
      name: expName,
      date: expDate,
      category: expCat,
      rate: expRate,
      user: getUser().name,
    };

    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    alert("Expense added successfully");
    window.location.href = "dashboard.html";
  });

// find id of latest income and expense and add 1 to it and return it
function getLatestId() {
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  var incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  var latestIncome = 0;
  var latestExpense = 0;
  expenses.forEach(function (expense) {
    if (expense.id > latestExpense) {
      latestExpense = expense.id;
    }
  });
  incomes.forEach(function (income) {
    if (income.id > latestIncome) {
      latestIncome = income.id;
    }
  });
  return [latestExpense + 1, latestIncome + 1];
}

document
  .querySelector("#income-submit-btn")
  .addEventListener("click", function () {
    var incName = incNameDOM.value;
    var incDate = incDateDOM.value;
    var incCat = incCatDOM.value;
    var incRate = incRateDOM.value;

    if (incName == "" || incDate == "" || incCat == 0 || incRate == "") {
      alert("Please fill all the fields");
      return;
    }

    var income = {
      id: getLatestId()[1],
      name: incName,
      date: incDate,
      category: incCat,
      rate: incRate,
      user: getUser().name,
    };

    var incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    incomes.push(income);
    localStorage.setItem("incomes", JSON.stringify(incomes));
    alert("Income added successfully");
    window.location.href = "dashboard.html";
  });

function getExpenses() {
  var user = getUser();
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  var filteredExpenses = expenses.filter(function (expense) {
    return expense.user == user.name;
  });
  return filteredExpenses;
}

function getTotalExpenses() {
  var expenses = getExpenses();
  var total = 0;
  expenses.forEach(function (expense) {
    total += parseInt(expense.rate);
  });
  return total;
}

function getIncome() {
  var user = getUser();
  var incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  var filteredIncomes = incomes.filter(function (income) {
    return income.user == user.name;
  });
  return filteredIncomes;
}

function getTotalIncome() {
  var incomes = getIncome();
  var total = 0;
  incomes.forEach(function (income) {
    total += parseInt(income.rate);
  });
  return total;
}

function getBalance() {
  var balance = getTotalIncome() - getTotalExpenses();
  return balance;
}

// create function checking if expense and income exist for current user

function isExpenseIncomeExist() {
  var user = getUser();
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  var incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  var filteredExpenses = expenses.filter(function (expense) {
    return expense.user == user.name;
  });
  var filteredIncomes = incomes.filter(function (income) {
    return income.user == user.name;
  });
  return [filteredExpenses.length > 0, filteredIncomes.length > 0];
}

window.addEventListener("load", function () {
  this.document.querySelector("#balance").innerHTML = getBalance() + " Rs";
  this.document.querySelector("#view-expense").innerHTML = getTotalExpenses();
  this.document.querySelector("#view-income").innerHTML = getTotalIncome();

  let expArena = document.querySelector("#expense-card-arena");
  let incoArena = document.querySelector("#income-card-arena");
  let expenseCar = [
    "Food",
    "Education",
    "Stationary",
    "Transport",
    "Bill",
    "Entertainment",
    "Shopping",
    "Other Expenses",
  ];

  let incomeCar = ["Collect Interest", "Salary", "Other Income"];

  if (isExpenseIncomeExist()[0] == false) {
    expArena.innerHTML = `<div class="alert alert-danger" role="alert">
    <img src="./assets/imgs/empty.png" alt="empty" width="300px">
      <div>
        No Expense Found
      </div>
    </div>`;
  } else {
    expArena.innerHTML = "";
    getExpenses().forEach(function (expense) {
      let expCat = expenseCar[expense.category - 1];
      expArena.innerHTML += `
      <div class="expense-card expense-card-view" id="expense-card-${expense.id}">
              <div class="row1">
                <p class="title">${expense.name}</p>
                <p class="date">${expense.date}</p>
              </div>
              <div class="row2">
                <p class="category">${expCat}</p>
                <p class="rate">${expense.rate} Rs</p>
              </div>
      </div>
    `;
    });
  }

  if (isExpenseIncomeExist()[1] == false) {
    incoArena.innerHTML = `<div class="alert alert-danger" role="alert">
    <img src="./assets/imgs/empty.png" alt="empty" width="300px">
      <div>
        No Income Found
      </div>
    </div>`;
  } else {
    incoArena.innerHTML = "";
    getIncome().forEach(function (income) {
      let incCat = incomeCar[income.category - 1];
      incoArena.innerHTML += `
      <div class="expense-card income-card-view" id="income-card-${income.id}">
              <div class="row1">
                <p class="title">${income.name}</p>
                <p class="date">${income.date}</p>
              </div>
              <div class="row2">
                <p class="category">${incCat}</p>
                <p class="rate">${income.rate} Rs</p>
              </div>
    </div>`;
    });
  }
});
