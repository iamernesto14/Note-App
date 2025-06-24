
   import { Component } from '@angular/core';
   import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
   import { NoteService } from '../../services/note';
   import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

   @Component({
     selector: 'app-note-create',
     standalone: true,
     imports: [ReactiveFormsModule, RouterLink, CommonModule],
     templateUrl: './note-create.html',
     styleUrls: ['./note-create.scss']
   })
   export class NoteCreate {
     noteForm: FormGroup;
     formError: string | null = null;

     constructor(private fb: FormBuilder, private noteService: NoteService, private router: Router) {
       this.noteForm = this.fb.group({
         title: ['', Validators.required],
         content: ['', Validators.required],
         tags: ['']
       });
     }

     onSubmit(): void {
       if (this.noteForm.valid) {
         const newNote = this.noteService.create({
           title: this.noteForm.value.title,
           content: this.noteForm.value.content,
           tags: this.noteForm.value.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0) || []
         });
         this.formError = null;
         console.log('Note created:', newNote);
         this.router.navigate(['/notes']);
       } else {
         this.formError = 'Please fill out all required fields';
       }
     }

     onCancel(): void {
       this.router.navigate(['/notes']);
     }
   }
  