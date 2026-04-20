import { Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { HomeComponent } from './home/home.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsComponent } from './students/students.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: AddStudentComponent },
  { path: 'student/:id', component: StudentDetailsComponent },
  { path: '**', redirectTo: 'home' },
];
