import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Note } from '../../models/note.interface';
import { CommonModule } from '@angular/common';
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
  @Output() navigateToNote = new EventEmitter<string>(); // New event for navigation

  isMobile: boolean = false;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  selectNote(note: Note) {
    if (this.isMobile) {
      this.navigateToNote.emit(note.id);
    } else {
      this.noteSelected.emit(note);
    }
  }

  onCreateNote() {
    this.createNote.emit();
  }
}