let formDom = document.querySelector("#userForm");
let textInput = document.querySelector("#text-input");
const toastTest = document.getElementById("liveToast");
let ulDom = document.querySelector(".listElements");
let counterForBackground = 1;
if (localStorage.getItem("keyCounter") == null) {
  counterForKey = 0;
} else {
  counterForKey = localStorage.getItem("keyCounter");
}
listenerForDom();

function listenerForDom() {
  formDom.addEventListener("submit", submitFunction);
  document.addEventListener("DOMContentLoaded", loadItemsFromStorage);
}

function loadItemsFromStorage() {
  let counter = localStorage.getItem("keyCounter");
  for (let i = 0; i <= counter; i++) {
    let key = "task" + i;
    let tempText = localStorage.getItem(key);
    if (tempText != null) {
      listItemCreator(tempText);
    }
  }
  console.log(counterForKey);
}

function addItemsToStorage(text) {
  let key = keyCreator();
  localStorage.setItem(key, text);
}

function keyCreator() {
  counterForKey++;
  localStorage.setItem("keyCounter", counterForKey);
  let key = "task" + counterForKey;
  return key;
}

formDom.addEventListener("submit", submitFunction);

function submitFunction(e) {
  e.preventDefault();
  if (textInput.value.trim() == "" || textInput.value == null) {
    const toast = new bootstrap.Toast(toastTest);
    toast.show();
  } else {
    listItemCreator(textInput.value);
    addItemsToStorage(textInput.value);
    textInput.value = "";
  }
}

function listItemCreator(text) {
  let li = document.createElement("li");
  if (counterForBackground % 2 == 0) {
    li.classList.add("liBackgroundDark");
    counterForBackground++;
  } else {
    li.classList.add("liBackgroundLight");
    counterForBackground++;
  }
  li.innerHTML = text;

  deleteButtonCreator(li);
  ulDom.appendChild(li);
}

function deleteButtonCreator(li) {
  let clickCounter = 0;
  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "X";
  if (counterForBackground % 2 == 0) {
    deleteBtn.classList.add("deleteBtnLight");
  } else {
    deleteBtn.classList.add("deleteBtnDark");
  }

  li.addEventListener("click", checkedListItem);

  function checkedListItem() {
    if (clickCounter % 2 == 0) {
      li.classList.add("checkedLi");
      deleteBtn.classList.add("deleteBtnChecked");
      clickCounter++;
    } else {
      li.classList.remove("checkedLi");
      deleteBtn.classList.remove("deleteBtnChecked");
      clickCounter++;
    }
  }

  li.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", deleteItem);

  function deleteItem() {
    deleteBtn.parentElement.remove();
    //if (deleteBtn.parentElement.innerText.slice(0, -1));
    for (let index = 0; index <= counterForKey; index++) {
      let tempKey = "task" + index;
      if (
        deleteBtn.parentElement.innerText.slice(0, -1) ==
        localStorage.getItem(tempKey)
      ) {
        console.log("if worked");
        localStorage.removeItem(tempKey);
      }
    }
  }
}
