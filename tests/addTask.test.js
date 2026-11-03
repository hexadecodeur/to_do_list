/**
 * @jest-environment jsdom
 */

require('jest');

let form, taskNameInput, error;
global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 1, text: 'Test Task', Tags: ['tag1', 'tag2'] })
}));

beforeEach(() => {
    document.body.innerHTML = `<h1 id="messageBienvenue"></h1>
    <form id="addTaskForm">
    <label for="taskName">Nom de la tâche :</label>
    <input type="text" id="taskName" name="taskName" required>
    <label for="addTaskTags">Tags :</label>
    <textarea id="addTaskTags" name="addTaskTags" placeholder="Séparez les tags par des virgules"></textarea>
    <p id="error"></p>
    <button type="submit">Ajouter</button>
</form>`;
    form = document.getElementById('addTaskForm');
    taskNameInput = document.getElementById('taskName');
    error = document.getElementById('error');
    localStorage.setItem('prenom', 'Camille');

    require('../addTask.js');
})

test('affiche un message d\'erreur si le nom est vide', () => {
    taskNameInput.value = '';

    form.dispatchEvent(new Event('submit'));

    expect(error.textContent).toBe('Le nom de la tâche est requis');
    expect(global.fetch).not.toHaveBeenCalled();
});


test('envoie une requête POST si le nom est valide', () => {
    taskNameInput.value = 'Test Task';
    const tagsInput = document.getElementById('addTaskTags');
    tagsInput.value = 'tag1, tag2';

    form.dispatchEvent(new Event('submit'));

    expect(global.fetch).not.toHaveBeenCalled();
});