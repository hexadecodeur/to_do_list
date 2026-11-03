const form = document.getElementById('login-form')
const errorName = document.getElementById('errorName');
const nameInput = document.getElementById('name');
const regex = /^\p{L}+(?:[ '’-]\p{L}+)*$/u;

// Ajout d'un événement pour le formulaire de connexion
form.addEventListener('submit', (event) => {
        event.preventDefault();

        const prenom = nameInput.value.trim();
        if (regex.test(prenom)) {
            errorName.textContent = "";
            localStorage.setItem("prenom", prenom);
            window.location.href = 'tasks.html';
        } else {
            errorName.textContent = 'Veuillez entrer un prénom valide';
        } 
});