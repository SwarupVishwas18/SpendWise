document.querySelector("#logout-btn").addEventListener("click", function () {
  localStorage.removeItem("loginedUser");
  window.location.href = "login.html";
});

document.querySelector("#logout-btn2").addEventListener("click", function () {
  localStorage.removeItem("loginedUser");
  window.location.href = "login.html";
});
