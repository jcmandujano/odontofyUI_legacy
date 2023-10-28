import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientePacienteComponent } from './expediente-paciente.component';

describe('ExpedientePacienteComponent', () => {
  let component: ExpedientePacienteComponent;
  let fixture: ComponentFixture<ExpedientePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedientePacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedientePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
