import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInteresComponent } from './add-interes.component';

describe('AddInteresComponent', () => {
  let component: AddInteresComponent;
  let fixture: ComponentFixture<AddInteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInteresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
