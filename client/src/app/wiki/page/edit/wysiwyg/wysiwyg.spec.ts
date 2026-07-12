import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wysiwyg } from './wysiwyg';

describe('Wysiwyg', () => {
  let component: Wysiwyg;
  let fixture: ComponentFixture<Wysiwyg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wysiwyg],
    }).compileComponents();

    fixture = TestBed.createComponent(Wysiwyg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
