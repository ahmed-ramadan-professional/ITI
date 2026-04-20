# Student Management System

Student Management System built with Angular standalone components, routing, shared state management, and responsive UI patterns.

<!-- Repository : https://github.com/ahmed-ramadan-professional/ITI/tree/main/Angular/Lab-5 -->
<!-- Live Demo  : https://ahmed-ramadan-professional.github.io/ITI/Angular/Lab-5/dist/Lab-5/browser/index.html -->

[![Repository](https://img.shields.io/badge/Repository-GitHub-181717?logo=github)](https://github.com/ahmed-ramadan-professional/ITI/tree/main/Angular/Lab-5)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Github%20Pages-brightgreen)](https://ahmed-ramadan-professional.github.io/ITI/Angular/Lab-5/dist/Lab-5/browser/index.html)

## Overview

This project is a small Student Management System built with Angular to manage student records through a clean single-page experience. The application allows users to view students, inspect detailed records, add new students, update existing records, delete records, and work with filtered or searched results.

The implementation focuses on Angular fundamentals rather than backend integration, so the application uses an in-memory shared service to manage data during the current session. This keeps the project lightweight while still showing component communication, reactive state updates, and routing behavior clearly.

## Highlights

- Multi-page Angular application using standalone components
- Shared student state managed through a service with `BehaviorSubject`
- Reactive student list rendering using `Observable` and async pipe
- Parent/child communication with `@Input` and `@Output`
- Add, edit, delete, and view-details flows
- Search by student name
- Filter by department
- Responsive layout for desktop and mobile screens
- Custom-styled dropdown component for a more consistent UI

## Features

### Student Management

- Display all students in a structured table
- Show important information directly in the list view, including gender and active status
- View full student information on a dedicated details page
- Add new student records using a validated form
- Edit existing student records through the same form flow
- Delete students from the shared store

### Search and Filtering

- Search students by first or last name
- Filter students by department
- Clear filters quickly from the students page
- Show filtered-result counts and improved empty states

### Form Validation

- Required-field validation
- Length validation for text fields
- Numeric range validation for age, level, and GPA
- Email format validation with whitespace rejection
- Phone validation using an Egyptian mobile number pattern
- Validation messages shown on touch and on submit

### UI and UX

- Responsive navigation with Angular-driven mobile menu toggle
- Dashboard-like home page with live stats from the student store
- Consistent button hierarchy across pages
- Status badges for active and inactive students
- Custom favicon and improved document title

## Routing

The application uses Angular Router with the following routes:

- `/home` - landing page and quick overview
- `/students` - table view of all student records
- `/add-student` - form for creating a new student
- `/edit-student/:id` - form for updating an existing student
- `/student/:id` - detailed student profile page

## Architecture

### Shared Service

`StudentsService` is the central data source for the application. It stores the current student list inside a private `BehaviorSubject` and exposes it as a public `Observable`, allowing multiple components to react automatically to state changes.

### Component Communication

- `StudentsComponent` passes student data to `StudentTableComponent` using `@Input`
- `StudentTableComponent` sends user actions back to the parent using `@Output`
- The add/edit form updates the shared service, which refreshes the list automatically

### Data Flow

1. Student data is initialized in `StudentsService`
2. Components subscribe to the exposed observable stream
3. Add, edit, and delete actions update the shared state
4. The UI reflects changes automatically through Angular bindings and the async pipe

## Technologies Used

- Angular
- TypeScript
- RxJS
- Bootstrap
- Font Awesome

## Project Structure

```text
src/
  app/
    add-student/
    custom-select/
    home/
    models/
    navbar/
    services/
    student-details/
    student-table/
    students/
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm start
```

After the dev server starts, open:

```text
http://localhost:4200/
```

## Build Commands

### Standard Production Build

```bash
npm run build
```

### GitHub Pages Build

This repository is nested inside a larger GitHub repository, so GitHub Pages requires a custom base href.

```bash
npm run build:pages
```

That command builds the project using:

```text
/ITI/Angular/Lab-5/dist/Lab-5/browser/
```

The generated output is written to:

```text
dist/Lab-5
```

## Current Data Source

The application starts with sample student records defined in `StudentsService`. Data is stored in memory for the current runtime session, which means refreshing the application resets the list back to the initial sample state.

## Author

Ahmed Ramadan
