import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/api'; // URL base de mi backend
  private token = localStorage.getItem('token');
  constructor(private http:HttpClient) { }

  // Método para crear una tarea (task)
  createTask(title: string, description: string, due_date: Date): Observable<any>
  {
    const sessionString = localStorage.getItem('session');
    const userid = sessionString ? parseInt(sessionString, 10) : 0;
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const body = { userid, title, description, due_date };  // El body con los datos del usuario
    return this.http.post(`${this.baseUrl}/task/create`, body, {headers});  // POST hacia el endpoint de income
  }

  getTaskByUserId(): Observable<any> {
    const sessionString = localStorage.getItem('session');
    const userid = sessionString ? parseInt(sessionString, 10) : 0;
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const body = { userid};
    return this.http.post(`${this.baseUrl}/task/getTaskByUserId`, body, {headers});
  }

  getTaskByTaskId(p_task_id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const body = { p_task_id};
    return this.http.post(`${this.baseUrl}/task/getTaskByTaskId`, body, {headers});
  }

  getTaskByIsNotCompleted(): Observable<any> {
    const sessionString = localStorage.getItem('session');
    const p_user_id = sessionString ? parseInt(sessionString, 10) : 0;
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return this.http.get(`${this.baseUrl}/task/getTaskByIsNotCompleted/${p_user_id}`, {headers});
  }

  updateTask(p_task_id: number, data: Task): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const url = `${this.baseUrl}/task/update/${p_task_id}`;
    return this.http.put(url, data, {headers});
  }

  deleteTask(p_task_id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return this.http.delete(`${this.baseUrl}/task/delete/${p_task_id}`,{
      headers: headers,
    });
  }
}
