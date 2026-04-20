import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { CustomSelectComponent, SelectOption } from '../custom-select/custom-select.component';
import { Student } from '../models/student';
import { StudentsService } from '../services/students.service';
import { StudentTableComponent } from '../student-table/student-table.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, StudentTableComponent, CustomSelectComponent],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class StudentsComponent {
  searchTerm = '';
  selectedDepartment = '';

  private readonly searchTermSubject = new BehaviorSubject<string>('');
  private readonly departmentSubject = new BehaviorSubject<string>('');

  readonly students$: Observable<Student[]>;
  readonly departments$: Observable<SelectOption[]>;
  readonly totalStudents$: Observable<number>;

  constructor(
    private readonly studentsService: StudentsService,
    private readonly router: Router,
  ) {
    this.students$ = combineLatest([
      this.studentsService.students$,
      this.searchTermSubject,
      this.departmentSubject,
    ]).pipe(
      map(([students, searchTerm, selectedDepartment]) => {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();
        const normalizedDepartment = selectedDepartment.trim().toLowerCase();

        return students.filter((student) => {
          const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
          const matchesName = !normalizedSearchTerm || fullName.includes(normalizedSearchTerm);
          const matchesDepartment =
            !normalizedDepartment || student.department.toLowerCase() === normalizedDepartment;

          return matchesName && matchesDepartment;
        });
      }),
    );

    this.departments$ = this.studentsService.students$.pipe(
      map((students) =>
        [
          { label: 'All Departments', value: '' },
          ...[...new Set(students.map((student) => student.department.trim()).filter(Boolean))]
            .sort()
            .map((department) => ({ label: department, value: department })),
        ],
      ),
    );

    this.totalStudents$ = this.studentsService.students$.pipe(map((students) => students.length));
  }

  onViewStudent(id: number): void {
    this.router.navigate(['/student', id]);
  }

  onEditStudent(id: number): void {
    this.router.navigate(['/edit-student', id]);
  }

  onDeleteStudent(id: number): void {
    const shouldDelete = window.confirm('Delete this student?');
    if (shouldDelete) {
      this.studentsService.deleteStudent(id);
    }
  }

  onSearchChange(): void {
    this.searchTermSubject.next(this.searchTerm);
  }

  onDepartmentChange(): void {
    this.departmentSubject.next(this.selectedDepartment);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.searchTermSubject.next('');
    this.departmentSubject.next('');
  }

  get hasActiveFilters(): boolean {
    return !!this.searchTerm.trim() || !!this.selectedDepartment.trim();
  }
}
