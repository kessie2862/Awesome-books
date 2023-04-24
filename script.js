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