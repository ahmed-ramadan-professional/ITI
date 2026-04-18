import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComposerComponent } from './item-composer.component';

describe('ItemComposerComponent', () => {
  let component: ItemComposerComponent;
  let fixture: ComponentFixture<ItemComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComposerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
