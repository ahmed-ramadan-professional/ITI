import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedItemsService } from '../services/shared-items.service';

@Component({
  selector: 'app-shared-items-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-items-viewer.html',
  styleUrl: './shared-items-viewer.css',
})
export class SharedItemsViewerComponent implements OnInit, OnDestroy {
  sharedItems: string[] = [];
  private itemsSubscription?: Subscription;

  constructor(private readonly sharedItemsService: SharedItemsService) {}

  ngOnInit(): void {
    this.itemsSubscription = this.sharedItemsService.items$.subscribe((items) => {
      this.sharedItems = items;
    });
  }

  ngOnDestroy(): void {
    this.itemsSubscription?.unsubscribe();
  }
}
