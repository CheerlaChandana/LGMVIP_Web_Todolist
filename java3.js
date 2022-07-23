
const Input = document.querySelector(".inputField input");
const Add = document.querySelector(".inputField button");
const lists = document.querySelector(".lists");
const deleteAllBtn = document.querySelector(".footer button");

Input.onkeyup = ()=>{
  let userValue = Input.value; //getting user entered value
  if(userValue.trim() != 0){ //if the user value isn't only spaces
    Add.classList.add("active"); //active the add button
  }else{
    Add.classList.remove("active"); //unactive the add button
  }
}

AddedItem(); 

Add.onclick = ()=>{ //when user click on plus icon button
  let userValue = Input.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  listArray.push(userValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  AddedItem(); //calling showTask function
  Add.classList.remove("active"); //unactive the add button once the task added
}

function AddedItem(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="DeletedItem(${index})"><i class="fa fa-times" aria-hidden="true"></i></span></li>`;
  });
  lists.innerHTML = newLiTag; //adding new li tag inside ul tag
  Input.value = ""; //once task added leave the input field blank
}

// delete task function
function DeletedItem(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  AddedItem(); //call the AddedItem function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  AddedItem(); //call the AddedItem function
}