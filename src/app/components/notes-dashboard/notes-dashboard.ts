
   import { Component, OnInit } from '@angular/core';
   import { NoteService } from '../../services/note';
   import { Note } from '../../models/note.interface';
   import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

   @Component({
     selector: 'app-notes-dashboard',
     standalone: true,
     imports: [CommonModule, RouterLink, FormsModule],
     templateUrl: './notes-dashboard.html',
     styleUrls: ['./notes-dashboard.scss']
   })
   export class NotesDashboard implements OnInit {
     notes: Note[] = [];
     filteredNotes: Note[] = [];
     searchTerm: string = '';

     constructor(private noteService: NoteService, private router: Router) {}

     ngOnInit() {
       this.notes = this.noteService.getAll();
       this.filteredNotes = [...this.notes];
     }

     onSearch(event: Event) {
       const input = (event.target as HTMLInputElement).value.toLowerCase();
       this.searchTerm = input;
       this.filteredNotes = this.notes.filter(note =>
         note.title.toLowerCase().includes(input) ||
         note.tags.some(tag => tag.toLowerCase().includes(input))
       );
     }

     clearSearch() {
       this.searchTerm = '';
       this.filteredNotes = [...this.notes];
     }

     viewNote(id: string) {
       this.router.navigate([`/notes/${id}`]);
     }

     archiveNote(id: string) {
       this.noteService.archive(id);
       this.notes = this.noteService.getAll();
       this.filteredNotes = [...this.notes];
     }

     deleteNote(id: string) {
       this.noteService.delete(id);
       this.notes = this.noteService.getAll();
       this.filteredNotes = [...this.notes];
     }

     navigateToSettings() {
       this.router.navigate(['/settings']);
     }
   }