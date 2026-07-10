import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiSideNav } from './wiki-side-nav';

describe('WikiSideNav', () => {
  let component: WikiSideNav;
  let fixture: ComponentFixture<WikiSideNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WikiSideNav],
    }).compileComponents();

    fixture = TestBed.createComponent(WikiSideNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
