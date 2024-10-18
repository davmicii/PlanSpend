import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/categories/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/api'; // URL base de mi backend
  private token = localStorage.getItem('token');
  constructor(private http:HttpClient) { }

  getCategoryByUserId(): Observable<any> {
    const sessionString = localStorage.getItem('session');
    const userid = sessionString ? parseInt(sessionString, 10) : 0;
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return this.http.get(`${this.baseUrl}/category/getById/${userid}`,{
      headers: headers,
    });
  }

  getCategoryByCategoryId(cat_id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return this.http.get(`${this.baseUrl}/category/getByCatId/${cat_id}`,{
      headers: headers,
    });
  }

  getMovementsByUserId(): Observable<any> {
    const sessionString = localStorage.getItem('session');
    const p_user_id = sessionString ? parseInt(sessionString, 10) : 0;
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return this.http.get(`${this.baseUrl}/movement/getMovementsByUserId/${p_user_id}`,{
      headers: headers,
    });
  }

  updateCategory(p_category_id: number, data: Category): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const url = `${this.baseUrl}/category/update/${p_category_id}`;
    return this.http.put(url, data, {headers});
  }

  deleteCategoryByCategoryId(p_category_id: number, p_record_id: number, p_type: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return this.http.delete(`${this.baseUrl}/category/delete/${p_category_id}/${p_record_id}/${p_type}`,{
      headers: headers,
    });
  }
}
