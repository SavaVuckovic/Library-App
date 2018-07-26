// select important DOM elements
const newBookBtn = document.querySelector('#add-book');
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal-close');
const form = document.querySelector('#new-book-form');

// array that holds all of the books
const library = [];

// book constructor
function Book(title, author, status) {
  this.title = title;
  this.author = author;
  this.status = status;
}

// create new book
function createBook(title, author, status) {
  const book = new Book(title, author, status);
  library.push(book);
  // test
  console.log(library);
}

// show/hide modal
function toggleModal() {
  if (modal.style.display !== 'block') {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
}

// open modal on 'Add New Book' button click
newBookBtn.addEventListener('click', toggleModal);

// close modal on close button click
close.addEventListener('click', toggleModal);

// new book form is submitted
form.addEventListener('submit', function(e) {
  // prevent reloading the page
  e.preventDefault();
  // get values and create the book
  const title = e.target.elements['title'].value;
  const author = e.target.elements['author'].value;
  const status = e.target.elements['status'].value;
  createBook(title, author, status);
  // close modal
  toggleModal();
});