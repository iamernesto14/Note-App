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

  constructor(
    private noteService: NoteService,
    private router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.notes = this.noteService.getAll();
    this.filteredNotes = [...this.notes];
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
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
    this.filteredNotes = this.notes.filter(note =>
      note.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    );
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
    this.notes = this.noteService.getAll();
    this.filteredNotes = [...this.notes];
    this.showForm = false;
  }

  cancelCreateForm() {
    this.showForm = false;
  }

  archiveNote(id: string | undefined) {
    if (id) {
      this.noteService.archive(id);
      this.notes = this.noteService.getAll();
      this.filteredNotes = [...this.notes];
      this.toasterService.showToast('Note archived successfully!', 'success');
      if (this.selectedNote?.id === id) {
        this.selectedNote = null;
      }
    }
  }

  deleteNote(id: string | undefined) {
    if (id) {
      this.noteService.delete(id);
      this.notes = this.noteService.getAll();
      this.filteredNotes = [...this.notes];
      this.toasterService.showToast('Note deleted successfully!', 'success');
      if (this.selectedNote?.id === id) {
        this.selectedNote = null;
      }
    }
  }
}