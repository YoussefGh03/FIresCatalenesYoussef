import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detall } from './detall';

describe('Detall', () => {
  let component: Detall;
  let fixture: ComponentFixture<Detall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detall],
    }).compileComponents();

    fixture = TestBed.createComponent(Detall);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
