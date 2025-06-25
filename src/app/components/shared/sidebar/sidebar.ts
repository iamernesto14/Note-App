import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  tags: string[] = [
    'Cooking', 'Dev', 'Fitness', 'Health',
    'Personal', 'React', 'work', 'Shopping',
    'Travel', 'TypeScript'
  ];

  @Output() tagSelected = new EventEmitter<string>();

  constructor(public router: Router) {}

  onTagClick(tag: string) {
    this.tagSelected.emit(tag);
  }
}
