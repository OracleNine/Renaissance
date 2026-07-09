import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWiki } from './create-wiki';

describe('CreateWiki', () => {
  let component: CreateWiki;
  let fixture: ComponentFixture<CreateWiki>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWiki],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateWiki);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
