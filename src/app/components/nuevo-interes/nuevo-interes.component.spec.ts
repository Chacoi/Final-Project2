import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoInteresComponent } from './nuevo-interes.component';

describe('NuevoInteresComponent', () => {
  let component: NuevoInteresComponent;
  let fixture: ComponentFixture<NuevoInteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoInteresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoInteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
