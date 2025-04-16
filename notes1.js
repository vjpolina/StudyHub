const notesContainer = document.querySelector('.notes-container');
const addButton = document.querySelector('.add');
let notes = document.querySelectorAll('.input-box');

function loadNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes');
}
loadNotes();

function saveNotes() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

addButton.addEventListener('click', () => {
    let newNote = document.createElement('p');
    let newImg = document.createElement('img');
    newNote.className = 'input-box';
    newImg.className = 'deleteBtn';
    newNote.setAttribute('contenteditable', 'true');
    newImg.src = 'C:/Users/PC/Desktop/practica/StudyHub/img/delete.png';
    notesContainer.appendChild(newNote);
    newNote.appendChild(newImg);
});

notesContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'IMG'){
        e.target.parentElement.remove();
        saveNotes();
    }
    else if(e.target.tagName === 'P'){
        notes = document.querySelectorAll('.input-box');
        notes.forEach(nt => {
            nt.onkeyup = function() {
                saveNotes();
            };
    });
}});