// Get the error elements for author and title
const authorError = document.getElementById('authorError');
const titleError = document.getElementById('titleError');

// Array to hold the list of books
const books = JSON.parse(localStorage.getItem('books')) || [];

// Reset input errors after 2 seconds
const resetInputError = (errorElement) => {
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 2000);
};

// Render list of books
function renderBookList() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      // remove the book from the array and re-render the list
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      renderBookList();
    });
    li.appendChild(removeBtn);
    bookList.appendChild(li);
  });
}

// add an event listener to the form submit button
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  if (title && author !== '') {
    books.push({ title, author });
    localStorage.setItem('books', JSON.stringify(books));
    renderBookList();

    // reset the form inputs
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  } else if (title === '') {
    titleError.textContent = 'Title cannot be empty.';
    titleError.style.display = 'block';
    resetInputError(titleError);
  } else if (author === '') {
    authorError.textContent = 'Author cannot be empty.';
    authorError.style.display = 'block';
    resetInputError(authorError);
    addButton.style.marginTop = '1rem';
  }
});

// Render book list on page load
window.addEventListener('load', () => {
  renderBookList();
});
