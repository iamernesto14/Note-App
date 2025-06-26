import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toaster } from './components/toaster/toaster';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet, Toaster],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'note-app';
}
