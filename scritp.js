const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Tab switching
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});

// Handle login form submission
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("¡Login exitoso!");
      console.log(data.user); // Maneja los datos del usuario según necesites
    } else {
      alert(data.error || "Fallo en el login");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error");
  }
});

// Handle register form submission
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const full_name = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;
  const confirmPassword = registerForm.querySelectorAll('input[type="password"]')[1].value;

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("¡Registro exitoso!");
      console.log(data.user); // Maneja los datos del usuario según necesites
    } else {
      alert(data.error || "Fallo en el registro");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error");
  }
});