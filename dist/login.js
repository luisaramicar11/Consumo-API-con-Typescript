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
import { UserController } from "./controllers/login.controller.js";
import { successAlert, errorAlert } from "./alert.js";
const URL_AUTH = "http://190.147.64.47:5155";
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
// Event that allows a registered user to enter the books.html and its section to be saved in local storage
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const crudUsers = new UserController(URL_AUTH);
    try {
        const response = yield crudUsers.login(email, password);
        const token = response.data.token;
        if (token) {
            localStorage.setItem('authToken', token);
            successAlert("Login successful");
            window.location.href = "books.html";
        }
    }
    catch (error) {
        if (error instanceof Error) {
            errorAlert(error.message);
        }
        else {
            errorAlert("An unknown error occurred");
        }
    }
    form.reset();
}));
