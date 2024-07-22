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
        responseBodyLogin = await response.json();
        break;
      default:
        console.error(`Unexpected response: ${response.status}`);
        throw new Error(`Error: ${response.status}: Respuesta inesperada del servidor: ${(await response.json()).message}`);
    }

    return responseBodyLogin;
  }
}