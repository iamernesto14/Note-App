import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../../services/note';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster';
import { LogoutButton } from '../logout-button/logout-button';
import { LogoutModal } from '../logout-modal/logout-modal';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LogoutButton, LogoutModal],
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
  showLogoutModal: boolean = false;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private toasterService: ToasterService
  ) {
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

  onLogoutClick() {
    this.showLogoutModal = true;
  }

  onConfirmLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('notes');
    this.toasterService.showToast('Successfully logged out!', 'success');
    this.router.navigate(['/login']);
    this.showLogoutModal = false;
  }

  onCancelLogout() {
    this.showLogoutModal = false;
  }
}