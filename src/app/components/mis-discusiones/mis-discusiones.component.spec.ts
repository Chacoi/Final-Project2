import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDiscusionesComponent } from './mis-discusiones.component';

describe('MisDiscusionesComponent', () => {
  let component: MisDiscusionesComponent;
  let fixture: ComponentFixture<MisDiscusionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisDiscusionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisDiscusionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
