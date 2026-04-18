# Angular Lab 4

## Links

<!-- Repository : https://github.com/ahmed-ramadan-professional/ITI/tree/main/Angular/Lab-4 -->
<!-- Live Demo  : https://ahmed-ramadan-professional.github.io/ITI/Angular/Lab-4/dist/Lab-4/browser/index.html -->

- [![Repository](https://img.shields.io/badge/Repository-GitHub-181717?logo=github)](https://github.com/ahmed-ramadan-professional/ITI/tree/main/Angular/Lab-4)

- [![Live Demo](https://img.shields.io/badge/Live%20Demo-Github%20Pages-brightgreen)](https://ahmed-ramadan-professional.github.io/ITI/Angular/Lab-4/dist/Lab-4/browser/index.html)

## Task

Create a shared service that holds an array of data and is used between two components.

## Requirements

- Shared service with a private `BehaviorSubject`
- Public `Observable` exposed with `asObservable()`
- Two standalone components using the same service
- Subscription inside `ngOnInit`
- Cleanup inside `ngOnDestroy`
- Method to add new items to the array
- Updates reflected in both components
