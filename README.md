# Book Manager API Consumer

This project is a web application that consumes the Book Manager API, built with TypeScript. It provides functionality to manage users and books, including creating, updating, and retrieving information.

## Features

- **User Management**: Create, update, and view users.
- **Book Management**: Add, update, and list books.
- **Authentication**: JWT-based authentication for secure access.
- **Responsive Design**: Built with Bootstrap for responsive UI.

## Technologies Used

- **TypeScript**: For static type checking and modern JavaScript features.
- **Bootstrap**: For design.
- **SweetAlert2**: For beautiful and responsive alerts.
- **Google Fonts**: For custom font styles.
- **Vite**: As the build tool and bundler.

## Setup and Installation

1. **Clone the repository**:
   git clone https://github.com/luisaramicar11/Consumo-API-con-Typescript.git
   cd Consumo-API-con-Typescript

2. **Install dependencies**:
npm install

3. **Run the application**:
npm run dev

## Usage
To test the application, you can use the following credentials:

-Role admin
Email: prueba@prueba.pru
Password: C0ntr4S3gu++r4

-Role user
Email: bill@gates.riwi
Password: abcd1234

## Folder Structure
-**src/**: Contains the source code.
controllers/: Contains the TypeScript classes for managing CRUD operations.
models/: Contains TypeScript interfaces.
public/: Contains static files like images.
-**dist/**: Contains the output files generated after the build.

## API Endpoints
The application interacts with the following API endpoints:

-**User Endpoints**:
-POST /api/v1/users: Create a new user.
-GET /api/v1/users: Retrieve all users with pagination.
-PATCH /api/v1/users/:userId/role: Update the role of a user.
-**Book Endpoints**:
-POST /api/v1/books: Create a new book.
-GET /api/v1/books: Retrieve all books with pagination.
-PATCH /api/v1/books/:bookId: Update a book.
-GET /api/v1/books/{id}: Retrieve one book.
-DELETE /api/v1/books/{id}: Delete one book.