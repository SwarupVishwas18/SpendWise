function getUser() {
  var user = JSON.parse(localStorage.getItem("loginedUser"));
  return user;
}

function getExpenses() {
  var user = getUser();
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  var filteredExpenses = expenses.filter(function (expense) {
    return expense.user == user.name;
  });
  return filteredExpenses;
}

function getIncome() {
  var user = getUser();
  var incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  var filteredIncomes = incomes.filter(function (income) {
    return income.user == user.name;
  });
  return filteredIncomes;
}

function loadLast7DaysData() {
  let income = getIncome();
  let expense = getExpenses();
  // calculate 7 days prior date of current date
  let date = new Date();
  date.setDate(date.getDate() - 7);
  let dateStr = date.toISOString().slice(0, 10);
  console.log(dateStr);

  let last7DaysIncome = income.filter((item) => item.date >= dateStr);

  // create total income for each day from last 7 days
  let totalIncome = [];
  for (let i = 0; i <= 7; i++) {
    let total = 0;
    for (let j = 0; j < last7DaysIncome.length; j++) {
      if (last7DaysIncome[j].date === dateStr) {
        total += parseInt(last7DaysIncome[j].rate);
      }
    }
    totalIncome.push(total);
    date.setDate(date.getDate() + 1);
    dateStr = date.toISOString().slice(0, 10);
  }

  let last7DaysExpense = expense.filter((item) => item.date >= dateStr);
  let totalExpense = [];
  for (let i = 0; i < 7; i++) {
    let total = 0;
    for (let j = 0; j < last7DaysExpense.length; j++) {
      if (last7DaysExpense[j].date === dateStr) {
        total += parseInt(last7DaysExpense[j].rate);
      }
    }
    totalExpense.push(total);
    date.setDate(date.getDate() + 1);
    dateStr = date.toISOString().slice(0, 10);
  }

  console.log(totalExpense);

  console.log(totalIncome);
  console.log(last7DaysIncome);
  // totalIncome.reverse();
  // totalExpense.reverse();

  return {
    totalIncome,
    totalExpense,
  };
}

// get dates from all last 7 days including this one  and store it in an array

const date = new Date();
const today = date.getDate();

const xValuesot1 = [
  today - 6,
  today - 5,
  today - 4,
  today - 3,
  today - 2,
  today - 1,
  today,
];


function getCatExpense(cat) {
  let expenses = getExpenses();
  let total = 0;
  expenses.forEach((expense) => {
    if (expense.category === cat) {
      total += parseInt(expense.rate);
    }
  });
  return total;
}

function getCatIncome(cat) {
  let incomes = getIncome();
  let total = 0;
  incomes.forEach((income) => {
    if (income.category === cat) {
      total += parseInt(income.rate);
    }
  });
  return total;
}

new Chart("myChartot1", {
  type: "line",
  data: {
    labels: xValuesot1,
    datasets: [
      {
        label: "Income",
        data: loadLast7DaysData().totalIncome,
        borderColor: "#ff7c74",
        fill: false,
      },
      {
        label: "Expense",
        data: loadLast7DaysData().totalExpense,
        borderColor: "blue",
        fill: false,
      },
    ],
  },
  options: {
    legend: { display: true },
  },
});

var xValuesot = ["Food", "Entertainment", "Transport"];
var yValuesot = [getCatExpense("1"), getCatExpense("6"), getCatExpense("4")];
var barColors = ["#2b5797", "#e8c3b9", "#1e7145"];

new Chart("myChartot", {
  type: "doughnut",
  data: {
    labels: xValuesot,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValuesot,
      },
    ],
  },
});

var xValuesot2 = ["Income", "Interest", "Other"];
var yValuesot2 = [getCatIncome("1"), getCatIncome("2"), getCatIncome("3")];
var barColors = ["#b91d47", "#00aba9", "#2b5797"];

new Chart("myChartot2", {
  type: "doughnut",
  data: {
    labels: xValuesot2,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValuesot2,
      },
    ],
  },
});

const xValues = [
  today - 6,
  today - 5,
  today - 4,
  today - 3,
  today - 2,
  today - 1,
  today,
];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        label: "Income",
        data: loadLast7DaysData().totalIncome,
        borderColor: "#ff7c74",
        fill: false,
      },
      {
        label: "Expense",
        data: loadLast7DaysData().totalExpense,
        borderColor: "blue",
        fill: false,
      },
    ],
  },
  options: {
    legend: { display: true },
  },
});

// CREATE CATEGORY
let expenseCar = ["Food", "Entertainment", "Education", "Transport", "Bill"];

let incomeCar = ["Salary", "Collect Interest", "Other Income"];

var xValues1 = expenseCar;
var yValues1 = [
  getCatExpense("1"),
  getCatExpense("6"),
  getCatExpense("2"),
  getCatExpense("4"),
  getCatExpense("5"),
];
var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

new Chart("myChartot1", {
  type: "line",
  data: {
    labels: xValuesot1,
    datasets: [{ 
      data: loadLast7DaysData().totalIncome,
      borderColor: "orange",
      fill: false
    }, { 
      data: loadLast7DaysData().totalExpense,
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});


new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data: loadLast7DaysData().totalIncome,
      borderColor: "orange",
      fill: false
    }, { 
      data: loadLast7DaysData().totalExpense,
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});

new Chart("myChart1", {
  type: "doughnut",
  data: {
    labels: xValues1,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues1,
      },
    ],
  },
});

var xValues2 = incomeCar;
var yValues2 = [getCatIncome("1"), getCatIncome("2"), getCatIncome("3")];
var barColors = ["#b91d47", "#00aba9", "#2b5797"];

new Chart("myChart2", {
  type: "doughnut",
  data: {
    labels: xValues2,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues2,
      },
    ],
  },
});

function getTotalExpenses() {
  var expenses = getExpenses();
  var total = 0;
  expenses.forEach(function (expense) {
    total += parseInt(expense.rate);
  });
  return total;
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

document.querySelector("#currentBalance").innerHTML = getBalance() + "/-  ";
document.querySelector("#currentBalance2").innerHTML = getBalance() + "/-  ";
