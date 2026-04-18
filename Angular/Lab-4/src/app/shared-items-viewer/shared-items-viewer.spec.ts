import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedItemsViewerComponent } from './shared-items-viewer.component';

describe('SharedItemsViewerComponent', () => {
  let component: SharedItemsViewerComponent;
  let fixture: ComponentFixture<SharedItemsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedItemsViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedItemsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
