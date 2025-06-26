import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-modal.html',
  styleUrls: ['./logout-modal.scss']
})
export class LogoutModal {
  @Output() confirmLogout = new EventEmitter<void>();
  @Output() cancelLogout = new EventEmitter<void>();

  onConfirm() {
    this.confirmLogout.emit();
  }

  onCancel() {
    this.cancelLogout.emit();
  }
}