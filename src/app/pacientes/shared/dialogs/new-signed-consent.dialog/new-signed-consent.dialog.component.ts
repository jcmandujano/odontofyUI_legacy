import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformedConsent } from 'src/app/services/informed-consent/informed.consent.model';
import { Paciente } from 'src/app/services/pacientes/pacientes.model';
import { User } from 'src/app/services/user/user.model';

@Component({
  selector: 'app-new-signed-consent.dialog',
  templateUrl: './new-signed-consent.dialog.component.html',
  styleUrls: ['./new-signed-consent.dialog.component.scss']
})
export class NewSignedConsentDialogComponent {
patientName = new FormControl({ value: '', disabled: true });
informedConsent = new FormControl('');
informedConsentList :InformedConsent[] = []
files: File[] = [];
currentPatient: Paciente
constructor(public dialogRef: MatDialogRef<NewSignedConsentDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public dialogData: any){
    if(dialogData){
      this.informedConsentList = dialogData.informedConsentList
      this.currentPatient = dialogData.patient
      this.patientName.setValue(this.buildPatientFullName(this.currentPatient))
    }
}

onSelect(event: any) {
  //de aqui subir a una nube, obtener el url y pasarlo de regreso
  this.files.push(...event.addedFiles);
}

onRemove(event: any) {
  this.files.splice(this.files.indexOf(event), 1);
}

onSave(): void { 
  const payloadResponse = {
    consent_id: this.informedConsent.value,
    patient_id: this.currentPatient.id,
    file_url: 'https://example.com/signed-consent.pdf'
  }
  
  this.dialogRef.close(payloadResponse);
}

cancel(){
  this.dialogRef.close()
}

buildPatientFullName(userData: User): string{    
  const firstname = userData.name != undefined ? userData.name :  ''   
  const middleName = userData.middle_name != undefined ? userData.middle_name :  '' 
  const lastName = userData.last_name != undefined ? userData.last_name :  '' 
  return firstname.concat(' ').concat(middleName).concat(' ').concat(lastName)
}

}
