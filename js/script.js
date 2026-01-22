//Code created with assistance from Gemini
class Note {
    constructor(content) {
        this.content = content;
    }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById('notes-list'); // Writer element div constant
    const displayArea = document.getElementById('display-area'); // Reader element div constant
    const timestampDiv = document.getElementById('timestamp');

    let notesArray = JSON.parse(localStorage.getItem('notes')) || [];

    // --- WRITER LOGIC ---
    if (notesList) {
        const addBtn = document.getElementById('add-btn');

        // Inside the if (notesList) block of your script.js:

const displayWriterNotes = () => {
    notesList.innerHTML = ''; // Clear the current list
    //For each element of the notesArray, create it's own div/textarea and set the value in the text area to the note content.
    notesArray.forEach((note, index) => {
        const div = document.createElement('div');
        div.className = 'note-container';
        //Create the text area for the thing
        const textarea = document.createElement('textarea');
        textarea.className = 'form-control';
        textarea.value = note.content;
        
        // Update the array when the user types
        //Event listener e that updates on input of the text are element
        textarea.oninput = (e) => { 
            //on event, update the note at notesArray[index] to contain what the user inputted
            notesArray[index].content = e.target.value; 
        };
        //Create a remove button
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
        //When using the remove button, save the change to the notesArray
        const saveToStorage = () => {
            localStorage.setItem('notes', JSON.stringify(notesArray));
            const now = new Date();
            // userMessages comes from lang/messages/en/user.js
            timestampDiv.innerText = userMessages.lastSaved + now.toLocaleTimeString();
        };

        addBtn.onclick = () => {
            //create new empty note, then reload UI
            notesArray.push(new Note(""));
            displayWriterNotes();
        };
        
        //run saveToStorage every once in a while so notes don't get lost
        displayWriterNotes();
        setInterval(saveToStorage, 2000);
    }

    // --- READER LOGIC ---
    if (displayArea) {
        const retrieveNotes = () => {
            //retrieve notes from local storage key 'notes', if local storage data doesn't exist create empty array
            const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            displayArea.innerHTML = '';
            //for each note, create new div to display the note
            storedNotes.forEach(note => {
                const div = document.createElement('div');
                div.className = 'note-card';
                div.innerText = note.content;
                displayArea.appendChild(div);
            });

            const now = new Date();
            //Update text content of the html element to show when the data was last fetched
            timestampDiv.innerText = userMessages.lastRetrieved + now.toLocaleTimeString();
        };
        //run retrieve notes every once in a while to refresh the UI
        setInterval(retrieveNotes, 2000);
        retrieveNotes();
    }
});