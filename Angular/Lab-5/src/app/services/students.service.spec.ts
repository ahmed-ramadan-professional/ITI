import { TestBed } from '@angular/core/testing';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let service: StudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsService);
  });

  it('should add a new student', () => {
    service.addStudent({
      firstName: 'Sara',
      lastName: 'Adel',
      age: 19,
      gender: 'Female',
      email: 'sara.adel@email.com',
      phone: '01011112222',
      address: '7 Garden Street',
      city: 'Cairo',
      country: 'Egypt',
      department: 'Networks',
      level: 1,
      gpa: 3.1,
      enrollmentDate: '2025-09-01',
      isActive: true,
    });

    let studentsCount = 0;
    const subscription = service.students$.subscribe((students) => {
      studentsCount = students.length;
    });

    expect(studentsCount).toBe(4);
    subscription.unsubscribe();
  });
}
