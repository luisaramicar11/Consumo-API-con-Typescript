var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// class that allows creating, updating roles and painting users
export class CrudUsersController {
    constructor(domain) {
        this.domain = domain;
    }
    create(name, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                name: name.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
            };
            const headers = {
                'accept': '*/*',
                'Content-Type': 'application/json',
            };
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(newUser),
            };
            const response = yield fetch(`${this.domain}/api/v1/users`, reqOptions);
            let responseBodyCreateUser;
            switch (response.status) {
                case 400:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The server cannot process the request: ${(yield response.json()).message}`);
                case 401:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: Incorrect credentials: ${(yield response.json()).message}`);
                case 404:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The resource was not found: ${(yield response.json()).message}`);
                case 500:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(yield response.json()).message}`);
                case 201:
                    responseBodyCreateUser = yield response.json();
                    break;
                default:
                    console.error(`Unexpected response: ${response.status}: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: Unexpected server response`);
            }
            return responseBodyCreateUser;
        });
    }
    allUsers(token, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "GET",
                headers: headers,
            };
            const response = yield fetch(`${this.domain}/api/v1/users?limit=${limit}&page=${page}`, reqOptions);
            if (!response.ok) {
                console.log(`response body: ${(yield response.json()).message}`);
                throw new Error(`Error reading book: ${response.statusText}`);
            }
            const responseBodyGetAllUsers = yield response.json();
            return responseBodyGetAllUsers;
        });
    }
    updateRole(userId, token, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "PATCH",
                headers: headers,
            };
            const response = yield fetch(`${this.domain}/api/v1/users/${userId}/role?role=${role}`, reqOptions);
            let responseBodyUpdateRole;
            switch (response.status) {
                case 400:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The server cannot process the request: ${(yield response.json()).message}`);
                case 401:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: Incorrect credentials: ${(yield response.json()).message}`);
                case 404:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: The resource was not found: ${(yield response.json()).message}`);
                case 500:
                    console.error(`Response body: ${(yield response.json()).message}`);
                    throw new Error(`Error: ${response.status}: An internal error has occurred on the server: ${(yield response.json()).message}`);
                case 200:
                    responseBodyUpdateRole = yield response.json();
                    break;
                default:
                    console.error(`Unexpected response: ${response.status}`);
                    throw new Error(`Error: ${response.status}: Unexpected server response`);
            }
            return responseBodyUpdateRole;
        });
    }
}
