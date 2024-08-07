import {BodyResponseDeleteBook, BodyResponseGetById, BodyResponseGetAllBooks, BodyRequestCreateBook, BodyResponseCreateBook, BodyRequestUpdateBook, BodyResponseUpdateBook} from "../models/books.model.js";

//class that contains the methods to create, update, bring, and delete a workbook
export class BooksController {
    public domain: string;

    constructor(domain: string){
        this.domain = domain;
    }

    async allBooks(token: string, limit: number, page:number): Promise<BodyResponseGetAllBooks>{
       const headers: Record<string, string> = {
        "accept": "*/*",
        "Authorization": `Bearer ${token}`,
       };

       const reqOptions: RequestInit = {
        method: "GET",
        headers: headers
       }

       const response: Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, reqOptions);
       console.log(response);

       let responseBodyGetAllBooks: BodyResponseGetAllBooks;

       switch (response.status) {
        case 400:
          console.error(`Response body: ${(await response.json()).message}`);
          throw new Error(`Error: ${response.status}: The server cannot process the request: ${(await response.json()).message}`);
        case 401:
          console.error(`Response body: ${(await response.json()).message}`);
          throw new Error(`Error: ${response.status}: Not authorized: ${(await response.json()).message}`);
        case 404:
          console.error(`Response body: ${(await response.json()).message}`);
          throw new Error(`Error: ${response.status}: The resource was not found: ${(await response.json()).message}`);
        case 500:
          console.error(`Response body: ${(await response.json()).message}`);
          throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(await response.json()).message}`);
        case 200:
          responseBodyGetAllBooks = await response.json();
          break;
        default:
          console.error(`Unexpected response: ${response.status}`);
          throw new Error(`Error: ${response.status}: Unexpected server response: ${(await response.json()).message}`);
      }
       return responseBodyGetAllBooks;
    }

    async create(title: HTMLInputElement, author: HTMLInputElement, description: HTMLInputElement, summary: HTMLInputElement, publicationDate: HTMLInputElement, token: string): Promise<BodyResponseCreateBook>{

        const newBook: BodyRequestCreateBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };

        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };

        const reqOptions: RequestInit ={
            method: "POST",
            headers: headers,
            body: JSON.stringify(newBook)
        };

        const response: Response = await fetch(`${this.domain}/api/v1/books`, reqOptions);

        let responseBodyCreateBook: BodyResponseCreateBook
        switch (response.status) {
          case 400:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: The server cannot process the request: ${(await response.json()).message}`);
          case 401:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: Not authorized: ${(await response.json()).message}`);
          case 404:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: The resource was not found: ${(await response.json()).message}`);
          case 500:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(await response.json()).message}`);
          case 201:
            responseBodyCreateBook = await response.json();
            break;
          default:
            console.error(`Unexpected response: ${response.status}`);
            throw new Error(`Error: ${response.status}: Unexpected server response: ${(await response.json()).message}`);
        }
        return responseBodyCreateBook;
    }

    async getById(id: string, token: string): Promise<BodyResponseGetById>{
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
        };
        const reqOptions: RequestInit = {
        method: "GET",
        headers: headers
        };
        const response: Response = await fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
        let responseBodyGetById: BodyResponseGetById
        switch (response.status) {
          case 400:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: The server cannot process the request: ${(await response.json()).message}`);
          case 401:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: Not authorized: ${(await response.json()).message}`);
          case 404:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: The resource was not found: ${(await response.json()).message}`);
          case 500:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(await response.json()).message}`);
          case 200:
            responseBodyGetById = await response.json();
            break;
          default:
            console.error(`Unexpected response: ${response.status}`);
            throw new Error(`Error: ${response.status}: Unexpected server response: ${(await response.json()).message}`);
        }
        return responseBodyGetById;
    };

    async update(idCatche: string, title: HTMLInputElement, author: HTMLInputElement, description: HTMLInputElement, summary: HTMLInputElement, publicationDate: HTMLInputElement, token: string): Promise<BodyResponseUpdateBook>{
        const updateBook: BodyRequestUpdateBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };

        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };

        const reqOptions: RequestInit ={
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(updateBook)
        };

        const response: Response = await fetch(`${this.domain}/api/v1/books/${idCatche}`, reqOptions);
        let responseBodyUpdateBook: BodyResponseUpdateBook;
        switch (response.status) {
          case 400:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: The server cannot process the request: ${(await response.json()).message}`);
          case 401:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: Not authorized: ${(await response.json()).message}`);
          case 404:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: The resource was not found: ${(await response.json()).message}`);
          case 500:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(await response.json()).message}`);
          case 200:
            responseBodyUpdateBook = await response.json();
            break;
          default:
            console.error(`Unexpected response: ${response.status}`);
            throw new Error(`Error: ${response.status}: Unexpected server response: ${(await response.json()).message}`);
        }
        return responseBodyUpdateBook;
    };

    async delete(id: string, token: string):Promise<BodyResponseDeleteBook>{
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
        };

        const reqOptions: RequestInit = {
            method: "DELETE",
            headers: headers
        };

        const response: Response = await fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
        let responseBodyDeleteBook: BodyResponseDeleteBook;
        switch (response.status) {
          case 400:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: The server cannot process the request: ${(await response.json()).message}`);
          case 401:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: Not authorized: ${(await response.json()).message}`);
          case 404:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: The resource was not found: ${(await response.json()).message}`);
          case 500:
            console.error(`Response body: ${(await response.json()).message}`);
            throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(await response.json()).message}`);
          case 200:
            responseBodyDeleteBook = await response.json();
            break;
          default:
            console.error(`Unexpected response: ${response.status}`);
            throw new Error(`Error: ${response.status}: Unexpected server response: ${(await response.json()).message}`);
        }

        return responseBodyDeleteBook;
    }
}