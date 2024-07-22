var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CrudUsersController } from "./controllers/users.controller.js";
import { successAlert, errorAlert } from "./alert.js";
const URL_USERS = "http://190.147.64.47:5155";
const form = document.querySelector("form");
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
// form submit event to register a user
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const checklengthPasswords = lengthPasswords(password);
    const checkPasswordAndConfirmPassword = checkPasswords(password, confirmPassword);
    if (checkPasswordAndConfirmPassword && checklengthPasswords) {
        const crudUsers = new CrudUsersController(URL_USERS);
        try {
            const createUser = yield crudUsers.create(name, lastname, email, password);
            successAlert("Success user created");
            console.log("Success user created");
            window.location.href = "index.html";
        }
        catch (error) {
            if (error instanceof Error) {
                errorAlert(error.message);
            }
            else {
                errorAlert("An unknown error occurred");
            }
        }
    }
    form.reset();
}));
// function to validate if password and confirm password are the same
function checkPasswords(password, confirmPassword) {
    if (password.value === confirmPassword.value) {
        return true;
    }
    else {
        errorAlert("Passwords do not match");
        return false;
    }
}
// function to validate that the password has 6 or more characters
function lengthPasswords(password) {
    if (password.value.length >= 6) {
        return true;
    }
    else {
        errorAlert("Password must contain at least 6 characters");
        return false;
    }
}
