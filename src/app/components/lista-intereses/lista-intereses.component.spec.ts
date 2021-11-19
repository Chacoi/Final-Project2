import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInteresesComponent } from './lista-intereses.component';

describe('ListaInteresesComponent', () => {
  let component: ListaInteresesComponent;
  let fixture: ComponentFixture<ListaInteresesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaInteresesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInteresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
