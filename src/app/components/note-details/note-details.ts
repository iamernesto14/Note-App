
   import { Component, OnInit } from '@angular/core';
   import { NoteService } from '../../services/note';
   import { Note } from '../../models/note.interface';
   import { ActivatedRoute, Router, RouterLink } from '@angular/router';
   import { ToasterService } from '../../services/toaster';
import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-note-details',
     standalone: true,
     imports: [RouterLink, CommonModule],
     templateUrl: './note-details.html',
     styleUrls: ['./note-details.scss']
   })
   export class NoteDetails implements OnInit {
     note: Note | undefined;
     constructor(
       private noteService: NoteService,
       private route: ActivatedRoute,
       private router: Router,
       private toasterService: ToasterService
     ) {}

     ngOnInit() {
       const id = this.route.snapshot.paramMap.get('id');
       if (id) {
         this.note = this.noteService.getById(id);
       }
     }

     onArchive(): void {
       if (this.note?.id) {
         this.noteService.archive(this.note.id);
         this.router.navigate(['/notes']);
         this.toasterService.showToast('Note archived successfully!', 'success');
       }
     }

     onDelete(): void {
       if (this.note?.id) {
         this.noteService.delete(this.note.id);
         this.router.navigate(['/notes']);
         this.toasterService.showToast('Note deleted successfully!', 'success');
       }
     }

     onBack(): void {
       this.router.navigate(['/notes']);
     }
   }