// variables


// eventListeners
eventListeners()
function eventListeners() {

    // add note to doc & local storage
    document.querySelector('#form').addEventListener('submit', getNote);

    // remove note to doc & local storage
    document.querySelector('#note-list').addEventListener('click', removeNote)

    // add notes when page loaded
    addEventListener('DOMContentLoaded', addNoteLoaded)
}

// get note from user
function getNote(e) {

    e.preventDefault();

    // get note value
    const note = document.querySelector('#note').value;

    addNote(note);

    addNoteToLocalStorage(note)
}

// adding note to dom
function addNote(note) {

    // get list from doc
    const list = document.querySelector('#note-list')

    // create remove btn
    const removeBTN = document.createElement('i')
    removeBTN.setAttribute("class", "far fa-trash-alt remove-note")

    // create li
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(note))
    li.appendChild(removeBTN)

    // add li to doc
    list.appendChild(li);

}

function removeNote(e) {

    // check click to trash
    if (e.target.classList.contains('remove-note')) {
        // remove from doc
        e.target.parentElement.remove();
        // remove from localStorage
        removeNoteFromLS(e.target.parentElement.innerHTML.split('<')[0])
    }
}

// get Condition of local storage
function getLocalStorageNotes() {
    let notes;
    if (JSON.parse(localStorage.getItem('notes')) === null) {
        notes = []
    } else {
        notes = JSON.parse(localStorage.getItem('notes'))
    }
    return notes;
}

// addNoteToLocalStorage
function addNoteToLocalStorage(note) {

    let notes = getLocalStorageNotes()
    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes))
}

// remove note from local storage
function removeNoteFromLS(note) {
    let notes = getLocalStorageNotes();
    
    // notes.forEach((element, index) => {
    //     if (element === note) {
    //         notes.splice(index, 1)
    //         return true
    //     }
    // });
    let BreakException = {}
    try {
        notes.forEach(function(element, index) {
            if (element === note) {
                notes.splice(index, 1)
                throw BreakException;
            }
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }

    localStorage.setItem('notes', JSON.stringify(notes))
}


// add from local storage to dom when page loaded
function addNoteLoaded(){
    const notes = getLocalStorageNotes();

    notes.forEach(note=>{
        addNote(note)
    })
}