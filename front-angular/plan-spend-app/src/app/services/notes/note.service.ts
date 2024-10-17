import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../models/notes/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:3000/api'; // URL base de mi backend
  private token = localStorage.getItem('token');
  constructor(private http:HttpClient) { }

  // Método para crear una nota (note)
  createNote(p_title: string, p_description: string, p_is_favorite: boolean): Observable<any>
  {
    const sessionString = localStorage.getItem('session');
    const p_user_id = sessionString ? parseInt(sessionString, 10) : 0;
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const body = { p_user_id, p_title, p_description, p_is_favorite };  // El body con los datos de la nota
    return this.http.post(`${this.baseUrl}/note/create`, body, {headers});  // POST hacia el endpoint de note
  }

  getNoteByUserId(): Observable<any> {
    const sessionString = localStorage.getItem('session');
    const userid = sessionString ? parseInt(sessionString, 10) : 0;
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    return this.http.get(`${this.baseUrl}/note/getNoteById/${userid}`, {
      headers
    });
  }

  updateNoteStateisFavorite(p_note_id: number, pis_favorite: boolean): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const url = `${this.baseUrl}/note/update/${p_note_id}`;
    const body = {pis_favorite}
    return this.http.put(url, body, {headers});
  }
}
