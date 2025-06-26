import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../../services/note';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  tags: string[] = [];
  activeView: 'all' | 'archived' | null = 'all';
  @Input() refreshTagsTrigger: number = 0;
  @Output() tagSelected = new EventEmitter<string>();
  @Output() allNotesSelected = new EventEmitter<void>();
  @Output() archivedNotesSelected = new EventEmitter<void>();

  constructor(private noteService: NoteService) {
    this.refreshTags();
  }

  ngOnChanges() {
    this.refreshTags();
  }

  refreshTags() {
    this.tags = this.noteService.getUniqueTags();
  }

  onTagClick(tag: string) {
    this.tagSelected.emit(tag);
    this.activeView = null;
  }

  onAllNotesClick() {
    this.allNotesSelected.emit();
    this.activeView = 'all';
  }

  onArchivedNotesClick() {
    this.archivedNotesSelected.emit();
    this.activeView = 'archived';
  }
}