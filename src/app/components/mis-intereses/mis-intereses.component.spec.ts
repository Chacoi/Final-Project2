import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisInteresesComponent } from './mis-intereses.component';

describe('MisInteresesComponent', () => {
  let component: MisInteresesComponent;
  let fixture: ComponentFixture<MisInteresesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisInteresesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisInteresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
