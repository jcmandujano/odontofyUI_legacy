import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentimientosComponent } from './consentimientos.component';

describe('ConsentimientosComponent', () => {
  let component: ConsentimientosComponent;
  let fixture: ComponentFixture<ConsentimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsentimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
