# To Do List · EM Services

Application de suivi des tâches d’une équipe en télétravail, réalisée dans le cadre du projet frontend de GDU Campus. Chaque collaborateur peut consulter la liste commune, ajouter une tâche et mettre à jour son avancement.

**[Ouvrir l’application sur Vercel](https://todolist-beta-self.vercel.app/)**

## Utiliser l’application

1. Saisir son prénom sur la page d’accueil. Le navigateur le conserve dans le `localStorage` pour personnaliser le message de bienvenue.
2. Ouvrir la liste des tâches. Chaque ligne affiche le titre, le statut et un bouton **Détails**.
3. Choisir **Ajouter une tâche**, saisir un titre et, si besoin, des tags séparés par des virgules. La nouvelle tâche apparaît avec le statut **À faire**.
4. Depuis la fiche de détail, marquer la tâche comme terminée, la rouvrir ou la supprimer.
5. Consulter **Voir les statistiques** depuis la liste pour retrouver le total des tâches et leur répartition entre les deux statuts.

## Lancer le frontend en local

Cloner le dépôt puis se placer dans son dossier.

```
git clone https://github.com/hexadecodeur/to_do_list.git
cd to_do_list
```

Ouvrir ensuite [l’accueil local](http://127.0.0.1:8000/). Le frontend local utilise la même API hébergée que la démo publique. Les ajouts, changements de statut et suppressions portent donc sur la liste partagée.

## Organisation du frontend

| Page | Script | Rôle |
| --- | --- | --- |
| `index.html` | `index.js` | Valider et mémoriser le prénom |
| `tasks.html` | `tasks.js` | Charger la liste et ouvrir la fiche d’une tâche |
| `addTask.html` | `addTask.js` | Valider le titre, préparer les tags et envoyer la création |
| `taskDetails.html` | `taskDetails.js` | Charger une tâche par son identifiant, modifier son statut ou la supprimer |
| `stats.html` | `stats.js` | Calculer les trois compteurs à partir des tâches reçues |

La feuille de style commune se trouve dans `css/style.css`. Elle adapte notamment le formulaire d’accueil et la liste des tâches aux petits écrans.

## API

Le frontend communique avec l’API fournie pour l’exercice via `fetch`. La liste utilise `GET /todos`, la création `POST /todos` et la fiche de détail `GET`, `PUT` et `DELETE` sur `/todos/:id`. Le backend de démonstration conserve les tâches en mémoire.

## Lancer les tests

Avec Node.js et npm installés, exécuter depuis la racine du dépôt :

```
npm test
```

Les tests du formulaire d’ajout se trouvent dans `tests/addTask.test.js`. Jest utilise jsdom pour recréer le formulaire et un mock de `fetch` pour éviter les appels à l’API publique. Le test du titre vide vérifie que le message d’erreur s’affiche et qu’aucune requête ne part.