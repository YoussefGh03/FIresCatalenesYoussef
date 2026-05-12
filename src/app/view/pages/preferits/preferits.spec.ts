import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Preferits } from './preferits';

describe('Preferits', () => {
  let component: Preferits;
  let fixture: ComponentFixture<Preferits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Preferits],
    }).compileComponents();

    fixture = TestBed.createComponent(Preferits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
