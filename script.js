const buttonElement = document.getElementById("btn")
const appElement = document.getElementById("app")


getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content)
    appElement.insertBefore(noteEl, buttonElement)
})
function createNoteEl(id, content){
    const element = document.createElement("textarea")
    element.classList.add("note")
    element.placeholder = "Empty Note"
    element.value = content 

    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this?")
        if(warning){
            deleteNote(id, content)
        }
    })

    element.addEventListener("input", () =>{
        updateNote(id, element.value)
    })
    
return element
}


function deleteNote(id, element){
    const notes = getNotes().filter((note) => note.id != id)
    saveNote(notes)
    appElement.removeChild(element)

}

function updateNote(id, content){
    const notes = getNotes()
    const target = notes.filter((note) => note.id == id)[0]
    target.content = content
    saveNote(notes)
}



function addNote(){

    const notes = getNotes()
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    }
   const noteEl = createNoteEl(noteObj.id, noteObj.content);
   appElement.insertBefore(noteEl, buttonElement);

   notes.push(noteObj)
   saveNote(notes)
}

function saveNote(notes){
    localStorage.setItem("note-app", JSON.stringify(notes))
}

function getNotes(){    
 return JSON.parse(localStorage.getItem("note-app") || "[]")
}
buttonElement.addEventListener("click", addNote)