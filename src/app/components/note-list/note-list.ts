import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-list.html',
  styleUrls: ['./note-list.scss']
})
export class NoteList {
  @Input() filteredNotes: Note[] = [];
  @Input() selectedNote: Note | null = null;
  @Output() noteSelected = new EventEmitter<Note>();
  @Output() createNote = new EventEmitter<void>();

  selectNote(note: Note) {
    this.noteSelected.emit(note);
  }

  onCreateNote() {
    console.log('Create New Note button clicked');
    this.createNote.emit();
  }
}