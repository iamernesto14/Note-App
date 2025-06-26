import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note';
import { Note } from '../../models/note.interface';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToasterService } from '../../services/toaster';
import { NoteList } from '../note-list/note-list';
import { NoteCreate } from '../note-create/note-create';
import { Header } from '../shared/header/header';
import { Sidebar } from '../shared/sidebar/sidebar';
import { MobileMenu } from '../shared/mobile-menu/mobile-menu';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, NoteList, Header, NoteCreate, MobileMenu],
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
  isEditMode: boolean = false;
  tagsRefreshCounter: number = 0;

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

  editNote() {
    if (this.selectedNote) {
      this.showForm = true;
      this.isEditMode = true;
    }
  }

  showAllNotes() {
    this.currentView = 'all';
    this.notes = this.noteService.getAll();
    this.filteredNotes = [...this.notes];
    this.searchTerm = '';
    this.selectedNote = null;
    this.showForm = false;
    this.isEditMode = false;
  }

  showArchivedNotes() {
    this.currentView = 'archived';
    this.notes = this.noteService.getArchived();
    this.filteredNotes = [...this.notes];
    this.searchTerm = '';
    this.selectedNote = null;
    this.showForm = false;
    this.isEditMode = false;
  }

  onUpdateNote(data: { id: string; title: string; content: string; tags: string[] }) {
    this.noteService.update(data.id, { title: data.title, content: data.content, tags: data.tags });
    this.tagsRefreshCounter++;
    if (this.currentView === 'all') {
      this.showAllNotes();
    } else if (this.currentView === 'archived') {
      this.showArchivedNotes();
    }
    this.selectedNote = this.noteService.getById(data.id) || null;
    this.showForm = false;
    this.isEditMode = false;
    this.toasterService.showToast('Note updated successfully!', 'success');
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
    this.isEditMode = false;
  }

  selectNote(note: Note) {
    this.selectedNote = note;
    this.showForm = false;
    this.isEditMode = false; 
  }

  showCreateForm() {
    this.showForm = true;
    this.selectedNote = null;
    this.isEditMode = false; 
  }

  onSaveNote(note: { title: string; content: string; tags: string[] }) {
    this.noteService.create(note);
    this.tagsRefreshCounter++;
    if (this.currentView === 'all') {
      this.showAllNotes();
    } else if (this.currentView === 'archived') {
      this.showArchivedNotes();
    }
  }

  cancelCreateForm() {
    this.showForm = false;
    this.isEditMode = false;
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

  restoreNote(id: string | undefined) {
    if (id) {
      this.noteService.unarchive(id);
      if (this.currentView === 'all') {
        this.showAllNotes();
      } else if (this.currentView === 'archived') {
        this.showArchivedNotes();
      }
      this.toasterService.showToast('Note restored successfully!', 'success');
      if (this.selectedNote?.id === id && this.currentView === 'archived') {
        this.selectedNote = null; // Clear selection since restored note is no longer in archived view
      }
    }
  }

  deleteNote(id: string | undefined) {
    if (id) {
      this.noteService.delete(id);
      this.tagsRefreshCounter++;
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