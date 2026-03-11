import { Component } from '@angular/core';
import { ParentCardComponent } from './parent-card/parent-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ParentCardComponent],
  templateUrl: './app.html',
})
export class App {}
