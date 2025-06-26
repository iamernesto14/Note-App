import { Injectable } from '@angular/core';
import { Note } from '../models/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private readonly STORAGE_KEY = 'notes';

  constructor() {
    this.loadNotes();
  }

  private loadNotes(): void {
    const storedNotes = localStorage.getItem(this.STORAGE_KEY);
    if (storedNotes) {
      try {
        const parsedNotes = JSON.parse(storedNotes);
        this.notes = parsedNotes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt)
        }));
      } catch (error) {
        console.error('Error loading notes from localStorage:', error);
        this.notes = [];
      }
    }
  }

  private saveNotes(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.notes));
    } catch (error) {
      console.error('Error saving notes to localStorage:', error);
    }
  }

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

  getUniqueTags(): string[] {
    const allTags = this.notes
      .filter(note => !note.isDeleted)
      .flatMap(note => note.tags);
    return [...new Set(allTags)].sort();
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
    this.saveNotes();
    return newNote;
  }

  update(id: string, updatedNote: Partial<Note>): Note | undefined {
    const index = this.notes.findIndex(note => note.id === id);
    if (index !== -1) {
      this.notes[index] = { ...this.notes[index], ...updatedNote };
      this.saveNotes();
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
      this.saveNotes();
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
      this.saveNotes();
      return note;
    }
    console.log('Unarchive failed for id:', id);
    return undefined;
  }

  delete(id: string): Note | undefined {
    const note = this.getById(id);
    if (note && !note.isDeleted) {
      note.isDeleted = true;
      this.saveNotes();
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
      this.saveNotes();
      return note;
    }
    console.log('Restore failed for id:', id);
    return undefined;
  }

  permanentlyDelete(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.saveNotes();
  }
}