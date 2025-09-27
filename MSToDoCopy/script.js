//Settings Variables

let notes = []

let allFiles = []

let lists = []

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
                <header class="note-header" data-name="note-header" id="note-header-${note.id}">${note.title}</header>
                <button type="button" class="delete-note" onclick="deleteNote(${note.id})">
                    <img src="icons/delete_button.svg" class="delete_button" >
                </button>
            
        `
        const header = newNote.querySelector(`.note-header`)
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
                    id: makeId(),
                    description: '',
                    isFav: false,
                    isComplete: false,
                    list: "My Day"
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
    const note = notes.find(n => n.id === String(noteId))
    if (!note) {console.log('no note found')}
    const container = document.getElementById(`checkbox-container-${noteId}`);
    const circle = document.getElementById(`circle-${noteId}`);
    const header = document.getElementById(`note-header-${noteId}`)

    container.addEventListener('click', (event) => {
        event.preventDefault()

        isChecked = !isChecked

        circle.classList.toggle("checked", isChecked)
        circle.classList.toggle("unchecked", !isChecked)
        if (circle.classList.contains('checked')) {
            note.isComplete = true
            header.classList.add('strike')
        } else {
            note.isComplete = false
            header.classList.remove('strike')
        }
    })
}

//show right sidebar

function openSidebar(id) {
    let note = notes[id]
    const sidebar = document.getElementById('right-sidebar')
    sidebar.innerHTML = '' 
    const header = document.createElement('div')
    header.className = 'right-top'
    header.innerHTML = `
        <div class="right-top">
            <div class="close-right" id="close-right" onclick="closeSidebar()">
                <img src="icons/close.svg">
            </div>
            <div class="right-filler"></div>
            <div class="add-fav" id="add-fav">
                <img class="fav-icon" id="fav-icon" src="icons/yellow_star_unchecked.svg" data-alt="icons/yellow_star_checked.png" onclick="addFavorite(this)">
            </div>
        </div>
    `

    const main = document.createElement('div')
    main.className = 'right-main'
    main.innerHTML = `
        <div class="right-main">
            <h1 class="right-heading right-common" id="right-heading">${note.title}</h1>
            <section class="add-note right-common">
                <textarea class="note-details"> ${note.description} </textarea> 
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
    `

    const footer = document.createElement('div')
    footer.className = 'right-bottom'
    footer.innerHTML = `
        <div class="right-bottom">
            <div class="date-created"> Created on: 
            </div>
        </div>
    `

    sidebar.appendChild(header)
    sidebar.appendChild(main)
    sidebar.appendChild(footer)
    sidebar.classList.toggle('visible');

    const textArea = main.querySelector('.note-details');
    textArea.addEventListener('input', () => {
        textArea.style.height = 'auto'
        textArea.style.height = textArea.scrollHeight + 'px'
        note.description = textArea.value;
        saveNotes()
    });

    const addFileSection = main.querySelector('.add-file')
    addFileSection.addEventListener('click', () => {
        addFileSection.style.height = 'auto'
        addFileSection.style.height = addFileSection.scrollHeight = 'px'
    });
    
}

// close right sidebar

function closeSidebar() {
    const propsSidebar = document.getElementById('right-sidebar') 
    propsSidebar.classList.remove('visible')
    saveNotes()
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



//make the list save later

function updateFilesList() {
    /** @type {HTMLInputElement} */
    /*
    const file_btn = document.getElementById(`note-files`)
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
    darkMode = document.getElementById('dark-mode-button');
    
    if (darkMode.dataset.theme === "light") {
        console.log('dark mode')
        document.body.setAttribute('style', `
            --primary-color: rgb(45, 45, 45);
            `);
        
        darkMode.dataset.theme = "dark"
    } else {
        console.log('light mode')
        document.body.setAttribute('style', `
            --primary-color: rgba(255, 255, 255, 1);
            `);
        darkMode.dataset.theme = "light"
    } 
    
    
}


//real-time updates

document.addEventListener('DOMContentLoaded', function () {
    
    
    notes = loadNotes()
    renderNotes()
    updateFilesList()
})

updateTime()