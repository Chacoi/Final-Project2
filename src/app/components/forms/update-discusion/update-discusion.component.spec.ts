import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiscusionComponent } from './update-discusion.component';

describe('UpdateDiscusionComponent', () => {
  let component: UpdateDiscusionComponent;
  let fixture: ComponentFixture<UpdateDiscusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDiscusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiscusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
