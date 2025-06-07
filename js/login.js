document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30
    })
  })
    .then(res => res.json().then(data => ({
      status: res.status,
      info: data
    })))
    .then(result => {
      if (result.status === 200) {
        localStorage.setItem("token", result.info.token);
        localStorage.setItem("user", JSON.stringify(result.info));
        
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("info").innerHTML =
          `<div class="alert alert-danger">Usuario o contraseña inválidos</div>`;
      }
    })
    .catch(error => {
      console.error("Error en login:", error);
      document.getElementById("info").innerHTML =
        `<div class="alert alert-danger">Error de conexión. Intenta de nuevo.</div>`;
    });
});
