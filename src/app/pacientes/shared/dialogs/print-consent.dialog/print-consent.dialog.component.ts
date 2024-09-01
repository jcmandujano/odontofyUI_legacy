import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InformedConsent } from 'src/app/services/informed-consent/informed.consent.model';

@Component({
  selector: 'app-print-consent.dialog',
  templateUrl: './print-consent.dialog.component.html',
  styleUrls: ['./print-consent.dialog.component.scss']
})
export class PrintConsentDialogComponent {
  informedConsent = new FormControl('');
  informedConsentList :InformedConsent[] = []
  constructor(
    public dialogRef: MatDialogRef<PrintConsentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any){
      if(dialogData){
        this.informedConsentList = dialogData
      }
  }

  onSave(): void {
      const data = {
        filename: this.informedConsent.getRawValue()
      }
      this.dialogRef.close(data);
    }

  cancel(){
    this.dialogRef.close()
  }
}
