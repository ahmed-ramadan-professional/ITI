import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private readonly studentsSubject = new BehaviorSubject<Student[]>([
    {
      id: 1,
      firstName: 'Ali',
      lastName: 'Hassan',
      age: 21,
      gender: 'Male',
      email: 'ali.hassan@email.com',
      phone: '01000000000',
      address: '12 Main Street',
      city: 'Cairo',
      country: 'Egypt',
      department: 'Computer Science',
      level: 3,
      gpa: 3.2,
      enrollmentDate: '2023-09-01',
      isActive: true,
    },
    {
      id: 2,
      firstName: 'Mona',
      lastName: 'Ibrahim',
      age: 22,
      gender: 'Female',
      email: 'mona.ibrahim@email.com',
      phone: '01112223334',
      address: '45 Nile Street',
      city: 'Giza',
      country: 'Egypt',
      department: 'Information Systems',
      level: 4,
      gpa: 3.6,
      enrollmentDate: '2022-09-15',
      isActive: true,
    },
    {
      id: 3,
      firstName: 'Omar',
      lastName: 'Samir',
      age: 20,
      gender: 'Male',
      email: 'omar.samir@email.com',
      phone: '01234567890',
      address: '8 University Road',
      city: 'Alexandria',
      country: 'Egypt',
      department: 'Software Engineering',
      level: 2,
      gpa: 2.9,
      enrollmentDate: '2024-02-01',
      isActive: false,
    },
  ]);

  readonly students$: Observable<Student[]> = this.studentsSubject.asObservable();

  addStudent(student: Omit<Student, 'id'>): void {
    const currentStudents = this.studentsSubject.value;
    const nextId = currentStudents.length
      ? Math.max(...currentStudents.map((currentStudent) => currentStudent.id)) + 1
      : 1;

    this.studentsSubject.next([...currentStudents, { ...student, id: nextId }]);
  }

  updateStudent(id: number, updatedStudent: Omit<Student, 'id'>): void {
    const updatedStudents = this.studentsSubject.value.map((student) =>
      student.id === id ? { ...updatedStudent, id } : student,
    );

    this.studentsSubject.next(updatedStudents);
  }

  deleteStudent(id: number): void {
    this.studentsSubject.next(this.studentsSubject.value.filter((student) => student.id !== id));
  }

  getStudentById(id: number): Student | undefined {
    return this.studentsSubject.value.find((student) => student.id === id);
  }
}
