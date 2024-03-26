import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramaComponent } from './OdontogramaComponent';

describe('OdontogramaComponent', () => {
  let component: OdontogramaComponent;
  let fixture: ComponentFixture<OdontogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdontogramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdontogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
