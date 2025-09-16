// REGISTRO
document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensajeDiv = document.getElementById("registroMensaje");

  // Validaciones
  if (!nombre || !email || !password) {
    mensajeDiv.textContent = "❌ Todos los campos son obligatorios.";
    mensajeDiv.className = "error";
    return;
  }

  if (password.length < 6) {
    mensajeDiv.textContent = `❌ La contraseña debe tener mínimo 6 caracteres(actualmente tiene ${password.length}).`
    mensajeDiv.className = "error";
    return;
  }

  // Guardar en localStorage (simulación de base de datos)
  const usuario = {
    nombre,
    email,
    password
  };
  localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));

  mensajeDiv.textContent = `✅ Usuario ${nombre} registrado correctamente.`;
  mensajeDiv.className = "success";
});


// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const mensajeDiv = document.getElementById("loginMensaje");

  const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if (!usuarioGuardado) {
    mensajeDiv.textContent = "❌ No hay usuarios registrados.";
    mensajeDiv.className = "error";
    return;
  }

  if (email === usuarioGuardado.email && password === usuarioGuardado.password) {
    mensajeDiv.textContent =` ✅ Bienvenido, ${usuarioGuardado.nombre}`;
    mensajeDiv.className = "success";
  } else {
    mensajeDiv.textContent = "❌ Correo o contraseña incorrectos.";
    mensajeDiv.className = "error";
  }
});