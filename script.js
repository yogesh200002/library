const modal = document.querySelector('.modal')
const addBookbtnmodal = document.querySelector('.addbookbtn')
const editModal = document.querySelector('.edit-modal')
const addbookbtnform = document.querySelector('#addbookbtnform')
const closebtn = document.querySelectorAll('.close-icon')
const bookName = document.querySelector('#book-name')
const authorName = document.querySelector('#author-name')
const publishYearHTML = document.querySelector('#publish-year')
const pages = document.querySelector('#pages')
const pagesCompletedHTML = document.querySelector('#pages-completed')
const pagesCompletedLabelHTML = document.querySelector('#pages-completed+label')
const editBookName = document.querySelector('#edit-book-name')
const editAuthorName = document.querySelector('#edit-author-name')
const editPublishYearHTML = document.querySelector('#edit-publish-year')
const editPages = document.querySelector('#edit-pages')
const editPagesCompletedHTML = document.querySelector('#edit-pages-completed')
const editPagesCompletedLabelHTML = document.querySelector('#edit-pages-completed+label')
const saveBookbtn = document.querySelector('#editbookbtnform')
const bookDisplay = document.querySelector('.books')
const form = document.querySelector('form')
const confirmModal = document.querySelector('.confirm-delete-modal')
const deleteModalBtns = document.querySelector('.buttons')
const yesbtn = deleteModalBtns.childNodes[1]
const nobtn = deleteModalBtns.childNodes[3]
let temp;

let myLibrary = []

addBookbtnmodal.addEventListener('click',displayModal)
closebtn.forEach(btn => {
    btn.addEventListener('click',closeModal)
})

window.addEventListener('click',(e) => {
    if(e.target == modal || e.target == editModal || e.target == confirmModal){
        closeModal()
    }
})

function displayModal() {
    modal.style.display = 'block'
}

function closeModal(){
    modal.style.display = 'none'
    editModal.style.display = 'none'
    confirmModal.style.display = 'none'
}

addbookbtnform.addEventListener('click',function(e){ 
    let addbook = new book(`${bookName.value}`,`${authorName.value}`,`${publishYearHTML.value}`,`${pages.value}`,`${pagesCompletedHTML.value}`)
    if(form.checkValidity() === false){
        form.reportValidity()
        return
    }
    else{
        e.preventDefault()
        addBookToLibrary(addbook)
        createGrid(addbook)
        closeModal()
        clearValue()
    }
})

deleteModalBtns.childNodes[1].addEventListener('click',()=>{
    document.getElementById(`${temp}`).remove()
    myLibrary.splice(temp,1)
    bookIndex()
    closeModal()
})
deleteModalBtns.childNodes[3].addEventListener('click',closeModal)

class book{
    constructor(name,author,publishYear,numberOfPages,pagesCompleted){
        this.name = name;
        this.author = author;
        this.publishYear = publishYear;
        this.numberOfPages = numberOfPages;
        this.pagesCompleted = pagesCompleted;
    }
}

function addBookToLibrary(book){
    myLibrary.push(book)
}

function createGrid(bookArray){
    const gridCell = document.createElement('div')
    const cellName = document.createElement('div')
    cellName.classList.add('book-title')
    const cellAuthor = document.createElement('div')
    cellAuthor.classList.add('book-author')
    const cellPublishYear = document.createElement('div')
    cellPublishYear.classList.add('publish-year')
    const cellNumberOfPages = document.createElement('div')
    cellNumberOfPages.classList.add('no-of-pages')
    const cellPagesCompleted = document.createElement('div')
    cellPagesCompleted.classList.add('pages-completed')
    let nameText = document.createTextNode(`${bookArray.name}`)
    let authorText  = document.createTextNode(`By ${bookArray.author}`) 
    let publishYearText = document.createTextNode(`Publish Year: ${bookArray.publishYear}`)
    let numberOfPagesText = document.createTextNode(`No. Of. Pages: ${bookArray.numberOfPages}`)
    let pagesCompletedText = document.createTextNode(`Pages Read: ${bookArray.pagesCompleted}`)
    if (bookArray.pagesCompleted.length === 0) {
        bookArray.pagesCompleted = bookArray.numberOfPages
    }
    cellName.appendChild(nameText)
    cellAuthor.appendChild(authorText)
    cellPublishYear.appendChild(publishYearText)
    cellNumberOfPages.appendChild(numberOfPagesText)
    cellPagesCompleted.appendChild(pagesCompletedText)
    gridCell.appendChild(cellName)
    gridCell.appendChild(cellAuthor)
    gridCell.appendChild(cellPublishYear)
    gridCell.appendChild(cellNumberOfPages)
    gridCell.appendChild(cellPagesCompleted)
    bookDisplay.appendChild(gridCell)
    progressBar(gridCell,bookArray,cellPagesCompleted)
    iconBar(gridCell,bookArray)
}

let testbook = new book(`The White Tiger`,`Arvind Adiga`,`2008-09`,`218`,`218`)
addBookToLibrary(testbook)


function clearValue(){
    form.reset()
}

