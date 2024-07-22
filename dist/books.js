var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import our custom CSS
import '../scss/styles.scss';
import { CardTemplateController } from "./controllers/cardTemplate.controller.js";
import { BooksController } from "./controllers/books.controller.js";
import { successAlert, errorAlert, warningAlert } from "./alert.js";
const URL_BOOKS = "http://190.147.64.47:5155";
const btnLogout = document.getElementById("btn-logout");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
let titleForm = document.querySelector(".title-form");
const token = localStorage.getItem("authToken");
const limit = 10;
let currentPage = 1;
// event to exit and be redirected to index.html
btnLogout.addEventListener("click", (e) => {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
});
if (!token) {
    warningAlert("Authentication token is missing. Please log in.");
    alert("Authentication token is missing. Please log in.");
    window.location.href = "index.html";
}
else {
    const containerBooks = document.querySelector(".container-books");
    const form = document.querySelector("form");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const description = document.getElementById("description");
    const summary = document.getElementById("summary");
    const publicationDate = document.getElementById("publication-date");
    let idCatche;
    const cardTemplate = new CardTemplateController(containerBooks);
    // events for pagination
    prevPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage--;
            yield allBooks(limit, currentPage);
        }
    }));
    nextPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage++;
            yield allBooks(limit, currentPage);
        }
    }));
    // form submit event
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);
        if (idCatche === undefined) {
            titleForm.textContent = "Create Book";
            yield crudBooks.create(title, author, description, summary, publicationDate, token);
            successAlert("Successfully created book");
        }
        else {
            titleForm.textContent = "Update Book";
            yield crudBooks.update(idCatche, title, author, description, summary, publicationDate, token);
            idCatche = undefined;
            successAlert("Successfully updated book");
        }
        form.reset();
        yield allBooks(limit, currentPage);
    }));
    // event to listen for the edit book and delete book buttons
    containerBooks.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS);
            if (e.target.classList.contains("btn-warning")) {
                idCatche = e.target.dataset.id;
                if (idCatche) {
                    const book = yield crudBooks.getById(idCatche, token);
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
            }
            else if (e.target.classList.contains("btn-danger")) {
                console.log("estoy en el delete");
                let bookId = e.target.dataset.id;
                if (bookId) {
                    const confirmDelete = confirm("Are you sure you want to delete?");
                    if (confirmDelete) {
                        yield crudBooks.delete(bookId, token);
                        idCatche = undefined;
                        successAlert("Successfully delete book");
                        yield allBooks(limit, currentPage);
                    }
                }
            }
        }
    }));
    //function to paint all the books
    function allBooks(limit, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const crudBooks = new BooksController(URL_BOOKS);
            try {
                const response = yield crudBooks.allBooks(token, limit, currentPage);
                console.log(`Respuesta de allBooks ${response}`);
                const books = response.data;
                containerBooks.innerHTML = '';
                for (const book of books) {
                    cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    errorAlert(error.message);
                }
                else {
                    errorAlert("Se produjo un error desconocido");
                }
            }
        });
    }
    allBooks(limit, currentPage);
}
