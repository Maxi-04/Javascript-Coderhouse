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

// Función para obtener algunos Pokémon de la API
function obtenerPokemon() {
    // Número de Pokémon a obtener (3 Pokémon al azar)
    const numPokemones = 3;
    
    let pokemonPromises = [];
    for (let i = 1; i <= numPokemones; i++) {
        let idPokemon = Math.floor(Math.random() * 898) + 1; // Número aleatorio entre 1 y 898
        let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

        // Agregamos la promesa de cada solicitud fetch
        pokemonPromises.push(fetch(pokemonUrl).then(response => {
            if (!response.ok) {
                throw new Error("No se pudo obtener el Pokémon");
            }
            return response.json();
        }));
    }

    // Usamos Promise.all para esperar que todas las promesas se resuelvan
    Promise.all(pokemonPromises)
        .then(pokemons => {
            // Limpiar el contenedor antes de agregar nuevos Pokémon
            pokemonContainer.innerHTML = '';

            pokemons.forEach(pokemon => {
                // Crear un contenedor para cada Pokémon
                let pokemonDiv = document.createElement('div');
                pokemonDiv.classList.add('pokemon');
                
                // Crear un elemento de nombre
                let pokemonName = document.createElement('h3');
                pokemonName.textContent = pokemon.name;
            
                // Crear un elemento de imagen
                let pokemonImage = document.createElement('img');
                pokemonImage.src = pokemon.sprites.front_default;
                pokemonImage.alt = pokemon.name;

                // Agregar nombre e imagen al contenedor del Pokémon
                pokemonDiv.appendChild(pokemonName);
                pokemonDiv.appendChild(pokemonImage);

                // Agregar el contenedor del Pokémon al contenedor principal
                pokemonContainer.appendChild(pokemonDiv);
            });
        })
        .catch(error => {
            console.error("Error al obtener Pokémon:", error);
        });
}

// Llamamos a la función para obtener Pokémon al cargar la página
obtenerPokemon();
