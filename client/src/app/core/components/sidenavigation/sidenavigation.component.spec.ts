import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavigationComponent } from './sidenavigation.component';

describe('SidenavigationComponent', () => {
  let component: SidenavigationComponent;
  let fixture: ComponentFixture<SidenavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavigationComponent],
      imports: [MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
