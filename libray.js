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