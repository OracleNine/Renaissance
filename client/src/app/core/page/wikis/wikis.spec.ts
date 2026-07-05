import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wikis } from './wikis';

describe('Wikis', () => {
  let component: Wikis;
  let fixture: ComponentFixture<Wikis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wikis],
    }).compileComponents();

    fixture = TestBed.createComponent(Wikis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
