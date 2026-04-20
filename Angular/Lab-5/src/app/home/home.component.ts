import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StudentsService } from '../services/students.service';

interface HomeStat {
  label: string;
  value: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  readonly stats$: Observable<HomeStat[]>;

  constructor(private readonly studentsService: StudentsService) {
    this.stats$ = this.studentsService.students$.pipe(
      map((students) => {
        const departments = new Set(students.map((student) => student.department.trim()).filter(Boolean));
        const activeStudents = students.filter((student) => student.isActive).length;
        const averageGpa =
          students.length > 0
            ? (students.reduce((sum, student) => sum + student.gpa, 0) / students.length).toFixed(1)
            : '0.0';

        return [
          { label: 'Total students', value: String(students.length) },
          { label: 'Departments', value: String(departments.size) },
          { label: 'Active students', value: String(activeStudents) },
          { label: 'Average GPA', value: averageGpa },
        ];
      }),
    );
  }
}
