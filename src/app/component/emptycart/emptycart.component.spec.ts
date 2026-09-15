import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptycartComponent } from './emptycart.component';

describe('EmptycartComponent', () => {
  let component: EmptycartComponent;
  let fixture: ComponentFixture<EmptycartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptycartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptycartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
