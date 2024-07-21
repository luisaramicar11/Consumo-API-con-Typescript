import {BodyResponseUpdateRole, BodyResponseAllUsers, BodyRequestCreateUser, BodyResponseCreateUser} from "../models/users.model.js"

export class CrudUsersController {
  public domain: string;

  constructor(domain: string) {
      this.domain = domain;
  }

  async create(name: HTMLInputElement, lastname: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseCreateUser> {
      const newUser: BodyRequestCreateUser = {
          name: name.value,
          lastname: lastname.value,
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

      const response: Response = await fetch(`${this.domain}/users`, reqOptions);
      if(!response.ok){
        console.log(`Response body: ${((await response.json()).message)}`);
        throw new Error(`Error al crear usuario: ${response.status} ${response.statusText}`);
      }
      const responseBodyCreateUser: BodyResponseCreateUser = await response.json();
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

      const response: Response = await fetch(`${this.domain}/users?limit=${limit}&page=${page}`, reqOptions);
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

    const response: Response = await fetch(`${this.domain}/users/${userId}/role?role=${role}`, reqOptions);
      if (!response.ok) {
          console.log(`response body: ${(await response.json()).message}`)
          throw new Error(`Error updating book: ${response.statusText}`);
      }
     
    const responseBodyUpdateBook: BodyResponseUpdateRole = await response.json();
    return responseBodyUpdateBook;
       
}
}