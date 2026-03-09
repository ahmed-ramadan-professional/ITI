import { Component } from '@angular/core';
import { ProfileCard } from './profile-card/profile-card';
import { ProjectCard } from './project-card/project-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCard, ProjectCard],
  templateUrl: './app.html',
})
export class App {}
