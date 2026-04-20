import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../models/student';

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-table.html',
  styleUrl: './student-table.css',
})
export class StudentTableComponent {
  @Input({ required: true }) students: Student[] = [];
  @Input() hasActiveFilters = false;
  @Output() viewStudent = new EventEmitter<number>();
  @Output() editStudent = new EventEmitter<number>();
  @Output() deleteStudent = new EventEmitter<number>();

  trackByStudentId(_index: number, student: Student): number {
    return student.id;
  }
}
