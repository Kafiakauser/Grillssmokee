document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("Please enter both username and password.");
      return;
    }

    // Simple demo login check
    if (username === "admin" && password === "grill123") {
      alert("Welcome back, Grill Master!");
      window.location.href = "menu.html";
    } else {
      alert("Invalid credentials. Try again.");
    }

    form.reset();
  });
});
