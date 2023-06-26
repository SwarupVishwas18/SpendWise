var nameDOM = document.querySelector("#name");
var emailDOM = document.querySelector("#email");
var passwordDOM = document.querySelector("#password");

// create ceasar cipher encryption function to encrypt password by shifting each character by 5 places

function encryptPassword(password) {
  let encryptedPassword = "";
  for (let i = 0; i < password.length; i++) {
    let ascii = password.charCodeAt(i);
    if (ascii >= 65 && ascii <= 90) {
      ascii = ((ascii - 65 + 5) % 26) + 65;
    } else if (ascii >= 97 && ascii <= 122) {
      ascii = ((ascii - 97 + 5) % 26) + 97;
    }
    encryptedPassword += String.fromCharCode(ascii);
  }
  return encryptedPassword;
}

// create function for email id validation
function validateEmail(email) {
  let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  return regex.test(email);
}

document.querySelector("#signup-btn").addEventListener("click", () => {
  let name = nameDOM.value;
  let email = emailDOM.value;
  let password = passwordDOM.value;

  if (name == "" || email == "" || password == "") {
    alert("You have not filled all the details..!!");
    return;
  }
  if (!validateEmail(email)) {
    alert("Please enter valid email id");
    return;
  }
  if (checkIfUserExist(email, name)) {
    alert("Email or Username Already Exists!!");
  } else {
    addUser(name, email, encryptPassword(password));
  }
});

function checkIfUserExist(email, name) {
  if (localStorage.getItem("users") == null) {
    return false;
  }
  let users = JSON.parse(localStorage.getItem("users"));

  if (
    users.filter((user) => {
      console.log(user.email);
      return user.email == email;
    }).length > 0 ||
    users.filter((user) => {
      console.log(user.name);
      return user.name == name;
    }).length > 0
  ) {
    console.log(email);
    return true;
  }
  return false;
}

function addUser(name, email, password) {
  if (localStorage.getItem("users") == null) {
    // create empty array called users and then add user in it in the form of object
    let users = [];
    let user = {
      name,
      email,
      password,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loginedUser", JSON.stringify(user));
  } else {
    // if users array already exists then add user in it
    let users = JSON.parse(localStorage.getItem("users"));
    let user = {
      name,
      email,
      password,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loginedUser", JSON.stringify(user));
  }
  alert("User Added Successfully!!");
  window.location.href = "dashboard.html";
}
