import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalblogComponent } from './journalblog.component';

describe('JournalblogComponent', () => {
  let component: JournalblogComponent;
  let fixture: ComponentFixture<JournalblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
