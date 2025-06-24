
   import { Component, OnInit } from '@angular/core';
   import { NoteService } from '../../services/note';
   import { Note } from '../../models/note.interface';
   import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-archived-notes',
     standalone: true,
     imports: [RouterLink, CommonModule],
     templateUrl: './archived-notes.html',
     styleUrls: ['./archived-notes.scss']
   })
   export class ArchivedNotes implements OnInit {
     archivedNotes: Note[] = [];

     constructor(private noteService: NoteService, private router: Router) {}

     ngOnInit() {
       this.archivedNotes = this.noteService.getArchived();
       console.log('Archived notes:', this.archivedNotes);
     }

     unarchiveNote(id: string) {
       this.noteService.unarchive(id);
       this.archivedNotes = this.noteService.getArchived();
     }

     viewNote(id: string) {
       this.router.navigate([`/notes/${id}`]);
     }

     onBack(): void {
       this.router.navigate(['/notes']);
     }
   }