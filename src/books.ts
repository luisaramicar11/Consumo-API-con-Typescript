// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { CardTemplateController } from "./controllers/cardTemplate.controller.js";
import { BooksController } from "./controllers/books.controller.js";
import {successAlert, errorAlert, warningAlert} from "./alert.js";

const URL_BOOKS: string = "http://190.147.64.47:5155";
const btnLogout = document.getElementById("btn-logout") as HTMLButtonElement;
const prevPage = document.getElementById("prev-page") as HTMLButtonElement;
const nextPage = document.getElementById("next-page") as HTMLButtonElement;
let titleForm = document.querySelector(".title-form") as HTMLTitleElement;
const token = localStorage.getItem("authToken");
const limit: number = 10;

let currentPage: number = 1;

// event to exit and be redirected to index.html
btnLogout.addEventListener("click", (e:Event) => {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
});

if(!token){
    warningAlert("Authentication token is missing. Please log in.")
    alert("Authentication token is missing. Please log in.");
    window.location.href = "index.html";
}else{
   const containerBooks = document.querySelector(".container-books") as HTMLDivElement;
   const form = document.querySelector("form") as HTMLFormElement;
   const title = document.getElementById("title") as HTMLInputElement;
   const author = document.getElementById("author") as HTMLInputElement;
   const description = document.getElementById("description") as HTMLInputElement;
   const summary = document.getElementById("summary") as HTMLInputElement;
   const publicationDate = document.getElementById("publication-date") as HTMLInputElement;
   let idCatche: undefined | string;

   const cardTemplate = new CardTemplateController(containerBooks);

   // events for pagination
   prevPage.addEventListener("click", async (e:Event) =>  {
    if (currentPage >= 1){
        currentPage--
        await allBooks(limit, currentPage);
    }
   });

   nextPage.addEventListener("click", async (e:Event) =>  {
    if (currentPage >= 1){
        currentPage++
        await allBooks(limit, currentPage);
    }
   });

   // form submit event
   form.addEventListener("submit", async (e:Event)=>{
    e.preventDefault();
     const crudBooks = new BooksController(URL_BOOKS);

     if(idCatche === undefined){
        titleForm.textContent = "Create Book";
        await crudBooks.create(title, author, description, summary, publicationDate, token as string);
        successAlert("Successfully created book");
     }else{
        titleForm.textContent = "Update Book";
        await crudBooks.update(idCatche, title, author, description, summary, publicationDate, token as string);
        idCatche = undefined;
        successAlert("Successfully updated book");
     }
      form.reset();
      await allBooks(limit, currentPage);
   });

   // event to listen for the edit book and delete book buttons
   containerBooks.addEventListener("click", async (e:Event)=>{
     if(e.target instanceof HTMLButtonElement){
        const crudBooks = new BooksController(URL_BOOKS);

        if(e.target.classList.contains("btn-warning")){
            idCatche = e.target.dataset.id;

            if(idCatche){
                const book = await crudBooks.getById(idCatche, token as string)
                title.value = book.data.title;
                author.value = book.data.author;
                description.value = book.data.description;
                summary.value = book.data.summary;
                publicationDate.value = book.data.publicationDate
            }
            } else if (e.target.classList.contains("btn-danger")){
                console.log("estoy en el delete")
              let bookId = e.target.dataset.id;

              if(bookId){
                const confirmDelete = confirm("Are you sure you want to delete?")
                if(confirmDelete){
                    await crudBooks.delete(bookId, token as string);
                    idCatche = undefined;
                    successAlert("Successfully delete book");
                    await allBooks(limit, currentPage);
                }
              }
            }
        }
    
   })


   //function to paint all the books
   async function allBooks(limit: number, currentPage: number){
    const crudBooks = new BooksController(URL_BOOKS);
    try{
        const response = await crudBooks.allBooks(token as string, limit, currentPage);
        console.log(`Respuesta de allBooks ${response}`)
        const books = response.data;

        containerBooks.innerHTML = '';

        for (const book of books){
            cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
        }

    } catch (error) {
        if (error instanceof Error) {
            errorAlert(error.message);
        } else {
            errorAlert("Se produjo un error desconocido");
        }
    }
   }
  allBooks(limit, currentPage);
}