// Elementos 
let userInput = document.getElementById("user");
let passwordInput = document.getElementById("password");
let loginButton = document.getElementById("boton");
let mostrarPass = document.getElementById("mostrarPass");
let pokemonContainer = document.getElementById("pokemon-container");  // Contenedor para los Pokémon

// Evento de clic para el botón de inicio de sesión
loginButton.addEventListener("click", () => {
    if (userInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
        // Crear el objeto "persona" con los valores actuales del formulario
        let persona = {
            nombre: userInput.value.trim(),
            contraseña: passwordInput.value.trim()
        };
        
        // Guardar en "localStorage"
        localStorage.setItem("Objeto", JSON.stringify(persona));

        // Redirigir al usuario
        window.location.href = "home.html";
    } else {
        Toastify({
            text: "Todos los campos son obligatorios!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #f95959, #f95959)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    }
});

// Evento para mostrar / ocultar la contraseña
mostrarPass.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

