// select important DOM elements
const newBookBtn = document.querySelector('#add-book');
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal-close');

// array that holds all of the books
const library = [];

// book constructor
function Book(title, author, status, numPages) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.numPages = numPages;
}

// create new book
function createBook() {
  
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