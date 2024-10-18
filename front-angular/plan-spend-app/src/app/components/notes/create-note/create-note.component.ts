import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../../services/notes/note.service';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export default class CreateNoteComponent implements OnInit{
  registerForm!: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;
  duplicateError: string = '';


  constructor(private fb: FormBuilder, private noteService: NoteService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

   // Método para enviar el formulario
   onSubmit():void {
    this.submitted = true;
    if (this.registerForm.valid) {
      const noteData = this.registerForm.value;
      this.noteService.createNote(noteData.title, noteData.description, false).subscribe(
        (response) => {
          this.router.navigate(['/dashboard/notes/my-notes']);
        },
        (error) => {
          // Manejo basado en el formato de error
          console.log(error.message);
        });
    } else {
    }
  }

}
