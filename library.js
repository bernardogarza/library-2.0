class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function changeStatus(status) {
  const index = status.parentElement.parentElement.rowIndex;
  const readAttribute = JSON.parse(localStorage.books);
  if (readAttribute[index - 1].read === true) {
    readAttribute[index - 1].read = false;
    status.classList.remove('btn-success');
    status.classList.add('btn-danger');
    status.innerHTML = 'No';
  } else {
    readAttribute[index - 1].read = true;
    status.classList.remove('btn-danger');
    status.classList.add('btn-success');
    status.innerHTML = 'Yes';
  }
  localStorage.setItem('books', JSON.stringify(readAttribute));
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const table = document.querySelector('#book-list');
    const newRow = table.insertRow(-1);
    const title = newRow.insertCell(-1);
    title.innerHTML = book.title;
    const author = newRow.insertCell(-1);
    author.innerHTML = book.author;
    const pages = newRow.insertCell(-1);
    pages.innerHTML = book.pages;
    const read = newRow.insertCell(-1);
    const status = document.createElement('button');
    if (book.read === true) {
      status.classList.add('btn', 'btn-success');
      status.innerHTML = 'Yes';
    } else {
      status.classList.add('btn', 'btn-danger');
      status.innerHTML = 'No';
    }
    read.appendChild(status);
    const deleteBook = newRow.insertCell(-1);
    const deleteButton = document.createElement('a');
    deleteButton.innerHTML = 'X';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'delete');
    deleteBook.appendChild(deleteButton);

    status.addEventListener('click', () => {
      changeStatus(status);
    });
    deleteButton.addEventListener('click', () => {
      deleteBookFromLocalstorage(deleteButton);
    });
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 4000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = null;
  }
}

function deleteBookFromLocalstorage(book) {
  const index = book.parentElement.parentElement.rowIndex;
  const delBook = JSON.parse(localStorage.books);
  delBook.splice(index - 1, 1);
  localStorage.setItem('books', JSON.stringify(delBook));
  const table = document.querySelector('#book-list');
  table.deleteRow(index - 1);
  UI.showAlert('Book Removed', 'info');
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  if (title === '' || author === '' || pages === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    const book = new Book(title, author, pages, read);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.showAlert('Book Added', 'success');
    UI.clearFields();
  }
});