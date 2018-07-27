// select important DOM elements
const newBookBtn = document.querySelector('#add-book');
const newBookModal = document.querySelector('#new-book-modal');
const closeBookModal = document.querySelector('#close-book-modal');
const updateStatusModal = document.querySelector('#update-status-modal');
const closeStatusModal = document.querySelector('#close-status-modal');
const form = document.querySelector('#new-book-form');
const planningToRead = document.querySelector('#planning');
const currentlyReading = document.querySelector('#reading');
const finishedReading = document.querySelector('#finished');


// book constructor
function Book(title, author, status) {
  this.title = title;
  this.author = author;
  this.status = status;
}

// update book status
Book.prototype.updateStatus = function(status) {
  this.status = status;
}

// array that holds all of the books
const library = [
  // {
  //   title: 'Test Title 1',
  //   author: 'Test Author 1',
  //   status: 1
  // },
  // {
  //   title: 'Test Title 2',
  //   author: 'Test Author 2',
  //   status: 2
  // },
  // {
  //   title: 'Test Title 3',
  //   author: 'Test Author 3',
  //   status: 3
  // },
  // {
  //   title: 'Test Title 4',
  //   author: 'Test Author 4',
  //   status: 1
  // }
];

// loop through library and render books to the DOM
function renderBooks() {
  // clear existing books from the DOM
  planningToRead.innerHTML = '';
  currentlyReading.innerHTML = '';
  finishedReading.innerHTML = '';
  // loop through library
  library.forEach((book, index) => {
    // create book element
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.setAttribute("data-id", index);
    // create book title
    const title = document.createElement('h3');
    title.innerHTML = book.title;
    bookElement.appendChild(title);
    // create book author
    const author = document.createElement('p');
    author.innerHTML = `Author: <span>${book.author}</span>`;
    bookElement.appendChild(author);
    // create book buttons
    const updateStatusBtn = document.createElement('button');
    updateStatusBtn.classList.add('update-status');
    updateStatusBtn.innerHTML = 'Update Book Status';
    bookElement.appendChild(updateStatusBtn);
    const removeBookBtn = document.createElement('button');
    removeBookBtn.classList.add('remove');
    removeBookBtn.innerHTML = 'Remove Book';
    bookElement.appendChild(removeBookBtn);
    // add event listeners to buttons
    updateStatusBtn.addEventListener('click', () => {
      updateBookStatus(index, book.status);
    });
    removeBookBtn.addEventListener('click', () => {
      removeBook(index);
    });
    // decide where to put the book
    const status = parseInt(book.status, 10);
    if (status === 1) {
      planningToRead.appendChild(bookElement);
    } else if (status === 2) {
      currentlyReading.appendChild(bookElement);
    } else if (status === 3) {
      finishedReading.appendChild(bookElement);
    }
  });
}

// create new book
function createBook(title, author, status) {
  const book = new Book(title, author, status);
  library.push(book);
}

function updateBookStatus(index, currentStatus) {
  toggleModal(updateStatusModal);
  let newStatus = currentStatus;
  // listen on buttons to capture updated status
  const statusButtons = document.querySelectorAll('.status-btn');
  statusButtons.forEach(btn => {
    // add event listener
    btn.addEventListener('click', () => {
      // update the status inside a library array
      newStatus = btn.dataset.status;
      library[index].updateStatus(newStatus);
      // close modal and render books
      toggleModal(updateStatusModal);
      renderBooks();
    });
  });
}

function removeBook(index) {
  library.splice(index, 1);
  renderBooks();
}

// show/hide modal
function toggleModal(modal) {
  if (modal.style.display !== 'block') {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
}

// open new book modal on 'Add New Book' button click
newBookBtn.addEventListener('click', () => {
  toggleModal(newBookModal);
});

// close new book modal on close button click
closeBookModal.addEventListener('click', () => {
  toggleModal(newBookModal);
});

closeStatusModal.addEventListener('click', () => {
  toggleModal(updateStatusModal);
});

// new book form is submitted
form.addEventListener('submit', (e) => {
  // prevent reloading the page
  e.preventDefault();
  // get values and create the book
  createBook(
    e.target.elements['title'].value, 
    e.target.elements['author'].value, 
    e.target.elements['status'].value
  );
  // clean form input values
  e.target.elements['title'].value = '';
  e.target.elements['author'].value = '';
  e.target.elements['status'].value = '1';
  // close modal & render books
  toggleModal(newBookModal);
  renderBooks();
});

// render books when page loads
renderBooks();