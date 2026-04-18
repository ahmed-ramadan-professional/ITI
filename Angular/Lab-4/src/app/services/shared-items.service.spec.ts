import { TestBed } from '@angular/core/testing';
import { SharedItemsService } from './shared-items.service';

describe('SharedItemsService', () => {
  let service: SharedItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedItemsService);
  });

  it('should add a new item to the shared array', () => {
    service.addItem('Angular services are shared');

    let latestItems: string[] = [];
    const subscription = service.items$.subscribe((items) => {
      latestItems = items;
    });

    expect(latestItems).toContain('Angular services are shared');
    subscription.unsubscribe();
  });
});
