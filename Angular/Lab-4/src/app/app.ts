import { Component } from '@angular/core';
import { ItemComposerComponent } from './item-composer/item-composer.component';
import { SharedItemsViewerComponent } from './shared-items-viewer/shared-items-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemComposerComponent, SharedItemsViewerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
