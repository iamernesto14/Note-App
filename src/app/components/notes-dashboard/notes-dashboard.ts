
   import { Component, OnInit } from '@angular/core';
   import { NoteService } from '../../services/note';
   import { Note } from '../../models/note.interface';
   import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-notes-dashboard',
     standalone: true,
     imports: [CommonModule, RouterLink],
     templateUrl: './notes-dashboard.html',
     styleUrls: ['./notes-dashboard.scss']
   })
   export class NotesDashboard implements OnInit {
     notes: Note[] = [];

     constructor(private noteService: NoteService, private router: Router) {}

     ngOnInit() {
       this.notes = this.noteService.getAll();
     }

     archiveNote(id: string) {
       this.noteService.archive(id);
       this.notes = this.noteService.getAll(); // Refresh the list
     }

     deleteNote(id: string) {
       this.noteService.delete(id);
       this.notes = this.noteService.getAll(); // Refresh the list
     }

     viewNote(id: string) {
       this.router.navigate([`/notes/${id}`]);
     }
   }