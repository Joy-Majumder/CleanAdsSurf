const apiBase = "http://localhost:3000/api/auth";

const signupForm = document.getElementById("signup-form");
const signupError = document.getElementById("signup-error");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  signupError.textContent = "";

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm").value;

  if (!username || !email || !password || !confirmPassword) {
    signupError.textContent = "All fields are required.";
    return;
  }

  if (password !== confirmPassword) {
    signupError.textContent = "Passwords do not match.";
    return;
  }

  try {
    const res = await fetch(`${apiBase}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword
      })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      signupError.textContent = data.error || "Signup failed.";
      return;
    }

    window.location.href = "login.html";
  } catch (error) {
    console.error("Signup error:", error);
    signupError.textContent = "Unable to reach server. Make sure backend is running on http://localhost:3000";
  }
});
