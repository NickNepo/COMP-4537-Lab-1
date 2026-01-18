class Note {
    constructor(content) {
        this.content = content;
    }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById('notes-list'); // Writer element
    const displayArea = document.getElementById('display-area'); // Reader element
    const timestampDiv = document.getElementById('timestamp');

    let notesArray = JSON.parse(localStorage.getItem('notes')) || [];

    // --- WRITER LOGIC ---
    if (notesList) {
        const addBtn = document.getElementById('add-btn');

        // Inside the if (notesList) block of your script.js:

const displayWriterNotes = () => {
    notesList.innerHTML = ''; // Clear the current list
    notesArray.forEach((note, index) => {
        const div = document.createElement('div');
        div.className = 'note-container';

        const textarea = document.createElement('textarea');
        textarea.className = 'form-control';
        textarea.value = note.content;
        
        // Update the array when the user types
        textarea.oninput = (e) => { 
            notesArray[index].content = e.target.value; 
        };

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger';
        removeBtn.innerText = 'Remove';
        
        // VISUAL REMOVAL LOGIC
        removeBtn.onclick = () => {
            // 1. Remove the item from the data array
            notesArray.splice(index, 1);
            
            // 2. Immediately update Local Storage
            saveToStorage();
            
            // 3. Immediately re-render the UI to reflect the change
            displayWriterNotes();
        };

        div.appendChild(textarea);
        div.appendChild(removeBtn);
        notesList.appendChild(div);
    });
};

        const saveToStorage = () => {
            localStorage.setItem('notes', JSON.stringify(notesArray));
            const now = new Date();
            // userMessages comes from lang/messages/en/user.js
            timestampDiv.innerText = userMessages.lastSaved + now.toLocaleTimeString();
        };

        addBtn.onclick = () => {
            notesArray.push(new Note(""));
            displayWriterNotes();
        };

        displayWriterNotes();
        setInterval(saveToStorage, 2000);
    }

    // --- READER LOGIC ---
    if (displayArea) {
        const retrieveNotes = () => {
            const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            displayArea.innerHTML = '';

            storedNotes.forEach(note => {
                const div = document.createElement('div');
                div.className = 'note-card';
                div.innerText = note.content;
                displayArea.appendChild(div);
            });

            const now = new Date();
            timestampDiv.innerText = userMessages.lastRetrieved + now.toLocaleTimeString();
        };

        setInterval(retrieveNotes, 2000);
        retrieveNotes();
    }
});