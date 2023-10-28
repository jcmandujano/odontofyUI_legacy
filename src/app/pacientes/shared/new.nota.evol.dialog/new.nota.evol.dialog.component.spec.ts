import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNotaEvolDialogComponent } from './new.nota.evol.dialog.component';

describe('NewNotaEvolDialogComponent', () => {
  let component: NewNotaEvolDialogComponent;
  let fixture: ComponentFixture<NewNotaEvolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNotaEvolDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewNotaEvolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
