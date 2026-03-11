import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCardComponent } from '../button-card/button-card.component';

@Component({
  selector: 'app-parent-card',
  standalone: true,
  imports: [CommonModule, ButtonCardComponent],
  templateUrl: './parent-card.html',
  styleUrls: ['./parent-card.css'], // fixed
})
export class ParentCardComponent {
  profileSelected: any = null;
  drop = false;

  triggerDrop() {
    this.drop = true;
  }

  receiveProfile(data: any) {
    this.profileSelected = data;
  }
}
