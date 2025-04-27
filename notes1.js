const notesContainer = document.querySelector('.notes-container');
const addButton = document.querySelector('.add');


const importButton = document.getElementById('import-button');
const input = document.getElementById('image-input');

importButton.addEventListener('click', () => {
    input.click();
});

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    let notesArray = [];

    if (savedNotes) {
        try {
            notesArray = JSON.parse(savedNotes);
        } catch (error) {
            console.error("Error parsing notes from localStorage:", error);
        }
    }

    notesContainer.innerHTML = '';
    notesArray.forEach(noteContent => {
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


input.addEventListener("change", () => {
    const files = input.files;

    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const newContainer = document.createElement("div");
                newContainer.classList.add("background-image");

                const maxHeight = 200;
                const maxWidth = 300;
                const aspectRatio = img.width / img.height;

                if (img.height > maxHeight || img.width > maxWidth) {
                    if (aspectRatio > 1) {
                        newContainer.style.width = `${maxWidth}px`;
                        newContainer.style.height = `${maxWidth / aspectRatio}px`;
                    } else {
                        newContainer.style.height = `${maxHeight}px`;
                        newContainer.style.width = `${maxHeight * aspectRatio}px`;
                    }
                } else {
                    newContainer.style.width = `${img.width}px`;
                    newContainer.style.height = `${img.height}px`;
                }

                newContainer.style.backgroundImage = `url("${reader.result}")`;
                newContainer.style.backgroundSize = "contain";
                newContainer.style.backgroundRepeat = "no-repeat";
                newContainer.style.backgroundPosition = "center";

                const deleteBtn = document.createElement("img");
                deleteBtn.src = "C:/Users/PC/Desktop/practica/StudyHub/img/delete_final.png";
                deleteBtn.classList.add("deleteBtn");
                deleteBtn.addEventListener("click", () => {
                    newContainer.remove();
                    saveConspect
                });
                newContainer.appendChild(deleteBtn);

                const conspectContainer = document.querySelector('.conspect-container');
                if (conspectContainer) {
                    conspectContainer.appendChild(newContainer);
                    saveConspect();
                } else {
                    console.error("Error: .conspect-container not found in the DOM.");
                }
            };
        };
        reader.onerror = () => {
            console.error("Error reading file:", reader.error);
        };
    });
});
