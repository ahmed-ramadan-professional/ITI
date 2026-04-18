import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedItemsService } from '../services/shared-items.service';

@Component({
  selector: 'app-item-composer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-composer.html',
  styleUrl: './item-composer.css',
})
export class ItemComposerComponent implements OnInit, OnDestroy {
  draftItem = '';
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

  addItem(): void {
    this.sharedItemsService.addItem(this.draftItem);
    this.draftItem = '';
  }
}
