const utilisateur = localStorage.getItem("prenom");
const messageBienvenue = document.getElementById('messageBienvenue');
const nombreTaches = document.getElementById('nombreTaches');

messageBienvenue.textContent = `Bonjour ${utilisateur} !`;

if (utilisateur === null) {
    window.location.href = 'index.html';
}

// Récupération des statistiques depuis l'API
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

        nombreTaches.textContent = `${data[0].todolist.length} tâches au total`;

        const nombreTachesTerminees = document.getElementById('nombreTachesTerminees');
        const nombreTachesAFaire = document.getElementById('nombreTachesAFaire');

        const tachesTerminees = data[0].todolist.filter(task => task.is_complete === true);
        const tachesAFaire = data[0].todolist.filter(task => task.is_complete === false);

        nombreTachesTerminees.textContent = `${tachesTerminees.length} tâches terminées`;
        nombreTachesAFaire.textContent = `${tachesAFaire.length} tâches à faire`;

    })
    // Gestion des erreurs lors de la récupération des statistiques
    .catch(error => {
        document.getElementById('error').textContent = 'Erreur lors de la récupération des statistiques';
        console.error('Erreur:', error);
    });