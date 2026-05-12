import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Llistat } from './llistat';

describe('Llistat', () => {
  let component: Llistat;
  let fixture: ComponentFixture<Llistat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Llistat],
    }).compileComponents();

    fixture = TestBed.createComponent(Llistat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
