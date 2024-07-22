// Import our custom CSS
import '../scss/styles.scss';
//class that allows you to paint the card with the information of each book
export class CardTemplateController {
    constructor(containerBooks) {
        this.containerBooks = containerBooks;
    }
    render(id, title, author, description, summary, publicationDate) {
        const figure = document.createElement("figure");
        figure.classList.add("card", "col-md-4", "m-3", "shadow", "rounded");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const h2 = document.createElement("h2");
        h2.classList.add("card-title", "text-center", "fs-4");
        h2.textContent = title;
        cardBody.appendChild(h2);
        const h4 = document.createElement("h4");
        h4.classList.add("card-subtitle", "mb-2", "text-center");
        h4.textContent = author;
        cardBody.appendChild(h4);
        const figcaption = document.createElement("figcaption");
        figcaption.classList.add("bg-light", "text-dark", "p-3", "rounded");
        cardBody.appendChild(figcaption);
        const h5 = document.createElement("h5");
        h5.classList.add("card-title", "text-start");
        h5.textContent = description;
        figcaption.appendChild(h5);
        const p = document.createElement("p");
        p.classList.add("card-text", "text-start");
        p.textContent = summary;
        figcaption.appendChild(p);
        const h6 = document.createElement("h6");
        h6.classList.add("card-text", "text-start");
        h6.textContent = `Publication Date: ${publicationDate}`;
        figcaption.appendChild(h6);
        const div = document.createElement("div");
        div.classList.add("d-flex", "justify-content-between");
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-warning", "me-2");
        btnEdit.textContent = "Edit";
        btnEdit.type = "button";
        btnEdit.dataset.id = id;
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.textContent = "Delete";
        btnDelete.type = "button";
        btnDelete.dataset.id = id;
        div.appendChild(btnEdit);
        div.appendChild(btnDelete);
        figcaption.appendChild(div);
        figure.appendChild(cardBody);
        this.containerBooks.appendChild(figure);
    }
}
