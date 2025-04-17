const notesContainer = document.querySelector('.notes-container');
const addButton = document.querySelector('.add');


function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesContainer.innerHTML = '';
    savedNotes.forEach(noteContent => {
        createNoteElement(noteContent);
    });
}


function saveNotes() {
    const notes = Array.from(notesContainer.children).map(note => {
        const noteContent = note.querySelector('.input-box');
        return noteContent ? noteContent.innerHTML : '';
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function createNoteElement(content = '') {
    let newNote = document.createElement('div');
    let noteContent = document.createElement('p');
    let newImg = document.createElement('img');

    newNote.className = 'note-wrapper';
    noteContent.className = 'input-box';
    newImg.className = 'deleteBtn';

    noteContent.setAttribute('contenteditable', 'true');
    newImg.src = 'C:/Users/PC/Desktop/practica/StudyHub/img/delete_final.png';

    noteContent.innerHTML = content;
    newNote.appendChild(noteContent);
    newNote.appendChild(newImg);
    notesContainer.appendChild(newNote);

    noteContent.addEventListener('keyup', () => {
        saveNotes();
    });

    newImg.addEventListener('click', () => {
        newNote.remove();
        saveNotes();
    });
}

addButton.addEventListener('click', () => {
    createNoteElement();
    saveNotes();
});

loadNotes();
