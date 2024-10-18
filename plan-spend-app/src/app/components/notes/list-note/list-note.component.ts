import { Component, OnInit  } from '@angular/core';
import { NoteService } from '../../../services/notes/note.service';
import { Note } from '../../../models/notes/note.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.css'
})
export default class ListNoteComponent implements OnInit{

  notes: Note[] = [];

  constructor(private noteService: NoteService) {}


  ngOnInit(): void {
    this.getNoteById();
  }

  getNoteById(): void {
    this.noteService.getNoteByUserId().subscribe({
      next: (result) => {
        this.notes = result;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  toggleFavorite(note: any) {
    note.pis_favorite = !note.pis_favorite;
    this.noteService.updateNoteStateisFavorite(note.pnote_id, note.pis_favorite).subscribe({
      next: (result) => {
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  toggleDropdown(index: number) {
    this.notes[index].isDropdownVisible = !this.notes[index].isDropdownVisible;
  }

}
