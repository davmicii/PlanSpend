import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private baseUrl = 'http://localhost:3000/api'; // URL base de mi backend
  private token = localStorage.getItem('token');
  constructor(private http:HttpClient) { }


  // Método para crear un ingreso (income)
  createIncome(user_id: number, category_name: string, category_type: string, income_description: string, income_amount: number, income_date: Date): Observable<any>
  {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const body = { user_id, category_name, category_type, income_description, income_amount, income_date };  // El body con los datos del usuario
    return this.http.post(`${this.baseUrl}/income/create/IncomeAndCategory`, body, {headers});  // POST hacia el endpoint de income
  }
}
