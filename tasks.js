const utilisateur = localStorage.getItem("prenom");
const messageBienvenue = document.getElementById('messageBienvenue');
const addTaskButton = document.getElementById('addTaskButton');
const statsButton = document.getElementById('statsButton');

messageBienvenue.textContent = `Bonjour ${utilisateur} !`;

if (utilisateur === null) {
    window.location.href = 'index.html';
}

// Ajout d'un événement pour le bouton "Ajouter une tâche"
addTaskButton.addEventListener('click', function () {
    window.location.href = 'addTask.html';
    });

// Ajout d'un événement pour le bouton "Voir les statistiques"
statsButton.addEventListener('click', function () {
    window.location.href = 'stats.html';
});

// Récupération des tâches depuis l'API
fetch("https://totolist-api.vercel.app/todos")
    // Vérification de la réponse de l'API
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur API");
        }
        return response.json();
    })

    // Traitement des données reçues de l'API
    .then(data => {

        const listeTaches = document.getElementById('listeTaches');
        const nombreTaches = document.getElementById('nombreTaches');

        nombreTaches.textContent = `${data[0].todolist.length} tâches au total`;

        // Filtrage des tâches terminées et à faire
        data[0].todolist.forEach(task => {

            const elementTache = document.createElement('li');
            const titreTache = document.createElement('span');
            titreTache.classList.add('titre-tache');
            titreTache.textContent = task.text;

            elementTache.appendChild(titreTache);

            listeTaches.appendChild(elementTache);

            const statutTache = document.createElement('span');
            elementTache.appendChild(statutTache);

            if (task.is_complete === true) {
                statutTache.textContent = "Terminée";
                statutTache.classList.add("terminee");
            } else {
                statutTache.textContent = "A faire";
                statutTache.classList.add("a-faire");
            }

            const buttonDetails = document.createElement('button');
            buttonDetails.classList.add("details-button");
            buttonDetails.textContent = "Détails";
            elementTache.appendChild(buttonDetails);

            // Ajout d'un événement pour le bouton "Détails"
            buttonDetails.addEventListener('click', function () {
                window.location.href = `taskDetails.html?id=${task.id}`;
            })
        });
    })
    // Gestion des erreurs lors de la récupération des tâches
    .catch(error => {
        document.getElementById('error').textContent = 'Erreur lors de la récupération des tâches';
        console.error('Erreur:', error);
    });

// Gestion du rafraîchissement de la page
window.addEventListener('pageshow', function(event) {
    if (event.persisted === true) {
        window.location.reload();
    }
});