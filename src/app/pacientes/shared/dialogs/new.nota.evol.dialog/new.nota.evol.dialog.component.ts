import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotaEvolucion } from 'src/app/services/notas-evolucion/notas.evolucion.model';

@Component({
  selector: 'app-new.nota.evol.dialog',
  templateUrl: './new.nota.evol.dialog.component.html',
  styleUrls: ['./new.nota.evol.dialog.component.scss']
})
export class NewNotaEvolDialogComponent {
  creationDate: Date
  noteContent: string
  constructor(
    public dialogRef: MatDialogRef<NewNotaEvolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotaEvolucion,
  ) {
    if(data){
      this.creationDate = new Date(data.createdAt)
      this.noteContent = data.note
    }else{
      this.creationDate = new Date()
    }
  }

  onSave(): void {
    const data = {
      creationDate: this.creationDate.toISOString(),
      noteContent: this.noteContent
    }
    this.dialogRef.close(data);
  }

  isoToDate(fechaISO: string) {
    const partes = fechaISO.split('T')[0].split('-');
    const año = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    const formatoPersonalizado = `${mes}-${dia}-${año}`;
    return formatoPersonalizado;
  }

  cancel(){
    this.dialogRef.close()
  }
}
