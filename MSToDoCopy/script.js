//Notes Stuff

let notes = []
//render notes

function renderNotes() {
    const container = document.getElementById('main')

    container.innerHTML = `
    <div class="note-card">
        <header class="note-header">
            <h2 class="note-title">${note.title}</h2>
            <button class="delete-note" data-id="${note.id}">Delete</button>
        </header>
    </div>
    `
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
    document.addEventListener("DOMContentLoaded", function () {
        const container = document.getElementById('checkbox-container');
        const checkbox = document.getElementById('checkbox');
        const circle = document.getElementById('circle');

        container.addEventListener('click', function (e) {
            e.preventDefault(); // stop the label from toggling checkbox

            checkbox.checked = !checkbox.checked;

            circle.src = checkbox.checked
            ? 'icons/circle_checked.svg'
            : 'icons/circle_unchecked.svg';
  });
});
}

setInterval(updateTime, 1000)
updateTime()
addNotes()
changeCircle()

