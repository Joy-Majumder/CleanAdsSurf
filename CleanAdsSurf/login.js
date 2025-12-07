const apiBase = "http://localhost:3000/api/auth";

const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.textContent = "";

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    loginError.textContent = "Please enter email and password.";
    return;
  }

  try {
    const res = await fetch(`${apiBase}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usernameOrEmail: email,
        password
      })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      loginError.textContent = data.error || "Login failed.";
      return;
    }

    const data = await res.json();

    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.set({
        userLoggedIn: true,
        user: data.user || null
      });
    }

    window.location.href = "popup/popup.html";
  } catch (error) {
    console.error("Login error:", error);
    loginError.textContent = "Unable to reach server. Make sure backend is running on http://localhost:3000";
  }
});
