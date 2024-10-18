import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'; // URL base de mi backend


  constructor(private http:HttpClient) { }


  private user: any = null;

  setUser(userData: any) {
    this.user = userData;
  }

  getUser() {
    return this.user;
  }


  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    const body = { email, password };  // El body con los datos del usuario
    return this.http.post(`${this.baseUrl}/user/login`, body);  // POST hacia el endpoint de login
  }

  // Método para crear un usuario
  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };  // El body con los datos del usuario
    return this.http.post(`${this.baseUrl}/user/create`, body);  // POST hacia el endpoint de login
  }


  //Decodificar el token para obtener el id
  decodedToken(): void{
    const token = localStorage.getItem('token');  // O sessionStorage
    if (token) {
      const decodedToken = jwtDecode(token); // Decodifica el token
    }
  }

  // Guardar el token en el localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }


   // Obtener el token desde el localStorage
   getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener el session desde el localStorage
  getSession(): string | null {
    return localStorage.getItem('session');
  }


  // Eliminar el token y session (cuando se cierre sesión)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('session');
  }


  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {

    if (typeof window === 'undefined') {
      // Si no estamos en el navegador, devolver false
      return false;
    }

    const token = localStorage.getItem('token');

    // Si no hay token, no está autenticado
    if (!token) {
      return false;
    }

    // Decodifica el token para obtener la fecha de expiración
    const tokenPayload = this.decodeToken(token);
    return !this.isTokenExpired(tokenPayload.exp);
  }

  // Decodificar el token (sin verificar la firma)
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  // Verificar si el token ha expirado
  isTokenExpired(exp: number): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  }
}
