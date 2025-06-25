import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  @Input() searchTerm: string = '';
  @Output() searchTermChanged = new EventEmitter<string>();
  @Output() clearSearchTriggered = new EventEmitter<void>();

  onSearch(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = input;
    this.searchTermChanged.emit(input);
  }

  clearSearch() {
    this.searchTerm = '';
    this.clearSearchTriggered.emit();
  }
}