const utilisateur = localStorage.getItem("prenom");
const messageBienvenue = document.getElementById('messageBienvenue');
const params = new URLSearchParams(window.location.search);
const id = Number(params.get('id'));
messageBienvenue.textContent = `Bonjour ${utilisateur} !`;
const finishedButton = document.getElementById('finishedButton');
const unfinishedButton = document.getElementById('unfinishedButton');
const deleteButton = document.getElementById('deleteButton');

if (utilisateur === null) {
    window.location.href = 'index.html';
}

//prend la tâche séléctionnée et affiche ses détails dans la page taskDetails.html
fetch(`http://localhost:3000/todos/${id}`)
    // Vérification de la réponse de l'API
    .then(response => response.json())
    // Traitement des données reçues de l'API
    .then(data => {

        const tache = data;
        const taskName = document.getElementById('taskName');
        const taskTags = document.getElementById('taskTags');
        const taskStatus = document.getElementById('taskStatus');
        const date = new Date(tache.created_at);
        const taskDate = document.getElementById('taskDate');

        taskName.textContent = tache.text;
        taskTags.textContent = tache.Tags.join(', ');

        if (tache.is_complete === true) {
                taskStatus.textContent = "Terminée";
            } else {
                taskStatus.textContent = "A faire";
            }

        taskDate.textContent = date.toLocaleDateString('fr-FR');

        // Ajout des événements pour les boutons "Définir comme terminée" et "Définir comme 'à faire'"
        finishedButton.addEventListener('click', function() {
            const copie = {...tache};
            copie.is_complete = true;

            // Envoi de la mise à jour de la tâche à l'API
            fetch(`http://localhost:3000/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(copie)
            })
            // Vérification de la réponse de l'API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la modification');
                }

                tache.is_complete = true;
                taskStatus.textContent = 'Terminée';
            })
            // Gestion des erreurs lors de la mise à jour de la tâche
            .catch(error => {
                console.log(error);
            });
        });

        // Ajout de l'événement pour le bouton "Définir comme 'à faire'"
        unfinishedButton.addEventListener('click', function() {
            const copie = {...tache};
            copie.is_complete = false;

            // Envoi de la mise à jour de la tâche à l'API
            fetch(`http://localhost:3000/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(copie)
            })
            // Vérification de la réponse de l'API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la modification');
                }

                tache.is_complete = false;
                taskStatus.textContent = 'A faire';
            })
            // Gestion des erreurs lors de la mise à jour de la tâche
            .catch(error => {
                console.log(error);
            });
        });

        // Ajout de l'événement pour le bouton "Supprimer la tâche"
        deleteButton.addEventListener('click', function() {
            // Envoi de la requête de suppression à l'API
            fetch(`http://localhost:3000/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tache)
            })
            // Vérification de la réponse de l'API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression');
                }
                window.location.href = 'tasks.html';
            })
            // Gestion des erreurs lors de la suppression de la tâche
            .catch(error => {
                console.log(error);
            });
        });
    });