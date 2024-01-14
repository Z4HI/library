
const addBookbtn = document.querySelector('.add')
const addBookElement = document.querySelector('.addBookElement')

let formsubmit = document.querySelector('#formsubmit')

let myLibrary = []

addBookbtn.addEventListener('click',()=>{
    addBookElement.classList.toggle('visible')

})

function Book(title,author,read){

    this.title = title
    this.author = author
    this.read = read
     
}
function addBookToLibrary(){


    let title = document.getElementById('inputTitle').value
    let author = document.getElementById('inputAuthor').value
    let read = document.getElementById('inputRead').checked
    let newBook = new Book(title.toUpperCase(),author.toUpperCase(),read)
    myLibrary.push(newBook)
    render()
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
        `<h5>Title: ${book.title}<h5>  
         <h5> Author: ${book.author}<h5> 
         <h5>Read?<h5>
         <input type="checkbox" id="changeread" ${checked}>
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




