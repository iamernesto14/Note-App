import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note';
import { Note } from '../../models/note.interface';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToasterService } from '../../services/toaster';
import { Sidebar } from '../shared/sidebar/sidebar';
import { NoteList } from '../note-list/note-list';
import { NoteCreate } from '../note-create/note-create';
import { Header } from '../shared/header/header';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, NoteList, Header, NoteCreate],
  templateUrl: './notes-dashboard.html',
  styleUrls: ['./notes-dashboard.scss']
})
export class NotesDashboard implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchTerm: string = '';
  selectedNote: Note | null = null;
  showForm: boolean = false;
  currentView: 'all' | 'archived' | null = 'all';

  constructor(
    private noteService: NoteService,
    private router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.showAllNotes();
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  showAllNotes() {
    this.currentView = 'all';
    this.notes = this.noteService.getAll();
    this.filteredNotes = [...this.notes];
    this.searchTerm = '';
    this.selectedNote = null;
    this.showForm = false;
  }

  showArchivedNotes() {
    this.currentView = 'archived';
    this.notes = this.noteService.getArchived();
    this.filteredNotes = [...this.notes];
    this.searchTerm = '';
    this.selectedNote = null;
    this.showForm = false;
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredNotes = [...this.notes];
  }

  viewNote(id: string) {
    this.router.navigate([`/notes/${id}`]);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  filterByTag(tag: string) {
    this.currentView = null; // Clear view when filtering by tag
    this.notes = this.noteService.getAll(); // Start from all notes
    this.filteredNotes = this.notes.filter(note =>
      note.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    );
    this.searchTerm = '';
    this.selectedNote = null;
    this.showForm = false;
  }

  selectNote(note: Note) {
    this.selectedNote = note;
    this.showForm = false;
  }

  showCreateForm() {
    this.showForm = true;
    this.selectedNote = null;
  }

  onSaveNote(note: { title: string; content: string; tags: string[] }) {
    this.noteService.create(note);
    if (this.currentView === 'all') {
      this.showAllNotes();
    } else if (this.currentView === 'archived') {
      this.showArchivedNotes();
    }
  }

  cancelCreateForm() {
    this.showForm = false;
  }

  archiveNote(id: string | undefined) {
    if (id) {
      this.noteService.archive(id);
      if (this.currentView === 'all') {
        this.showAllNotes();
      } else if (this.currentView === 'archived') {
        this.showArchivedNotes();
      }
      this.toasterService.showToast('Note archived successfully!', 'success');
      if (this.selectedNote?.id === id) {
        this.selectedNote = null;
      }
    }
  }

  deleteNote(id: string | undefined) {
    if (id) {
      this.noteService.delete(id);
      if (this.currentView === 'all') {
        this.showAllNotes();
      } else if (this.currentView === 'archived') {
        this.showArchivedNotes();
      }
      this.toasterService.showToast('Note deleted successfully!', 'success');
      if (this.selectedNote?.id === id) {
        this.selectedNote = null;
      }
    }
  }
}