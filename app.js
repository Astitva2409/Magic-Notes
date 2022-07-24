
showNotes();

document.getElementById('addBtn').addEventListener('click', function () {
    
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle'); 

    if (addTxt.value.length == 0) {
        alert("Note should not be empty.");
    }
    else if(addTitle.value.length == 0) {
        alert("Title should not be empty.");
    }
    else {

        let noteTitle = localStorage.getItem('title');
        let noteValue = localStorage.getItem('value');

        if (noteTitle == null && noteValue == null) {
            titles = [];
            values = [];
        }
        else {
            titles = JSON.parse(noteTitle);
            values = JSON.parse(noteValue);
        }

        titles.push(addTitle.value.toUpperCase());
        values.push(addTxt.value);

        localStorage.setItem('title', JSON.stringify(titles));
        localStorage.setItem('value', JSON.stringify(values));

        addTitle.value = "";
        addTxt.value = "";
        
        showNotes();
    }
    // showNotes(addTitle.value, addTxt.value);
});

function showNotes() {
    
    let noteTitle = localStorage.getItem('title');
    let noteValue = localStorage.getItem('value');

    if (noteTitle == null && noteValue == null) {
        titles = [];
        values = [];
    }
    else {
        titles = JSON.parse(noteTitle);
        values = JSON.parse(noteValue);
    }

    let html = '';
    values.forEach(function (element, i) {

        html += `<div class="noteCard my-3 mx-3 card" style="width: 18rem;">
                 <div class="card-body">
                    <h5 class="card-title"><b>${titles[i]}</b></h5>
                    <p class="card-text">${element}</p>
                    <button class="btn btn-primary" onclick="deleteNote(${i})">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElement = document.getElementById('notes');
    if (values.length != 0 && titles.length != 0) {
        notesElement.innerHTML = html;
    }
    else {
        notesElement.innerHTML = 'Nothing to show. Use "Add Note" to add a new Note.';
    }
}

function deleteNote(index) {
    
    let noteTitle = localStorage.getItem('title');
    let noteValue = localStorage.getItem('value');

    if (noteTitle == null && noteValue == null) {
        titles = [];
        values = [];
    }
    else {
        titles = JSON.parse(noteTitle);
        values = JSON.parse(noteValue);
    }

    titles.splice(index, 1);
    values.splice(index, 1);

    localStorage.setItem('title', JSON.stringify(titles));
    localStorage.setItem('value', JSON.stringify(values));
    
    showNotes();
}

document.getElementById('searchTxt').addEventListener('input', function () {

    let inputVal = document.getElementById('searchTxt').value.toUpperCase();
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.querySelector('h5').innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block"
        } else {
            element.style.display = "none";
        }
    });
});