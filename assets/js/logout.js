document.querySelector("#logout-btn").addEventListener("click", function () {
  localStorage.removeItem("loginedUser");
  window.location.href = "login.html";
});
