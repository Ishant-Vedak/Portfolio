//Settings Variables

let notes = []

isChecked = false
//render notes

function renderNotes() {
    const container = document.getElementById('main')
    notes = [1,2,3,4,5]

    notes.forEach(note => {
        const newDiv = document.createElement('div')
        newDiv.textContent = note
        container.appendChild(newDiv)
    })
     
    /* container.innerHTML = notes.map(note => `
            <div class="note-card">
                <label class="checkbox-container" id="checkbox-container" for="checkbox">
                    <input type="checkbox" class="checkbox" id="checkbox" onclick="changeCircle()">
                    <img src="icons/circle_unchecked.svg" class="circle" id="circle">
                </label>
                <header class="note-header">${note.title}</header>
                <button class="delete-note">
                    <img src="icons/delete_button.svg" class="delete_button">
                </button>
            </div>
        `) */
}

//load notes
function loadNotes() {}

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
                    id: generateId(),
                    title: input
                })
            }
        }       
    })
    saveNotes()
    renderNotes()
}

//add time created for note 

function timeCreated() {
    return Date.now().toString()
}

//remove notes


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

function changeCircle() {
    const container = document.getElementById('checkbox-container');
    const circle = document.getElementById('circle');
    
    container.addEventListener('click', (event) => {

        isChecked = !isChecked

        circle.style.background = isChecked
        ? "url('icons/circle_checked.svg') center/cover"
        : "url('icons/circle_unchecked.svg') center/cover"
    })
}

setInterval(updateTime, 1000)
updateTime()
addNotes()

