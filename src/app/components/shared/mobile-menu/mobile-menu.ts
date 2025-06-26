import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NoteService } from '../../../services/note';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mobile-menu.html',
  styleUrls: ['./mobile-menu.scss']
})
export class MobileMenu {
  @Input() refreshTagsTrigger: number = 0;
  @Output() tagSelected = new EventEmitter<string>();
  @Output() searchTermChanged = new EventEmitter<string>();
  @Output() allNotesSelected = new EventEmitter<void>();
  @Output() archivedNotesSelected = new EventEmitter<void>();
  tags: string[] = [];
  showSearch: boolean = false;
  showTags: boolean = false;
  searchTerm: string = '';

  constructor(private noteService: NoteService, private router: Router) {
    this.refreshTags();
  }

  ngOnChanges() {
    this.refreshTags();
  }

  refreshTags() {
    this.tags = this.noteService.getUniqueTags();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.showTags = false; // Close tags if search is toggled
    if (!this.showSearch) {
      this.searchTerm = '';
      this.searchTermChanged.emit('');
    }
  }

  toggleTags() {
    this.showTags = !this.showTags;
    this.showSearch = false; // Close search if tags are toggled
  }

  onSearch(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = input;
    this.searchTermChanged.emit(input);
  }

  onTagClick(tag: string) {
    this.tagSelected.emit(tag);
    this.showTags = false;
  }

  onAllNotesClick() {
    this.allNotesSelected.emit();
    this.showSearch = false;
    this.showTags = false;
    this.router.navigate(['/notes']);
  }

  onArchivedNotesClick() {
    this.archivedNotesSelected.emit();
    this.showSearch = false;
    this.showTags = false;
    this.router.navigate(['/archived']);
  }

  navigateToHome() {
    this.showSearch = false;
    this.showTags = false;
    this.router.navigate(['/']);
  }

  navigateToSettings() {
    this.showSearch = false;
    this.showTags = false;
    this.router.navigate(['/settings']);
  }
}