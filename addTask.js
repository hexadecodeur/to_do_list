const utilisateur = localStorage.getItem("prenom");
const messageBienvenue = document.getElementById('messageBienvenue');
const form = document.getElementById('addTaskForm');

messageBienvenue.textContent = `Bonjour ${utilisateur} !`;

if (utilisateur === null) {
    window.location.href = 'index.html';
}

// Ajout d'un événement pour le formulaire d'ajout de tâche
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const addTaskTags = document.getElementById('addTaskTags').value;

    // Envoi de la nouvelle tâche à l'API
    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: taskName,
            Tags: addTaskTags.split(',').map(tag => tag.trim())
        })
    })
    // Vérification de la réponse de l'API
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de la tâche');
        }
        return response.json();
    })
    // Redirection vers la page des tâches après l'ajout
    .then(data => {
        console.log(data);
        window.location.href = 'tasks.html';
    })
    // Gestion des erreurs lors de l'ajout de la tâche
    .catch(error => {
        document.getElementById('error').textContent = 'Erreur lors de l\'ajout de la tâche';
        console.log(error);
    });
});