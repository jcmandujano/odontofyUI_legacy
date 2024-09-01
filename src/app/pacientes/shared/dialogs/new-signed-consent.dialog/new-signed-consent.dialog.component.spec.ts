import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSignedConsentDialogComponent } from './new-signed-consent.dialog.component';

describe('NewSignedConsentDialogComponent', () => {
  let component: NewSignedConsentDialogComponent;
  let fixture: ComponentFixture<NewSignedConsentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSignedConsentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSignedConsentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
