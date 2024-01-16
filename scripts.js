
const addBookbtn = document.querySelector('.add')
const addBookElement = document.querySelector('.addBookElement')
const removeElement = document.querySelector('.removeElement')
const readLog = document.querySelector('#readBooks')
const unreadLog = document.querySelector('#unreadBooks')
let formsubmit = document.querySelector('#formsubmit')

let myLibrary = []
let readcount = 0
let unreadcount = 0

addBookbtn.addEventListener('click',()=>{
    addBookElement.classList.toggle('visible')

})

function Book(title,author,read,startdate,enddate,height,color){

    this.title = title
    this.author = author
    this.read = read
    this.startdate = startdate
    this.enddate = enddate
    this.height = height
     this.color = color
}
function addBookToLibrary(){


    let title = document.getElementById('inputTitle').value
    let author = document.getElementById('inputAuthor').value
    let read = document.getElementById('inputRead').checked
    let startdate = document.getElementById('inputStartDate').value
    let enddate = document.getElementById('inputEndDate').value
    let height = randomHeight()
    let color = randomColor()
    let newBook = new Book(title.toUpperCase(),author.toUpperCase(),read,startdate,enddate,height,color)
    myLibrary.push(newBook)
    updateRead(read)
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

        `
        <div class = "leftPage">
        <h3>TITLE: ${book.title}<h3>  
        <h4> Author: ${book.author}<h4> 
        <h4>Read?<input type="checkbox" ${checked} class ="newBookRead" onclick ="readOnClick(${i})"><h4>
        </div>
        <div class="rightSide">
        Start Date<input type="date" value="${book.startdate}">
        End Date<input type="date" value="${book.enddate}">
        <button class="remove" onclick ="removeBook(${i},${book.read})">Remove</button>
        </div>
         `
        

         let bookShelfBook = document.createElement('div')
         bookShelfBook.style.height = `${book.height}px`
         bookShelfBook.style.backgroundColor = `${book.color}`
         bookShelfBook.classList.add('bookShelfBook')  
         bookShelf.appendChild(bookShelfBook)
         let bookShelfBookTitle = document.createElement('div')
         bookShelfBook.appendChild(bookShelfBookTitle)
         bookShelfBookTitle.innerHTML = `${book.title.replace(/ /g, "_")}`
         bookShelfBookTitle.classList.add('bookShelfBookTitle')
         
         updateLog()

         

         bookShelfBook.addEventListener('click',()=>{
            removeBook(i,book.read)
        })
    }
    
}

const randomColor = ()=>{
    let colors = ['#e4523b','#0b454d','#ecc417','#e8931e','#f2845c','#C6A49A','#413e4a','#4f2a29','#114a5f']
    let random = Math.floor(Math.random()*9)
    let randomColor = colors[random]
    return randomColor
}

const randomHeight= ()=> {
    const max = 150
    const min = 90
    let random =  Math.floor(Math.random() * (max - min) + min);
    return random
}

function removeBook(index,read){
    
    myLibrary.splice(index,1)
    updateLog()
    render()

    if(read == true){
        
        readcount-=1
        readLog.innerHTML = `${readcount}`
    }
    if(read == false){
        
        unreadcount-=1
        unreadLog.innerHTML= `${unreadcount}`
    }
    
}

function readOnClick(index){
    console.log(index)
    let book = myLibrary[index]

    let flipBoolean = flip(book.read)
    let update =  book.read = flipBoolean
    console.log(update)
    if(update){
        readcount+=1
        unreadcount-=1
        readLog.innerHTML = `${readcount}`
        unreadLog.innerHTML = `${unreadcount}`
       
    }
    if(!update){
        unreadcount+=1
        readcount-=1
        unreadLog.innerHTML = `${unreadcount}`
        readLog.innerHTML = `${readcount}`

    }
   
}

function flip (boolean){

    let update = false
    if(boolean == true){
         update = false
    }
   if(boolean == false){
    update = true
   }
   return update

}


function updateRead(readbooks){

   
    if(readbooks == true){
        
        readcount+=1
        readLog.innerHTML = `${readcount}`
    }
    if(readbooks == false){
        
        unreadcount+=1
        unreadLog.innerHTML= `${unreadcount}`
    }
    
}

function updateLog(){

    let totalbooks = myLibrary.length
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






