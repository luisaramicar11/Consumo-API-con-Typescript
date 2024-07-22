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
import { TableTemplateController } from "./controllers/tableTemplate.controller.js";
import { successAlert, errorAlert } from "./alert.js";
const URL_USERS = "http://190.147.64.47:5155";
const tbody = document.querySelector("tbody");
const btnLogout = document.getElementById("btn-logout");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const token = localStorage.getItem("authToken");
let roleUser;
let currentPage = 1;
const limit = 10;
// event to exit and be redirected to index.html
btnLogout.addEventListener("click", (e) => {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
});
// events for pagination
prevPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentPage >= 1) {
        currentPage--;
        yield allUsers(limit, currentPage);
    }
}));
nextPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentPage >= 1) {
        currentPage++;
        console.log(currentPage);
        yield allUsers(limit, currentPage);
    }
}));
// function to paint all users
function allUsers(limit, currentPage) {
    return __awaiter(this, void 0, void 0, function* () {
        const crudUsers = new CrudUsersController(URL_USERS);
        try {
            const response = yield crudUsers.allUsers(token, limit, currentPage);
            const users = response.data;
            tbody.innerHTML = '';
            const tableTemplate = new TableTemplateController(tbody);
            for (const user of users) {
                tableTemplate.render(user.id, user.name, user.lastName, user.email, user.role);
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
    });
}
allUsers(limit, currentPage);
// event that allows changing the role of a user
tbody.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    if (e.target instanceof HTMLButtonElement && e.target.classList.contains("btn-change-role")) {
        console.log("hola");
        const btn = e.target;
        const tr = btn.closest("tr");
        if (tr) {
            const tdRole = tr.querySelector(".tdRole");
            const userId = tr.querySelector(".tdId");
            if (tdRole && userId) {
                const crudUsers = new CrudUsersController(URL_USERS);
                if (tdRole.textContent === "user") {
                    roleUser = "admin";
                }
                else if (tdRole.textContent === "admin") {
                    roleUser = "user";
                }
                successAlert("Update role");
                tdRole.textContent = roleUser;
                yield crudUsers.updateRole(userId.textContent, token, roleUser);
                tbody.innerHTML = '';
                allUsers(limit, currentPage);
            }
        }
    }
}));
