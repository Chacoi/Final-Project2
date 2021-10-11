import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscusionComponent } from './add-discusion.component';

describe('AddDiscusionComponent', () => {
  let component: AddDiscusionComponent;
  let fixture: ComponentFixture<AddDiscusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiscusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
