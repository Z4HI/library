
const addBookbtn = document.querySelector('.add')
const addBookElement = document.querySelector('.addBookElement')

let formsubmit = document.querySelector('#formsubmit')

let myLibrary = []

addBookbtn.addEventListener('click',()=>{
    addBookElement.classList.toggle('visible')

})

function Book(title,author,read,startdate,enddate){

    this.title = title
    this.author = author
    this.read = read
    this.startdate = startdate
    this.enddate = enddate
     
}
function addBookToLibrary(){


    let title = document.getElementById('inputTitle').value
    let author = document.getElementById('inputAuthor').value
    let read = document.getElementById('inputRead').checked
    let startdate = document.getElementById('inputStartDate').value
    let enddate = document.getElementById('inputEndDate').value
    let newBook = new Book(title.toUpperCase(),author.toUpperCase(),read,startdate,enddate)
    myLibrary.push(newBook)
    render()
    console.log(newBook)
}

formsubmit.addEventListener('submit',(event)=>{
    event.preventDefault()  
    
    addBookToLibrary() 

})

function render(){
    let library = document.querySelector('.library')
    
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
         <h5 class="remove">Remove<h5>
         `
        myLibrary.splice([i])
        
    }
}


function read(boolean){

    if(boolean == true){
        return "checked"
    }

    else{
        return "unchecked"
    }
}







