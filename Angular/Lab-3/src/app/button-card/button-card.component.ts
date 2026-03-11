import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-card',
  standalone: true,
  templateUrl: './button-card.html',
  styleUrl: './button-card.css',
})
export class ButtonCardComponent {
  @Output() profileSelected = new EventEmitter<any>();
  @Output() dropEvent = new EventEmitter<void>();

  sendProfile() {
    this.profileSelected.emit({
      name: 'Ahmed Ramadan',
      role: 'Computer Engineer',
    });

    this.dropEvent.emit();
  }
}
