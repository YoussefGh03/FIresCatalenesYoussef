import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fires } from './fires';

describe('Fires', () => {
  let component: Fires;
  let fixture: ComponentFixture<Fires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fires],
    }).compileComponents();

    fixture = TestBed.createComponent(Fires);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
