
const addBookbtn = document.querySelector('#plus')
const addBookElement = document.querySelector('.addBookElement')
const removeElement = document.querySelector('.removeElement')
const readLog = document.querySelector('#readBooks')
const unreadLog = document.querySelector('#unreadBooks')
let formsubmit = document.querySelector('#formsubmit')
const menu = document.querySelector('#icon')
const menudrop = document.querySelector('.drop')

let myLibrary = []
let readcount = 0
let unreadcount = 0

addBookbtn.addEventListener('click',()=>{
    addBookElement.classList.add('visible')

})
menu.addEventListener('click',()=>{
    menudrop.classList.toggle('dropdown')
})
                    //Book Object Constructor
function Book(title,author,read,startdate,enddate,height,color){

    this.title = title
    this.author = author
    this.read = read
    this.startdate = startdate
    this.enddate = enddate
    this.height = height
    this.color = color
}
                    //Setting values for instance of New Book Object
function addBookToLibrary(){

                    //form values are set to the properties of the new Book
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
    updateLog()    
                    //randomColor() amd randomHeaight() are set here, they are not
                    //derived from user input
                    //After book elemt is added,updateLog updates total books by
                    //accessing Library.length to get the length of the list
                    //After book elemnt is added updateRead the new book as read or unread
    render()
}
                    //add Instance of new Book to Library[] list
                    
formsubmit.addEventListener('submit',(event)=>{
    event.preventDefault()  
    
    addBookToLibrary() 
    addBookElement.classList.toggle('visible')   
})
                    //DOM manipulation| creating elements of every instance of book class
function render(){
    let library = document.querySelector('.library')
    let bookShelf = document.querySelector('.bookShelf')
    library.innerHTML = ""
    bookShelf.innerHTML = "" 
                    //bookshelf and library is cleared render() is run to prevent
                    //previously printed/created items from staying on page
                    // ex.. loop1 = 1 output: 1 | loop2 = 12 output: 112
    
    for(let i =0;i<myLibrary.length;i++){
        
        let book = myLibrary[i]
        let checked = read(book.read)
        let bookElement = document.createElement('div')
        library.appendChild(bookElement);
        bookElement.classList.add('book')
        bookElement.innerHTML = 
                    
        `                       
        <div class = "leftSide">
        <h3>TITLE: ${book.title}<h3>  
        <h4> Author: ${book.author}<h4> 
        <h4>Read?<input type="checkbox" ${checked} class ="newBookRead" onclick ="readOnClick(${i})"><h4>
        
        Start Date<input type="date" value="${book.startdate}" id = "bookDate">
        End Date<input type="date" value="${book.enddate}" id = "bookDate">
        <button class="remove" onclick="removeBook(${i},${book.read})">Remove</button>
        </div>
         `         
       
            
                        //creating book shelf books, same properties as book instance,added height and color
         let bookShelfBook = document.createElement('div')
         bookShelfBook.style.height = `${book.height}px`
         bookShelfBook.style.backgroundColor = `${book.color}`
         bookShelfBook.classList.add('bookShelfBook')  
         bookShelf.appendChild(bookShelfBook)
         let bookShelfBookTitle = document.createElement('div')
         bookShelfBook.appendChild(bookShelfBookTitle)
         bookShelfBookTitle.innerHTML = `${book.title.replace(/ /g, "_")}`
         bookShelfBookTitle.classList.add('bookShelfBookTitle')
         
         
                        //another way to remove book using bookshelf books
         bookShelfBook.addEventListener('click',()=>{
            removeBook(i,book.read,book.title)
        })
    }
    
}
                        //random color function for shelf books
const randomColor = ()=>{
    let colors = ['#e4523b','#0b454d','#ecc417','#e8931e','#f2845c','maroon','#413e4a','#4f2a29','#114a5f']
    let random = Math.floor(Math.random()*9)
    let randomColor = colors[random]
    return randomColor
    
}
                        // random height between 90px 150px for shelf book height
const randomHeight= ()=> {
    const max = 150
    const min = 90
    let random =  Math.floor(Math.random() * (max - min) + min);
    return random
}
                        //remove book function takes in index of the book clicked,
                        //if the book is read or not to subtract 1 from read or unread
                        //the title of the book to promt user confirmation of deleteion
function removeBook(index,read,title){

    let confirm = window.confirm(`Are you sure you want to delete ${title}?`)

   if(confirm){
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
    
}
                        //update when the readbox on books is clicked, the books previous 
                        //value is stored in book.read on click, so a flip function was 
                        //created to flip the value, and save the flipped value in the 
                        //current value of the object, then the current value passses to
                        //if statements, if value is true, then subtract 1 from false
                        //and add 1 to true, and the opposite if the value is false
                        //not sure why the checked value isnt updated on click
function readOnClick(index){
    
    let book = myLibrary[index]
    console.log(book.read)
    let flipBoolean = flip(book.read)
    let update = book.read = flipBoolean
    
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

    render()
   
}
                    //flips the boolean(true or false) and returns flipped value
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

                    //when a new book is declared in the library, updateRead() is run to
                    //update whethr the new book added is read or unread
                    //could have added this function into the update log function aswell
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
                    //updateLog function 
function updateLog(){

    let totalbooks = myLibrary.length
    const totalBooks = document.querySelector('#totalBooks')
   
    totalBooks.innerHTML = `${totalbooks}`
    
}
                    //function returns html "checked" or "unchecked" to place into code
                    // to set the value of the bookelement created
function read(boolean){

    if(boolean == true){
        return "checked"
    }
    else{
        return "unchecked"
    }
}
                    //closes addbook form when x is clicked
removeElement.addEventListener('click',()=>{

    addBookElement.classList.toggle('visible')    
})






