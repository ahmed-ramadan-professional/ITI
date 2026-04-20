import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomSelectComponent, SelectOption } from '../custom-select/custom-select.component';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CustomSelectComponent],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css',
})
export class AddStudentComponent {
  formSubmitted = false;
  isEditMode = false;
  readonly maxEnrollmentDate = new Date().toISOString().split('T')[0];
  readonly genderOptions: SelectOption[] = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];
  private editingStudentId?: number;
  private readonly trimmableFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'address',
    'city',
    'country',
    'department',
    'enrollmentDate',
  ] as const;

  studentForm = {
    firstName: '',
    lastName: '',
    age: 18,
    gender: 'Male',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Egypt',
    department: '',
    level: 1,
    gpa: 2,
    enrollmentDate: '',
    isActive: true,
  };

  constructor(
    private readonly studentsService: StudentsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isNaN(studentId) && studentId > 0) {
      const student = this.studentsService.getStudentById(studentId);

      if (student) {
        this.isEditMode = true;
        this.editingStudentId = student.id;
        this.studentForm = {
          firstName: student.firstName,
          lastName: student.lastName,
          age: student.age,
          gender: student.gender,
          email: student.email,
          phone: student.phone,
          address: student.address,
          city: student.city,
          country: student.country,
          department: student.department,
          level: student.level,
          gpa: student.gpa,
          enrollmentDate: student.enrollmentDate,
          isActive: student.isActive,
        };
      }
    }
  }

  submitForm(studentFormRef: NgForm): void {
    this.formSubmitted = true;

    if (studentFormRef.invalid) {
      return;
    }

    const formattedStudent = {
      ...this.studentForm,
      firstName: this.studentForm.firstName.trim(),
      lastName: this.studentForm.lastName.trim(),
      department: this.studentForm.department.trim(),
      email: this.studentForm.email.trim(),
      phone: this.studentForm.phone.trim(),
      address: this.studentForm.address.trim(),
      city: this.studentForm.city.trim(),
      country: this.studentForm.country.trim(),
      enrollmentDate: this.studentForm.enrollmentDate,
    };

    if (this.isEditMode && this.editingStudentId) {
      this.studentsService.updateStudent(this.editingStudentId, formattedStudent);
    } else {
      this.studentsService.addStudent(formattedStudent);
    }

    this.router.navigate(['/students']);
  }

  shouldShowError(control: NgModel): boolean {
    return !!control.invalid && (control.touched || this.formSubmitted);
  }

  trimField(field: (typeof this.trimmableFields)[number]): void {
    this.studentForm[field] = this.studentForm[field].trim();
  }

  getErrorMessage(fieldName: string, control: NgModel): string {
    if (!control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return `${fieldName} is required.`;
    }

    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `${fieldName} must be at least ${requiredLength} characters.`;
    }

    if (control.errors['maxlength']) {
      const requiredLength = control.errors['maxlength'].requiredLength;
      return `${fieldName} must be at most ${requiredLength} characters.`;
    }

    if (control.errors['pattern']) {
      switch (fieldName) {
        case 'First name':
        case 'Last name':
          return `${fieldName} can only contain letters.`;
        case 'Department':
        case 'City':
        case 'Country':
          return `${fieldName} can only contain letters and spaces.`;
        case 'Email':
          return 'Email must be in a valid format and cannot contain spaces.';
        case 'Phone':
          return 'Phone must be a valid Egyptian mobile number.';
        default:
          return `${fieldName} format is invalid.`;
      }
    }

    if (control.errors['email']) {
      return 'Please enter a valid email address.';
    }

    if (control.errors['min']) {
      return `${fieldName} is below the allowed minimum.`;
    }

    if (control.errors['max']) {
      return `${fieldName} is above the allowed maximum.`;
    }

    return `${fieldName} is invalid.`;
  }
}
