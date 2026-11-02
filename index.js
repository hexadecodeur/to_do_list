const form = document.getElementById('login-form')
const error = document.getElementById('error');
const nameInput = document.getElementById('name');
const regex = /^\p{L}+(?:-\p{L}+)*$/u;

// Ajout d'un événement pour le formulaire de connexion
form.addEventListener('submit', (event) => {
        event.preventDefault();

        const prenom = nameInput.value.trim();
        if (regex.test(prenom)) {
            error.textContent = "";
            localStorage.setItem("prenom", prenom);
            window.location.href = 'tasks.html';
        } else {
            error.textContent = 'Veuillez entrer un prénom valide';
        } 
});