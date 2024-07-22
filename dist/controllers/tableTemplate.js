export class TableTemplateController {
    constructor(tBodyUsers) {
        this.tBodyUsers = tBodyUsers;
    }
    render(id, name, lastName, email, role) {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        tdId.classList.add("tdId");
        tdId.textContent = id;
        tr.appendChild(tdId);
        const tdName = document.createElement("td");
        tdName.textContent = name;
        tr.appendChild(tdName);
        const tdLastname = document.createElement("td");
        tdLastname.textContent = lastName;
        tr.appendChild(tdLastname);
        const tdEmail = document.createElement("td");
        tdEmail.textContent = email;
        tr.appendChild(tdEmail);
        const tdRole = document.createElement("td");
        tdRole.classList.add("tdRole");
        tdRole.textContent = role;
        tr.appendChild(tdRole);
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-warning", "btn-change-role");
        btnEdit.textContent = "Editar Rol";
        btnEdit.type = "button";
        btnEdit.dataset.id = id;
        const tdRoleButton = document.createElement("td");
        tdRoleButton.appendChild(btnEdit);
        tr.appendChild(tdRoleButton);
        this.tBodyUsers.appendChild(tr);
    }
}
