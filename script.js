class BookList {
  constructor() {
    // Array to hold the list of books
    this.books = JSON.parse(localStorage.getItem('books')) || [];

    // Get the error elements for author and title
    this.errorElements = {
      author: document.getElementById('authorError'),
      title: document.getElementById('titleError'),
    };
  }

  init() {
    // Add event listeners to the navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        // Remove active class from all nav items
        navLinks.forEach((navLink) => {
          navLink.classList.remove('active');
        });

        // Add active class to the clicked nav item
        link.classList.add('active');

        const sectionId = link.getAttribute('href').substring(1);
        this.showSection(sectionId);
      });
    });

    // Add an event listener to the form submit button
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      if (title && author !== '') {
        const book = { title, author };
        this.addBook(book);
        this.renderBookList();

        // Reset the form inputs
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';

        // Check if title and author are empty
      } else if (title === '') {
        this.showError('title', 'Title cannot be empty.');
      } else if (author === '') {
        this.showError('author', 'Author cannot be empty.');
      }
    });

    // Render list of books on page load
    window.addEventListener('load', () => {
      this.renderBookList();
    });
  }

  addBook(book) {
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  showError(type, message) {
    const errorElement = this.errorElements[type];
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById(type).style.marginBottom = '1rem';
    this.resetInputError();
  }

  resetInputError() {
    setTimeout(() => {
      this.errorElements.title.style.display = 'none';
      this.errorElements.author.style.display = 'none';
    }, 2000);
  }

  renderBookList() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    // Header for list books page
    const h1 = document.createElement('h1');
    h1.textContent = 'All Awesome Books';
    bookList.appendChild(h1);

    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.removeBook(index);
        this.renderBookList();
      });
      li.appendChild(removeBtn);
      bookList.appendChild(li);
    });
  }

  showSection = (sectionId) => {
    // Hide all content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach((section) => {
      section.classList.add('hidden');
    });

    // Show the selected content section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
  };
}

const bookList = new BookList();
bookList.init();
