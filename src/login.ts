import { UserController } from "./controllers/login.controller.js";
import { successAlert, errorAlert} from "./alert.js";

const URL_AUTH: string = "http://190.147.64.47:5155";
const form = document.querySelector("form") as HTMLFormElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

// Event that allows a registered user to enter the books.html and its section to be saved in local storage
form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const crudUsers = new UserController(URL_AUTH);

  try {
    const response = await crudUsers.login(email, password);
    const token: string | null = response.data.token;

    if (token) {
      localStorage.setItem('authToken', token);
      successAlert("Login successful");
      window.location.href = "books.html";
    } 
  } catch (error) {
    if (error instanceof Error) {
        //errorAlert(error.message);
    } else {
        //errorAlert("Se produjo un error desconocido");
    }
  }

  form.reset();
});
