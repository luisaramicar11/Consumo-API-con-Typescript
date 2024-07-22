import { CrudUsersController } from "./controllers/users.controller.js";
import { TableTemplateController} from "./controllers/tableTemplate.controller.js";
import {successAlert, errorAlert} from "./alert.js"

const URL_USERS: string = "http://190.147.64.47:5155";
const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
const btnLogout = document.getElementById("btn-logout") as HTMLButtonElement;
const prevPage = document.getElementById("prev-page") as HTMLButtonElement;
const nextPage = document.getElementById("next-page") as HTMLButtonElement;
const token = localStorage.getItem("authToken");
let roleUser: string;
let currentPage: number = 1;
const limit: number = 10;

// event to exit and be redirected to index.html
btnLogout.addEventListener("click", (e: Event) => {
  localStorage.removeItem("authToken")
  window.location.href = "index.html"
})

   // events for pagination
prevPage.addEventListener("click", async (e: Event) => {
  if (currentPage >= 1) {
    currentPage--;
    await allUsers(limit, currentPage);
  }
});

nextPage.addEventListener("click", async (e: Event) => {
  if (currentPage >= 1) {
    currentPage++;
    console.log(currentPage)
    await allUsers(limit, currentPage);
  }
});

// function to paint all users
async function allUsers(limit: number, currentPage: number) {
    const crudUsers = new CrudUsersController(URL_USERS);
    try {
      const response = await crudUsers.allUsers(token as string, limit, currentPage);
      const users = response.data;

      tbody.innerHTML = '';
      const tableTemplate = new TableTemplateController(tbody);

      for (const user of users) {
        tableTemplate.render(user.id, user.name, user.lastName, user.email, user.role);
      }
    } catch (error) {
      if (error instanceof Error) {
        errorAlert(error.message);
    } else {
        errorAlert("An unknown error occurred");
    }
    }
  }

  allUsers(limit, currentPage);

  // event that allows changing the role of a user
  tbody.addEventListener("click", async (e: Event) => {
    if (e.target instanceof HTMLButtonElement && e.target.classList.contains("btn-change-role")) {
        console.log("hola");

        const btn = e.target;
        const tr = btn.closest("tr") as HTMLTableRowElement;

        if (tr) {
            const tdRole = tr.querySelector(".tdRole") as HTMLTableCellElement;
            const userId = tr.querySelector(".tdId") as HTMLTableCellElement;

            if (tdRole && userId) {
                const crudUsers = new CrudUsersController(URL_USERS);

                if (tdRole.textContent === "user") {
                    roleUser = "admin";
                } else if (tdRole.textContent === "admin") {
                    roleUser = "user";
                }
                successAlert("Update role")
                tdRole.textContent = roleUser;
                await crudUsers.updateRole(userId.textContent as string, token as string, roleUser);
                tbody.innerHTML = '';
                allUsers(limit, currentPage);
            }
        }
    }
});