function progressBar(cell,array,cellPages){
    const outerBar = document.createElement('div')
    const innerBar = document.createElement('div')
    const outerPagesProgress = document.createElement('div')
    outerBar.classList.add('outer-progress')
    innerBar.classList.add('inner-progress')
    outerPagesProgress.classList.add('progress-text')
    outerPagesProgress.textContent = `Progress: ${(array.pagesCompleted)}`+`/`+`${(array.numberOfPages)} pages` 
    innerBar.textContent = `${Math.floor(((array.pagesCompleted / array.numberOfPages) * 100))}%`
    innerBar.style.textAlign = 'center'
    outerBar.style.backgroundColor = 'whitesmoke'
    innerBar.style.backgroundColor = 'green'
    innerBar.style.color = 'white'
    innerBar.style.width = `${Math.floor(((array.pagesCompleted/array.numberOfPages)*100))}%`
    outerBar.appendChild(innerBar)
    cell.appendChild(outerBar)
    cell.appendChild(outerPagesProgress)
    if(array.pagesCompleted == '' || array.pagesCompleted == undefined || array.pagesCompleted == NaN || array.pagesCompleted == array.numberOfPages){
        outerBar.style.display = 'none'
        outerPagesProgress.style.display = 'none'
        cellPages.textContent = 'Completed'
    }
}

function iconBar(cell,array){
    const bar = document.createElement('div')
    const deleteIcon = document.createElement('i')
    const editIcon = document.createElement('i')
    const readIcon = document.createElement('i')
    deleteIcon.classList.add('material-icons')
    deleteIcon.textContent = ' delete '
    deleteIcon.addEventListener('click',(event)=>{
        temp = event.target.parentElement.parentElement.id
        confirmModal.style.display = 'block'
    })
    editIcon.classList.add('material-icons')
    editIcon.textContent = ' edit '
    editIcon.addEventListener('click', (event)=>{
        temp = event.target.parentElement.parentElement.id
        editModal.style.display = 'block'
        editBookName.value = myLibrary[event.target.parentElement.parentElement.id].name
        editAuthorName.value = myLibrary[event.target.parentElement.parentElement.id].author
        editPublishYearHTML.value = myLibrary[event.target.parentElement.parentElement.id].publishYear
        editPages.value = myLibrary[event.target.parentElement.parentElement.id].numberOfPages
        editPagesCompletedHTML.value = myLibrary[event.target.parentElement.parentElement.id].pagesCompleted
    })
    readIcon.classList.add('material-icons')
    readIcon.textContent = ' done '
    readIcon.addEventListener('click',(event) => {
        temp = event.target.parentElement.parentElement.id
        document.getElementById(`${temp}`).childNodes[4].textContent = 'Completed'
        document.getElementById(`${temp}`).childNodes[5].style.display = 'none'
        document.getElementById(`${temp}`).childNodes[6].style.display = 'none'
        myLibrary[event.target.parentElement.parentElement.id].pagesCompleted = myLibrary[event.target.parentElement.parentElement.id].numberOfPages
        bar.removeChild(readIcon) 
    })
    bar.appendChild(deleteIcon)
    bar.appendChild(editIcon)
    if(array.pagesCompleted < array.numberOfPages){
        bar.appendChild(readIcon)
        cell.appendChild(bar)
    }
    else if(array.pagesCompleted == null || '' || undefined){
        cell.appendChild(bar)
    }
    else{
        cell.appendChild(bar)
    }
}

saveBookbtn.addEventListener('click',()=>{
    modifyArray(temp)
    modifyGrid(temp)
    closeModal()
})


function modifyGrid(arrayIndex){
    let editBook = document.getElementById(`${arrayIndex}`)
    editBook.childNodes[0].textContent = `${editBookName.value}`
    editBook.childNodes[1].textContent = `By ${editAuthorName.value}`
    editBook.childNodes[2].textContent = `Publish Year:${editPublishYearHTML.value}`
    editBook.childNodes[3].textContent = `No. Of. Pages:${editPages.value}`
    if(editPagesCompletedHTML.value == '' || editPagesCompletedHTML.value == undefined || editPagesCompletedHTML.value == NaN || editPagesCompletedHTML.value == editPages.value){
        editBook.childNodes[4].textContent = 'Completed'
        editBook.childNodes[5].style.display = 'none'
        editBook.childNodes[6].style.display = 'none'
    }
    else{
        editBook.childNodes[5].style.display = 'block'
        editBook.childNodes[6].style.display = 'block'
        editBook.childNodes[4].textContent = `Pages Read:${editPagesCompletedHTML.value}`
        editBook.childNodes[5].firstChild.style.width = `${Math.floor(((editPagesCompletedHTML.value / editPages.value)*100))}%`
        editBook.childNodes[5].firstChild.textContent = `${Math.floor(((editPagesCompletedHTML.value / editPages.value)*100))}%`
        editBook.childNodes[6].textContent = `Progress: ${(editPagesCompletedHTML.value)}`+`/`+`${(editPages.value)} pages`
        let bar = editBook.childNodes[7]
        readIcon = document.createElement('i')
        readIcon.classList.add('material-icons')
        readIcon.textContent = ' done '
        readIcon.addEventListener('click',(event) => {
            temp = event.target.parentElement.parentElement.id
            document.getElementById(`${temp}`).childNodes[4].textContent = 'Completed'
            document.getElementById(`${temp}`).childNodes[5].style.display = 'none'
            document.getElementById(`${temp}`).childNodes[6].style.display = 'none'
            myLibrary[event.target.parentElement.parentElement.id].pagesCompleted = myLibrary[event.target.parentElement.parentElement.id].numberOfPages
            readIcon.remove() 
        })
        if(bar.childNodes.length == 2){
            bar.appendChild(readIcon)
        }
    }
}

myLibrary.forEach(element => {
    createGrid(element)
})

function modifyArray(index){
    myLibrary[index].name = editBookName.value
    myLibrary[index].author = editAuthorName.value
    myLibrary[index].publishYear = editPublishYearHTML.value
    myLibrary[index].numberOfPages = editPages.value
    myLibrary[index].pagesCompleted = editPagesCompletedHTML.value
}

function bookIndex(){
    for (let index = 0; index <= myLibrary.length; index++) {
        bookDisplay.childNodes[index].id = index-1;
    }
}

bookIndex()