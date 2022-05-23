// Initialising Selectors
const modal = document.querySelector(".modal");
const addBookbtnmodal = document.querySelector(".addbookbtn");
const editModal = document.querySelector(".edit-modal");
const addbookbtnform = document.querySelector("#addbookbtnform");
const closebtn = document.querySelectorAll(".close-icon");
const bookName = document.querySelector("#book-name");
const authorName = document.querySelector("#author-name");
const publishYearHTML = document.querySelector("#publish-year");
const pages = document.querySelector("#pages");
const pagesCompletedHTML = document.querySelector("#pages-completed");
const pagesCompletedLabelHTML = document.querySelector(
  "#pages-completed+label"
);
const editBookName = document.querySelector("#edit-book-name");
const editAuthorName = document.querySelector("#edit-author-name");
const editPublishYearHTML = document.querySelector("#edit-publish-year");
const editPages = document.querySelector("#edit-pages");
const editPagesCompletedHTML = document.querySelector("#edit-pages-completed");
const editPagesCompletedLabelHTML = document.querySelector(
  "#edit-pages-completed+label"
);
const saveBookbtn = document.querySelector("#editbookbtnform");
const bookDisplay = document.querySelector(".books");
const form = document.querySelector("form");
const confirmModal = document.querySelector(".confirm-delete-modal");
const deleteModalBtns = document.querySelector(".buttons");
const yesbtn = deleteModalBtns.childNodes[1];
const nobtn = deleteModalBtns.childNodes[3];
const deleteAll = document.querySelector("#delete-all-btn");
let temp;

let myLibrary = [];

//Checking if LocalStorage is available if not create Cells
if (localStorage.getItem("books") === null) {
  myLibrary = [];
} else {
  myLibrary = JSON.parse(localStorage.getItem("books"));
  for (let index = 0; index < myLibrary.length; index++) {
    createGrid(myLibrary[index]);
    bookIndex();
  }
}

//Event Listeners of Addbook, Close and delete All button.
addBookbtnmodal.addEventListener("click", displayModal);
closebtn.forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

deleteAll.addEventListener("click", () => {
  while (bookDisplay.lastElementChild) {
    bookDisplay.removeChild(bookDisplay.lastElementChild);
  }
  myLibrary.splice(0, myLibrary.length);
  saveStorage();
});

window.addEventListener("click", (e) => {
  if (e.target == modal || e.target == editModal || e.target == confirmModal) {
    closeModal();
  }
});

// Saving or updating localStorage
function saveStorage() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

function displayModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  editModal.style.display = "none";
  confirmModal.style.display = "none";
}

// EventListener for Form's Add book Button
addbookbtnform.addEventListener("click", function (e) {
  let addbook = new book(
    `${bookName.value}`,
    `${authorName.value}`,
    `${publishYearHTML.value}`,
    `${pages.value}`,
    `${pagesCompletedHTML.value}`
  );
  if (form.checkValidity() === false) {
    form.reportValidity();
    return;
  } else {
    e.preventDefault();
    addBookToLibrary(addbook);
    createGrid(addbook);
    bookIndex();
    closeModal();
    clearValue();
    saveStorage();
  }
});

// Delete button of Each Entry
deleteModalBtns.childNodes[1].addEventListener("click", () => {
  document.getElementById(`${temp}`).remove();
  myLibrary.splice(temp, 1);
  bookIndex();
  saveStorage();
  closeModal();
});

deleteModalBtns.childNodes[3].addEventListener("click", closeModal);

