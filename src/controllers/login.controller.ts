import { BodyRequestLogin, BodyResponseLogin } from "../models/auth.model.js";

// class that allows logging in a user that already exists
export class UserController {
  public domain: string;

  constructor(domain: string) {
    this.domain = domain;
  }

  async login(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseLogin> {
    const headers: Record<string, string> = {
      'accept': '*/*',
      'Content-Type': 'application/json'
    };

    const userData: BodyRequestLogin = {
      email: email.value,
      password: password.value
    };

    const reqOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(userData)
    };

    const response: Response = await fetch(`${this.domain}/api/v1/auth/login`, reqOptions);

    let responseBodyLogin: BodyResponseLogin;

    switch (response.status) {
      case 400:
        console.error(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}: The server cannot process the request: ${(await response.json()).message}`);
      case 401:
        console.error(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}: Incorrect credentials: ${(await response.json()).message}`);
      case 404:
        console.error(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}: The resource was not found: ${(await response.json()).message}`);
      case 500:
        console.error(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}:An internal error has occurred on the server: ${(await response.json()).message}`);
      case 201:
        responseBodyLogin = await response.json();
        break;
      default:
        console.error(`Unexpected response: ${response.status}`);
        throw new Error(`Error: ${response.status}: Respuesta inesperada del servidor: ${(await response.json()).message}`);
    }

    return responseBodyLogin;
  }
}