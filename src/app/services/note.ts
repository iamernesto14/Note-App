   import { Injectable } from '@angular/core';
   import { Note } from '../models/note.interface';

   @Injectable({
     providedIn: 'root'
   })
   export class NoteService {
     private notes: Note[] = [];

     getAll(): Note[] {
       return this.notes.filter(note => !note.isArchived && !note.isDeleted);
     }

     getArchived(): Note[] {
       console.log('Archived notes:', this.notes.filter(note => note.isArchived && !note.isDeleted));
       return this.notes.filter(note => note.isArchived && !note.isDeleted);
     }

     getDeleted(): Note[] {
       return this.notes.filter(note => note.isDeleted);
     }

     getById(id: string): Note | undefined {
       return this.notes.find(note => note.id === id);
     }

     create(note: Omit<Note, 'id' | 'isArchived' | 'isDeleted' | 'createdAt'>): Note {
       const newNote: Note = {
         id: Math.random().toString(36).substr(2, 9),
         ...note,
         isArchived: false,
         isDeleted: false,
         createdAt: new Date()
       };
       this.notes.push(newNote);
       console.log('New note created:', newNote);
       return newNote;
     }

     update(id: string, updatedNote: Partial<Note>): Note | undefined {
       const index = this.notes.findIndex(note => note.id === id);
       if (index !== -1) {
         this.notes[index] = { ...this.notes[index], ...updatedNote };
         return this.notes[index];
       }
       return undefined;
     }

     archive(id: string): Note | undefined {
       const note = this.getById(id);
       console.log('Archiving note with id:', id, 'Found note:', note);
       if (note && !note.isDeleted) {
         note.isArchived = true;
         console.log('Note archived:', note);
         return note;
       }
       console.log('Archive failed for id:', id);
       return undefined;
     }

     unarchive(id: string): Note | undefined {
       const note = this.getById(id);
       console.log('Unarchiving note with id:', id, 'Found note:', note);
       if (note && note.isArchived && !note.isDeleted) {
         note.isArchived = false;
         console.log('Note unarchived:', note);
         return note;
       }
       console.log('Unarchive failed for id:', id);
       return undefined;
     }

     delete(id: string): Note | undefined {
       const note = this.getById(id);
       if (note && !note.isDeleted) {
         note.isDeleted = true;
         return note;
       }
       return undefined;
     }

     restore(id: string): Note | undefined {
       const note = this.getById(id);
       console.log('Restoring note with id:', id, 'Found note:', note);
       if (note && note.isDeleted) {
         note.isDeleted = false;
         console.log('Note restored:', note);
         return note;
       }
       console.log('Restore failed for id:', id);
       return undefined;
     }
   }