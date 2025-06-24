
   import { Component, OnInit } from '@angular/core';
   import { NoteService } from '../../services/note';
   import { Note } from '../../models/note.interface';
   import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-deleted-notes',
     standalone: true,
     imports: [RouterLink, CommonModule],
     templateUrl: './deleted-notes.html',
     styleUrls: ['./deleted-notes.scss']
   })
   export class DeletedNotes implements OnInit {
     deletedNotes: Note[] = [];

     constructor(private noteService: NoteService, private router: Router) {}

     ngOnInit() {
       this.deletedNotes = this.noteService.getDeleted();
     }

     restoreNote(id: string) {
       this.noteService.restore(id);
       this.deletedNotes = this.noteService.getDeleted(); // Refresh the list
     }

     deletePermanently(id: string) {
       this.noteService.delete(id); // This will mark as deleted again if needed, but typically removes it
       this.deletedNotes = this.noteService.getDeleted(); // Refresh the list
     }

     onBack(): void {
       this.router.navigate(['/notes']);
     }
   }