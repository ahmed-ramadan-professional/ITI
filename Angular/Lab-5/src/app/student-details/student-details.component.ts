import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Student } from '../models/student';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetailsComponent {
  student?: Student;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly studentsService: StudentsService,
  ) {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.student = this.studentsService.getStudentById(studentId);
  }
}
