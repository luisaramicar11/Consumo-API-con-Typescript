var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//class that contains the methods to create, update, bring, and delete a workbook
export class BooksController {
    constructor(domain) {
        this.domain = domain;
    }
    allBooks(token, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "GET",
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, reqOptions);
            console.log(response);
            let responseBodyGetAllBooks;
            switch (response.status) {
                case 400:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The server cannot process the request: ${(yield response.json()).message}`);
                case 401:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: Not authorized: ${(yield response.json()).message}`);
                case 404:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The resource was not found: ${(yield response.json()).message}`);
                case 500:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(yield response.json()).message}`);
                case 200:
                    responseBodyGetAllBooks = yield response.json();
                    break;
                default:
                    console.error(`Unexpected response: ${response.status}`);
                    throw new Error(`Error: ${response.status}: Unexpected server response: ${(yield response.json()).message}`);
            }
            return responseBodyGetAllBooks;
        });
    }
    create(title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(newBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books`, reqOptions);
            let responseBodyCreateBook;
            switch (response.status) {
                case 400:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The server cannot process the request: ${(yield response.json()).message}`);
                case 401:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: Not authorized: ${(yield response.json()).message}`);
                case 404:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The resource was not found: ${(yield response.json()).message}`);
                case 500:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(yield response.json()).message}`);
                case 201:
                    responseBodyCreateBook = yield response.json();
                    break;
                default:
                    console.error(`Unexpected response: ${response.status}`);
                    throw new Error(`Error: ${response.status}: Unexpected server response: ${(yield response.json()).message}`);
            }
            return responseBodyCreateBook;
        });
    }
    getById(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "GET",
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
            let responseBodyGetById;
            switch (response.status) {
                case 400:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The server cannot process the request: ${(yield response.json()).message}`);
                case 401:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: Not authorized: ${(yield response.json()).message}`);
                case 404:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The resource was not found: ${(yield response.json()).message}`);
                case 500:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(yield response.json()).message}`);
                case 200:
                    responseBodyGetById = yield response.json();
                    break;
                default:
                    console.error(`Unexpected response: ${response.status}`);
                    throw new Error(`Error: ${response.status}: Unexpected server response: ${(yield response.json()).message}`);
            }
            return responseBodyGetById;
        });
    }
    ;
    update(idCatche, title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(updateBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${idCatche}`, reqOptions);
            let responseBodyUpdateBook;
            switch (response.status) {
                case 400:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The server cannot process the request: ${(yield response.json()).message}`);
                case 401:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: Not authorized: ${(yield response.json()).message}`);
                case 404:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The resource was not found: ${(yield response.json()).message}`);
                case 500:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(yield response.json()).message}`);
                case 200:
                    responseBodyUpdateBook = yield response.json();
                    break;
                default:
                    console.error(`Unexpected response: ${response.status}`);
                    throw new Error(`Error: ${response.status}: Unexpected server response: ${(yield response.json()).message}`);
            }
            return responseBodyUpdateBook;
        });
    }
    ;
    delete(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "DELETE",
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
            let responseBodyDeleteBook;
            switch (response.status) {
                case 400:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The server cannot process the request: ${(yield response.json()).message}`);
                case 401:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: Not authorized: ${(yield response.json()).message}`);
                case 404:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The resource was not found: ${(yield response.json()).message}`);
                case 500:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(yield response.json()).message}`);
                case 200:
                    responseBodyDeleteBook = yield response.json();
                    break;
                default:
                    console.error(`Unexpected response: ${response.status}`);
                    throw new Error(`Error: ${response.status}: Unexpected server response: ${(yield response.json()).message}`);
            }
            return responseBodyDeleteBook;
        });
    }
}
