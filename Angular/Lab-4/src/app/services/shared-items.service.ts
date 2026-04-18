import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedItemsService {
  private readonly itemsSubject = new BehaviorSubject<string[]>(['Ahmed Ramadan']);

  readonly items$: Observable<string[]> = this.itemsSubject.asObservable();

  addItem(item: string): void {
    const trimmedItem = item.trim();

    if (!trimmedItem) {
      return;
    }

    this.itemsSubject.next([...this.itemsSubject.value, trimmedItem]);
  }
}