class book {
  constructor(name, author, publishYear, numberOfPages, pagesCompleted) {
    this.name = name;
    this.author = author;
    this.publishYear = publishYear;
    this.numberOfPages = numberOfPages;
    this.pagesCompleted = pagesCompleted;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

//Creating Entries
function createGrid(bookArray) {
  const gridCell = document.createElement("div");
  const cellName = document.createElement("div");
  cellName.classList.add("book-title");
  const cellAuthor = document.createElement("div");
  cellAuthor.classList.add("book-author");
  const cellPublishYear = document.createElement("div");
  cellPublishYear.classList.add("publish-year");
  const cellNumberOfPages = document.createElement("div");
  cellNumberOfPages.classList.add("no-of-pages");
  const cellPagesCompleted = document.createElement("div");
  cellPagesCompleted.classList.add("pages-completed");
  let nameText = document.createTextNode(`${bookArray.name}`);
  let authorText = document.createTextNode(`By ${bookArray.author}`);
  let publishYearText = document.createTextNode(
    `Publish Year: ${bookArray.publishYear}`
  );
  let numberOfPagesText = document.createTextNode(
    `No. Of. Pages: ${bookArray.numberOfPages}`
  );
  let pagesCompletedText = document.createTextNode(
    `Pages Read: ${bookArray.pagesCompleted}`
  );
  if (bookArray.pagesCompleted.length === 0) {
    bookArray.pagesCompleted = bookArray.numberOfPages;
  }
  cellName.appendChild(nameText);
  cellAuthor.appendChild(authorText);
  cellPublishYear.appendChild(publishYearText);
  cellNumberOfPages.appendChild(numberOfPagesText);
  cellPagesCompleted.appendChild(pagesCompletedText);
  gridCell.appendChild(cellName);
  gridCell.appendChild(cellAuthor);
  gridCell.appendChild(cellPublishYear);
  gridCell.appendChild(cellNumberOfPages);
  gridCell.appendChild(cellPagesCompleted);
  bookDisplay.appendChild(gridCell);
  progressBar(gridCell, bookArray, cellPagesCompleted);
  iconBar(gridCell, bookArray);
}

function clearValue() {
  form.reset();
}

function progressBar(cell, array, cellPages) {
  const outerBar = document.createElement("div");
  const innerBar = document.createElement("div");
  const outerPagesProgress = document.createElement("div");
  outerBar.classList.add("outer-progress");
  innerBar.classList.add("inner-progress");
  outerPagesProgress.classList.add("progress-text");
  outerPagesProgress.textContent =
    `Progress: ${array.pagesCompleted}` + `/` + `${array.numberOfPages} pages`;
  innerBar.textContent = `${Math.floor(
    (array.pagesCompleted / array.numberOfPages) * 100
  )}%`;
  innerBar.style.textAlign = "center";
  outerBar.style.backgroundColor = "#e5e5e5";
  innerBar.style.backgroundColor = "#22c55e";
  innerBar.style.color = "white";
  innerBar.style.width = `${Math.floor(
    (array.pagesCompleted / array.numberOfPages) * 100
  )}%`;
  outerBar.appendChild(innerBar);
  cell.appendChild(outerBar);
  cell.appendChild(outerPagesProgress);
  if (
    array.pagesCompleted == "" ||
    array.pagesCompleted == undefined ||
    array.pagesCompleted == NaN ||
    array.pagesCompleted == array.numberOfPages
  ) {
    outerBar.style.display = "none";
    outerPagesProgress.style.display = "none";
    cellPages.textContent = "Progress: Completed";
  }
}

function iconBar(cell, array) {
  const bar = document.createElement("div");
  bar.classList.add("icon-bar");
  const deleteIcon = document.createElement("i");
  const editIcon = document.createElement("i");
  const readIcon = document.createElement("i");
  deleteIcon.classList.add("material-icons");
  deleteIcon.textContent = " delete ";
  deleteIcon.setAttribute("title", "Delete entry");
  deleteIcon.addEventListener("click", (event) => {
    temp = event.target.parentElement.parentElement.id;
    confirmModal.style.display = "block";
  });
  editIcon.classList.add("material-icons");
  editIcon.textContent = " edit ";
  editIcon.setAttribute("title", "Edit entry");
  editIcon.addEventListener("click", (event) => {
    temp = event.target.parentElement.parentElement.id;
    editModal.style.display = "block";
    editBookName.value =
      myLibrary[event.target.parentElement.parentElement.id].name;
    editAuthorName.value =
      myLibrary[event.target.parentElement.parentElement.id].author;
    editPublishYearHTML.value =
      myLibrary[event.target.parentElement.parentElement.id].publishYear;
    editPages.value =
      myLibrary[event.target.parentElement.parentElement.id].numberOfPages;
    editPagesCompletedHTML.value =
      myLibrary[event.target.parentElement.parentElement.id].pagesCompleted;
  });
  readIcon.classList.add("material-icons");
  readIcon.textContent = " done ";
  readIcon.setAttribute("title", "Mark as completed");
  readIcon.addEventListener("click", (event) => {
    temp = event.target.parentElement.parentElement.id;
    document.getElementById(`${temp}`).childNodes[4].textContent =
      "Progress: Completed";
    document.getElementById(`${temp}`).childNodes[5].style.display = "none";
    document.getElementById(`${temp}`).childNodes[6].style.display = "none";
    myLibrary[event.target.parentElement.parentElement.id].pagesCompleted =
      myLibrary[event.target.parentElement.parentElement.id].numberOfPages;
    saveStorage();
    bar.removeChild(readIcon);
  });
  bar.appendChild(deleteIcon);
  bar.appendChild(editIcon);
  if (array.pagesCompleted < array.numberOfPages) {
    bar.appendChild(readIcon);
    cell.appendChild(bar);
  } else if (array.pagesCompleted == null || "" || undefined) {
    cell.appendChild(bar);
  } else {
    cell.appendChild(bar);
  }
}

saveBookbtn.addEventListener("click", () => {
  modifyArray(temp);
  modifyGrid(temp);
  saveStorage();
  closeModal();
});

//Updating the Entries after editing.
function modifyGrid(arrayIndex) {
  let editBook = document.getElementById(`${arrayIndex}`);
  editBook.childNodes[0].textContent = `${editBookName.value}`;
  editBook.childNodes[1].textContent = `By ${editAuthorName.value}`;
  editBook.childNodes[2].textContent = `Publish Year: ${editPublishYearHTML.value}`;
  editBook.childNodes[3].textContent = `No. Of. Pages: ${editPages.value}`;
  if (
    editPagesCompletedHTML.value == "" ||
    editPagesCompletedHTML.value == undefined ||
    editPagesCompletedHTML.value == NaN ||
    editPagesCompletedHTML.value == editPages.value
  ) {
    editBook.childNodes[4].textContent = "Progress: Completed";
    editBook.childNodes[5].style.display = "none";
    editBook.childNodes[6].style.display = "none";
  } else {
    editBook.childNodes[5].style.display = "block";
    editBook.childNodes[6].style.display = "block";
    editBook.childNodes[4].textContent = `Pages Read: ${editPagesCompletedHTML.value}`;
    editBook.childNodes[5].firstChild.style.width = `${Math.floor(
      (editPagesCompletedHTML.value / editPages.value) * 100
    )}%`;
    editBook.childNodes[5].firstChild.textContent = `${Math.floor(
      (editPagesCompletedHTML.value / editPages.value) * 100
    )}%`;
    editBook.childNodes[6].textContent =
      `Progress: ${editPagesCompletedHTML.value}` +
      `/` +
      `${editPages.value} pages`;
    let bar = editBook.childNodes[7];
    readIcon = document.createElement("i");
    readIcon.classList.add("material-icons");
    readIcon.textContent = " done ";
    readIcon.addEventListener("click", (event) => {
      temp = event.target.parentElement.parentElement.id;
      document.getElementById(`${temp}`).childNodes[4].textContent =
        "Progress: Completed";
      document.getElementById(`${temp}`).childNodes[5].style.display = "none";
      document.getElementById(`${temp}`).childNodes[6].style.display = "none";
      myLibrary[event.target.parentElement.parentElement.id].pagesCompleted =
        myLibrary[event.target.parentElement.parentElement.id].numberOfPages;
      readIcon.remove();
    });
    if (bar.childNodes.length == 2) {
      bar.appendChild(readIcon);
    }
  }
}

//Updating Entries of Array
function modifyArray(index) {
  myLibrary[index].name = editBookName.value;
  myLibrary[index].author = editAuthorName.value;
  myLibrary[index].publishYear = editPublishYearHTML.value;
  myLibrary[index].numberOfPages = editPages.value;
  myLibrary[index].pagesCompleted = editPagesCompletedHTML.value;
}

//Updating id in DOM
function bookIndex() {
  for (let index = 1; index < bookDisplay.childNodes.length; index++) {
    bookDisplay.childNodes[index].id = index - 1;
  }
}
