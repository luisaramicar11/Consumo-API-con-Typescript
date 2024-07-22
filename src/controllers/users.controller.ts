import {BodyResponseUpdateRole, BodyResponseAllUsers, BodyRequestCreateUser, BodyResponseCreateUser} from "../models/users.model.js"

// class that allows creating, updating roles and painting users
export class CrudUsersController {
  public domain: string;

  constructor(domain: string) {
      this.domain = domain;
  }

  async create(name: HTMLInputElement, lastName: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseCreateUser> {
      const newUser: BodyRequestCreateUser = {
          name: name.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
      };

      const headers: Record<string, string> = {
        'accept': '*/*',
        'Content-Type': 'application/json',
      }

      const reqOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newUser),
      }

      const response: Response = await fetch(`${this.domain}/api/v1/users`, reqOptions);
      let responseBodyCreateUser: BodyResponseCreateUser;
      switch (response.status) {
        case 400:
          console.error(`Response body: ${(await response.json()).message}`);
          throw new Error(`Error: ${response.status}: El servidor no puede procesar la solicitud: ${(await response.json()).message}`);
        case 401:
          console.error(`Response body: ${(await response.json()).message}`);
          throw new Error(`Error: ${response.status}: Credenciales incorrectas: ${(await response.json()).message}`);
        case 404:
          console.error(`Response body: ${(await response.json()).message}`);
          throw new Error(`Error: ${response.status}: No se encontró el recurso: ${(await response.json()).message}`);
        case 500:
          console.error(`Response body: ${(await response.json()).message}`);
          throw new Error(`Error: ${response.status}: Ha ocurrido un error interno en el servidor: ${(await response.json()).message}`);
        case 201:
          responseBodyCreateUser = await response.json();
          break;
        default:
          console.error(`Unexpected response: ${response.status}: ${(await response.json()).message}`);
          throw new Error(`Error: ${response.status}: Respuesta inesperada del servidor`);
      }
      return responseBodyCreateUser;
  }

  async allUsers(token: string, limit: number, page: number): Promise<BodyResponseAllUsers>{
    const headers: Record<string, string> = {
        "accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }

      const reqOptions: RequestInit = {
        method: "GET",
        headers: headers,
      }

      const response: Response = await fetch(`${this.domain}/api/v1/users?limit=${limit}&page=${page}`, reqOptions);
      if(!response.ok){
        console.log(`response body: ${(await response.json()).message}`)
        throw new Error(`Error reading book: ${response.statusText}`);
      }
      const responseBodyGetAllUsers: BodyResponseAllUsers = await response.json();
      return responseBodyGetAllUsers;
  }

   async updateRole(userId: string, token: string, role: string): Promise<BodyResponseUpdateRole> {

    const headers: Record<string, string> = {
      "accept": "*/*",
      "Authorization": `Bearer ${token}`,
    }

    const reqOptions: RequestInit = {
      method: "PATCH",
      headers: headers,
    }

    const response: Response = await fetch(`${this.domain}/api/v1/users/${userId}/role?role=${role}`, reqOptions);
    let responseBodyUpdateRole: BodyResponseUpdateRole;
    
    switch (response.status) {
      case 400:
        console.error(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}: El servidor no puede procesar la solicitud: ${(await response.json()).message}`);
      case 401:
        console.error(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}: Credenciales incorrectas: ${(await response.json()).message}`);
      case 404:
        console.error(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}: No se encontró el recurso: ${(await response.json()).message}`);
      case 500:
        console.error(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}: Ha ocurrido un error interno en el servidor: ${(await response.json()).message}`);
      case 200:
        responseBodyUpdateRole = await response.json();
        break;
      default:
        console.error(`Unexpected response: ${response.status}`);
        throw new Error(`Error: ${response.status}: Respuesta inesperada del servidor`);
    }
    return responseBodyUpdateRole;
       
}
}