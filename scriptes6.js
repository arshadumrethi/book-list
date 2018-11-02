class Book {
    constructor(title, author, genre, isbn) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const bookList = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

        
        bookList.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        //Get Parent and append div
        const container = document.querySelector('.container');
        const form = document.querySelector('#main-form');
        container.insertBefore(div, form);

        //Set timer
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 2000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
    
        }
    }

    clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('genre').value = "";
        document.getElementById('isbn').value = "";
        }
}


//Event Listerners
document.getElementById('main-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const isbn = document.getElementById('isbn').value;

    //Instantiate Book
    const book = new Book(title, author, genre, isbn);

    //Instantiate UI
    const ui = new UI()
    
    //Validate
    if(title === "" || author === "" || genre === "" || isbn === "") {
       ui.showAlert('Please fill all fields', 'error') 
    } else {
        ui.addBookToList(book);

        ui.showAlert('Book Added', 'success')

        ui.clearFields();
    }

    e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function(e){
  //Instantiate UI
    const ui = new UI();

  //Delete Book
    ui.deleteBook(e.target);
    
  //Show message
    ui.showAlert('Book Removed!', 'success');  
    
    e.preventDefault();
})
