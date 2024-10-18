import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = 'http://localhost:3000/api'; // URL base de mi backend
  private token = localStorage.getItem('token');
  constructor(private http:HttpClient) { }


  // Método para crear un gasto (expense)
  createExpense(user_id: number, category_name: string, category_type: string, expense_description: string, expense_amount: number, expense_date: Date): Observable<any>
  {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const body = { user_id, category_name, category_type, expense_description, expense_amount, expense_date };  // El body con los datos del usuario
    return this.http.post(`${this.baseUrl}/expense/create/ExpenseAndCategory`, body, {headers});  // POST hacia el endpoint de expense
  }
}
