import { Injectable } from '@angular/core';
   import { Note } from '../models/note.interface';

   @Injectable({
     providedIn: 'root'
   })
   export class NoteService {
     private notes: Note[] = [];

     // Create a new note
     create(note: Omit<Note, 'id' | 'createdAt' | 'isArchived' | 'isDeleted'>): Note {
       const newNote: Note = {
         ...note,
         id: crypto.randomUUID(),
         createdAt: new Date(),
         isArchived: false,
         isDeleted: false
       };
       this.notes.push(newNote);
       return newNote;
     }

     // Read all non-archived, non-deleted notes
     getAll(): Note[] {
       return this.notes.filter(note => !note.isArchived && !note.isDeleted);
     }

     // Read archived notes
     getArchived(): Note[] {
       return this.notes.filter(note => note.isArchived && !note.isDeleted);
     }

     // Read deleted notes
     getDeleted(): Note[] {
       return this.notes.filter(note => note.isDeleted);
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

     // Mark a note as deleted by ID
     delete(id: string): boolean {
       const note = this.notes.find(note => note.id === id);
       if (note) {
         note.isDeleted = true;
         return true;
       }
       return false;
     }

     // Toggle archive status of a note
     archive(id: string): Note | undefined {
       const note = this.notes.find(note => note.id === id);
       if (note && !note.isDeleted) {
         note.isArchived = !note.isArchived;
         return note;
       }
       return undefined;
     }

     unarchive(id: string): Note | undefined {
       const note = this.getById(id);
       if (note && note.isArchived && !note.isDeleted) {
         note.isArchived = false;
         return note;
       }
       return undefined;
     }
   }