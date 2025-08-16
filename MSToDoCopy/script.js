//Settings Variables

let notes = []

isChecked = false

textArea = document.querySelector('textArea');

//render notes

function renderNotes() {
    const container = document.getElementById('main')
    container.innerHTML = ''

    notes.forEach(note => {
        const newNote = document.createElement('div')
        newNote.className = 'note-card'
        newNote.innerHTML = `
                <label class="checkbox-container" id="checkbox-container-${note.id}" for="checkbox-${note.id}">
                    <input type="checkbox" class="checkbox" id="checkbox-${note.id}" onclick="changeCircle(${note.id})">
                    <img src="icons/circle_unchecked.svg" class="circle unchecked" id="circle-${note.id}">
                </label>
                <header class="note-header" data-name="note-header" onclick="showProperties(${note.id})">${note.title}</header>
                <button type="button" class="delete-note" onclick="deleteNote(${note.id})">
                    <img src="icons/delete_button.svg" class="delete_button" >
                </button>
            
        `
        container.appendChild(newNote)
    })
}

//load notes
function loadNotes() {
    const savedNotes = localStorage.getItem('quicknotes')
    return savedNotes ? JSON.parse(savedNotes) : []
}

//save notes
function saveNotes() {
    localStorage.setItem('quicknotes', JSON.stringify(notes))
}

//add notes

function addNotes() {  
    const input = document.getElementById('add-new-note')
    input.addEventListener("keydown", function (event) {
        
        if(event.key == "Enter") {
            event.preventDefault()
            const value = input.value.trim()
            if (value) {
                notes.unshift({
                    title: value,
                    id: makeId()
                }) 
                saveNotes()
                renderNotes()
                input.value = ''
            } 
        }       
    })
   
}


//add time created for note 

function makeId() {
    return Date.now().toString()
}

//remove notes

function deleteNote(noteId) {
    notes = notes.filter(note => note.id != noteId )
    saveNotes()
    renderNotes()
}


//Update Date and time

function updateTime() {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currentDateObj = new Date();
const currentDay = weekDays[currentDateObj.getDay()];
const currentDate = currentDateObj.getDate();
const currentMonth = monthsArr[currentDateObj.getMonth()];

document.getElementById('day-and-date').textContent = `${currentDay}, ${currentMonth} ${currentDate}`
}

//make function to change the circle in the checkbox

function changeCircle(noteId) {
    const container = document.getElementById(`checkbox-container-${noteId}`);
    const circle = document.getElementById(`circle-${noteId}`);
    
    container.addEventListener('click', (event) => {
        event.preventDefault()

        isChecked = !isChecked

        circle.classList.toggle("checked", isChecked)
        circle.classList.toggle("unchecked", !isChecked)
    })
}

//show right sidebar

function showProperties(noteId) {
    const propsSidebar = document.getElementById('right-sidebar')
    const noteToChange = notes.find(note => note.id == noteId) 
    if (noteId) {
        //alert("working")
    }
}

//checking if a note is favorited

function addFavorite() {
    const star = document.getElementById('add-fav');
    const favIcon = document.getElementById('fav-icon');
    favIcon.addEventListener('click', function () {
        favIcon.classList.toggle('filled')
    })
}

//adjusting the text area height in note.

textArea.addEventListener('input', () => {
    textArea.style.height = 'auto'
    textArea.style.height = textArea.scrollHeight + 'px'
})

//real-time updates

document.addEventListener('DOMContentLoaded', function () {
    setInterval(updateTime, 1000)
    updateTime()

    notes = loadNotes()
    renderNotes()
})


