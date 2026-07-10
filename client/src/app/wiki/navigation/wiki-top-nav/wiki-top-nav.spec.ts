import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiTopNav } from './wiki-top-nav';

describe('WikiTopNav', () => {
  let component: WikiTopNav;
  let fixture: ComponentFixture<WikiTopNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WikiTopNav],
    }).compileComponents();

    fixture = TestBed.createComponent(WikiTopNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
