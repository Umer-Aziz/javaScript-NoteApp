console.log("Welcome");
NotesOutput();

let btn = document.getElementById("add-btn");
btn.addEventListener("click", function () {
  // console.log("adding..");
  let title = document.getElementById("add-title");
  let text = document.getElementById("add-text");
  let notes = localStorage.getItem("notes");
  if(title.value.length<4 || text.value.length<8){
    return false
  }
  else{
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push([title.value, text.value]);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  title.value = "";
  text.value = "";
  console.log(notesObj);
  
  NotesOutput();
}
});
function NotesOutput() {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  let str = "";
  notesObj.forEach((element, index) => {
    str += `
      <div class="Note-card card my-4 mx-2" style="width: 18rem;">
      <div class="card-body">
        <h5 id="search-data"class="card-title">${element[0]}</h5>
        <p id="search-data"class="card-text">${element[1]}</p>
        <button  class="btn btn-info" onclick="deleted(${index})">Delete</button>
      </div>
    </div> `;
  });
  let notes_taking = document.getElementById("notes-Taking");
  if (notesObj.length != 0) {
    notes_taking.innerHTML = str;
  } 
  else {
    notes_taking.innerHTML ="I am Your NoteBook Please Share SomeThing With Me!";
  }
}


function deleted(index){
if(confirm("Do You Want to delete note?")){
let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1)
localStorage.setItem("notes", JSON.stringify(notesObj));
NotesOutput()
}
}
let del=document.getElementById("del-btn");
del.addEventListener('click',function(){
  if(confirm('Do Want to Clear All Notes?')){
    localStorage.clear();
    NotesOutput();
  }
})
let SearchNote=document.getElementById('Search-Note');
SearchNote.addEventListener("input",function(){

  let Search_Value=SearchNote.value.toLowerCase();
  let note_card=document.getElementsByClassName("Note-card");
  Array.from(note_card).forEach(function(element){
    let card_text=element.getElementsByTagName("h5")[0].innerText;
    if(card_text.includes(Search_Value)){
      element.style.display = "block";
    }
    else{
      element.style.display="none";
    }

  });

});
