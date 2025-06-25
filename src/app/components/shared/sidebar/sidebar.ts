import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  tags: string[] = [
    'Cooking', 'Dev', 'Fitness', 'Health',
    'Personal', 'React', 'work', 'Shopping',
    'Travel', 'TypeScript'
  ];
  activeView: 'all' | 'archived' | null = 'all';

  @Output() tagSelected = new EventEmitter<string>();
   @Output() allNotesSelected = new EventEmitter<void>();
  @Output() archivedNotesSelected = new EventEmitter<void>();

  constructor() {}

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
