import { Injectable } from '@angular/core';
   import { Note } from '../models/note.interface';

   @Injectable({
     providedIn: 'root'
   })
   export class NoteService {
     private notes: Note[] = [];

     // Create a new note
     create(note: Omit<Note, 'id' | 'createdAt' | 'isArchived'>): Note {
       const newNote: Note = {
         ...note,
         id: crypto.randomUUID(),
         createdAt: new Date(),
         isArchived: false
       };
       this.notes.push(newNote);
       return newNote;
     }

     // Read all non-archived notes
     getAll(): Note[] {
       return this.notes.filter(note => !note.isArchived);
     }

     // Read archived notes
     getArchived(): Note[] {
       return this.notes.filter(note => note.isArchived);
     }

     // Read a single note by ID
     getById(id: string): Note | undefined {
       return this.notes.find(note => note.id === id);
     }

     // Update a note by ID
     update(id: string, updatedNote: Partial<Note>): Note | undefined {
       const note = this.notes.find(note => note.id === id);
       if (note) {
         Object.assign(note, updatedNote);
         return note;
       }
       return undefined;
     }

     // Delete a note by ID
     delete(id: string): boolean {
       const index = this.notes.findIndex(note => note.id === id);
       if (index !== -1) {
         this.notes.splice(index, 1);
         return true;
       }
       return false;
     }

     // Toggle archive status of a note
     archive(id: string): Note | undefined {
       const note = this.notes.find(note => note.id === id);
       if (note) {
         note.isArchived = !note.isArchived;
         return note;
       }
       return undefined;
     }
   }