//Settings Variables

let notes = []

let allFiles = []

isChecked = false

textArea = document.querySelector('textArea');

//render notes

function renderNotes() {
    const container = document.getElementById('main')
    container.innerHTML = ''

    notes.forEach((note, index) => {
        const newNote = document.createElement('div')
        newNote.className = 'note-card'
        newNote.innerHTML = `
                <label class="checkbox-container" id="checkbox-container-${note.id}" for="checkbox-${note.id}">
                    <input type="checkbox" class="checkbox" id="checkbox-${note.id}" onclick="changeCircle(${note.id})">
                    <img src="icons/circle_unchecked.svg" class="circle unchecked" id="circle-${note.id}">
                </label>
                <header class="note-header" data-name="note-header">${note.title}</header>
                <button type="button" class="delete-note" onclick="deleteNote(${note.id})">
                    <img src="icons/delete_button.svg" class="delete_button" >
                </button>
            
        `
        const header = newNote.querySelector('.note-header')
        header.addEventListener('click', () => {
            openSidebar(index)
        })
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

function openSidebar(i) {
    console.log('function works');
    let note = notes[i];
    const existingSidebar = document.querySelector('.right-sidebar');
    if (existingSidebar) {
        console.log(existingSidebar.classList)
        if(existingSidebar.classList.contains('visible')) {
            
            existingSidebar.classList.remove('visible')
        }
        
    }
    
    const sidebar_wrapper = document.createElement('div')
    sidebar_wrapper.className = 'right-sidebar';
    sidebar_wrapper.innerHTML = `
        <div class="right-top">
            <div class="close-right" id="close-right">
                <img src="icons/close.svg">
            </div>
            <div class="right-filler"></div>
            <div class="add-fav" id="add-fav">
                <img class="fav-icon" id="fav-icon" src="icons/yellow_star_unchecked.svg" data-alt="icons/yellow_star_checked.png" onclick="addFavorite(this)">
            </div>
        </div>
        <div class="right-main">
            <h1 class="right-heading right-common" id="right-heading"> ${note.title}</h1>
            <section class="add-note right-common">
                <textarea placeholder="Add details" class="note-details" data-desc=""></textarea> 
            </section>
            <section class="add-file right-common" id="add-file">
                <div class="files-list" id="files-list"></div>
                <div class="add-file-btn">
                    <div class="right-plus-box">
                        <img src="icons/plus_icon.svg" class="right-plus">
                    </div>
                    <input type="file" id="note-files" class="note-files" multiple hidden />
                    <label for="note-files" class="note-files-label">Add files</label>
                </div>
                
            </section>
        </div>
        <div class="right-bottom">
            <div class="date-created"> 
            </div>
        </div>    
    
    `;
    
    
    document.body.appendChild(sidebar_wrapper)
    sidebar_wrapper.classList.toggle('visible')
    
    if (sidebar_wrapper.classList.contains('visible')) {
        //Close Sidebar
        sidebar_wrapper.querySelector('.close-right').addEventListener('click', () => {
        sidebar_wrapper.classList.remove('visible');
        sidebar_wrapper.addEventListener('transitionend', () => sidebar_wrapper.remove(), {once: true})
        })
    
        
    }

    // Code for the note description being automatically changing to the text.
    const note_desc = sidebar_wrapper.querySelector('.note-details')
    note_desc.addEventListener('input', () => {
    textArea.style.height = 'auto'
    textArea.style.height = textArea.scrollHeight + 'px'
    })

    // Code for the note files list to change height as files are added.
    const addFileSection = sidebar_wrapper.querySelector('.add-file');
    addFileSection.addEventListener('click', () => {
    addFileSection.style.height = 'auto'
    addFileSection.style.height = addFileSection.scrollHeight = 'px'
    })
}



//checking if a note is favorited

function addFavorite(img) {
    console.log('working')
    let current = img.src 
    img.src = img.dataset.alt 
    img.dataset.alt = current
    
}

//All files logic


//save files 

function saveFiles(files) {
    localStorage.setItem('files-of-the-note', JSON.stringify(files))
}

//load files 

function loadFiles() {
    const savedFiles = localStorage.getItem('files-of-the-note')
    return savedFiles ? JSON.parse(savedFiles) : []
}

//render the files

/*
function renderFiles (files) {
    const files_list = document.getElementById(`files-list`)
    files_list.innerHTML = ''
    
    if (files.length === 0) {
        files_list.style.display = 'none'
    } else {
        files_list.style.display = 'grid'
    }

    files.forEach(file => {
            const newFile = document.createElement('div')
            newFile.textContent = file.title
            newFile.className = 'files-list-item'
            files_list.appendChild(newFile)
        })
}

*/



//make the list save later

function updateFilesList() {
    /** @type {HTMLInputElement} */
    /*const file_btn = document.getElementById(`note-files`)
    let allFiles = loadFiles()

    renderFiles(allFiles)
    
    file_btn.addEventListener('change', () => {
    
        for (const file of file_btn.files) {
        allFiles.unshift({ title: file.name })
        }
        
        console.log(`New length: ${allFiles.length}`)
        saveFiles(allFiles)
        renderFiles(allFiles)
        
        
    }) */
}

//dark mode 

function toggleDarkMode() {
    darkMode = document.getElementById('dark-mode-button')

    console.log('testing')
    
}


//real-time updates

document.addEventListener('DOMContentLoaded', function () {
    setInterval(updateTime, 1000)
    updateTime()
    
    notes = loadNotes()
    renderNotes()
    updateFilesList()
})
