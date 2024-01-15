
const addBookbtn = document.querySelector('.add')
const addBookElement = document.querySelector('.addBookElement')
const removeElement = document.querySelector('.removeElement')

let formsubmit = document.querySelector('#formsubmit')

let myLibrary = []

addBookbtn.addEventListener('click',()=>{
    addBookElement.classList.toggle('visible')

})

function Book(title,author,read,startdate,enddate,height){

    this.title = title
    this.author = author
    this.read = read
    this.startdate = startdate
    this.enddate = enddate
    this.height = height
     
}
function addBookToLibrary(){


    let title = document.getElementById('inputTitle').value
    let author = document.getElementById('inputAuthor').value
    let read = document.getElementById('inputRead').checked
    let startdate = document.getElementById('inputStartDate').value
    let enddate = document.getElementById('inputEndDate').value
    let height = randomHeight()
    let newBook = new Book(title.toUpperCase(),author.toUpperCase(),read,startdate,enddate,height)
    myLibrary.push(newBook)
    
    render()
    
}

formsubmit.addEventListener('submit',(event)=>{
    event.preventDefault()  
    
    addBookToLibrary() 
    addBookElement.classList.toggle('visible')   
})

function render(){
    let library = document.querySelector('.library')
    let bookShelf = document.querySelector('.bookShelf')
    library.innerHTML = ""
    bookShelf.innerHTML = ""
    let book = myLibrary
    book.read = null
    for(let i =0;i<myLibrary.length;i++){
        
        let book = myLibrary[i]
        let checked = read(book.read)
        let bookElement = document.createElement('div')
        library.appendChild(bookElement);
        bookElement.classList.add('book')
        bookElement.innerHTML = 
        `<h3>Title: ${book.title}<h3>  
         <h4> Author: ${book.author}<h4> 
         <h4>Read?<input type="checkbox" ${checked}><h4>
         Start Date<input type="date" value="${book.startdate}">
         End Date<input type="date" value="${book.enddate}">
         <button class="remove" onclick ="removeBook(${i})">Remove</button>
         `
        

         let bookShelfBook = document.createElement('div')
         bookShelfBook.style.height = `${book.height}px`
         bookShelfBook.classList.add('bookShelfBook')
         bookShelf.appendChild(bookShelfBook)
         updateLog(myLibrary.length)

         console.log(book.height)
    }
    
}

const randomHeight= ()=> {
    const max = 140
    const min = 80
    let random =  Math.floor(Math.random() * (max - min) + min);
    return random
}

function removeBook(index){
    myLibrary.splice(index,1)
    render()
}

function updateLog(totalbooks){
    const totalBooks = document.querySelector('#totalBooks')
   
    totalBooks.innerHTML = `${totalbooks}`
    
}




function read(boolean){

    if(boolean == true){
        return "checked"
    }
    else{
        return "unchecked"
    }
}

removeElement.addEventListener('click',()=>{

    addBookElement.classList.toggle('visible')    
})






