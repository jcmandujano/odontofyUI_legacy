import {Component, ElementRef, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NewNotaEvolDialogComponent } from '../shared/dialogs/new.nota.evol.dialog/new.nota.evol.dialog.component';
import { NotasService } from 'src/app/services/notas-evolucion/notas.evolucion.service';
import { NotaEvolucion } from 'src/app/services/notas-evolucion/notas.evolucion.model';
import { ConfirmDialogComponent } from '../shared/dialogs/confirm.dialog/confirm.dialog.component';

@Component({
  selector: 'app-notas-evolucion',
  templateUrl: './notas-evolucion.component.html',
  styleUrls: ['./notas-evolucion.component.scss']
})
export class NotasEvolucionComponent {
  displayedColumns: string[] = ['id', 'fecha', 'nota', 'actions'];
  dataSource: NotaEvolucion[];
  spinner= false
  notasList: NotaEvolucion[] = []
  paginator: any
  pacienteId: any
  searchCriteria: string
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, 
    private notasService: NotasService, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private elementRef: ElementRef) {
      this.matIconRegistry.addSvgIcon(
        "pacientes",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/dashboard_user.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "iniciaCita",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/dashboard_init_cita.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "editaCita",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/dashboard_edit_cita.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "eliminaCita",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/dashboard_delete_cita.svg")
      );
    }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
  }

  ngOnInit(){
    this.pacienteId = this.route.snapshot.paramMap.get('id');
    this.listarNotas()
  }

  listarNotas(){
    this.spinner = true
    this.notasService.listarNotas(this.pacienteId).subscribe(data=>{
      this.notasList = data.notes
      this.dataSource = this.notasList
      this.spinner = false
    },(error)=>{
      this.spinner = false
      console.log('ERROR', error.error.error.message)
      this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
    })
  }

  searchByCriteria(criteria: string){
    this.spinner = true
    this.notasService.buscarNotas(this.pacienteId, criteria).subscribe(data=>{
      this.notasList = data
      this.dataSource = this.notasList
      this.spinner = false
    },(error)=>{
      this.spinner = false
      console.log('ERROR', error.error.error.message)
      this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
    })
  }

  createNota(response: any){
    const newNota = new NotaEvolucion()
    newNota.patient_id = this.pacienteId
    newNota.note = response.noteContent
    this.spinner = true
    this.notasService.crearNota(this.pacienteId, newNota).subscribe(data=>{
      this.listarNotas()
      this.spinner = false
    },(error)=>{
      this.spinner = false
      console.log('ERROR', error.error.error.message)
      this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
    })
  }

  editarNota(idNota: any, response: any){
    const newNota = new NotaEvolucion()
    newNota.patient_id = this.pacienteId
    newNota.note = response.noteContent
    this.spinner = true
     this.notasService.actualizaNota(this.pacienteId, idNota, newNota).subscribe(data=>{
      this.listarNotas()
      this.spinner = false
    },(error)=>{
      this.spinner = false
      this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
    })
  }

  clearCriteria(){
    this.searchCriteria = ''
    this.listarNotas()
  }

  editarNotaDialog(nota: NotaEvolucion){
    const dialogRef = this.dialog.open(NewNotaEvolDialogComponent, {
      width: '40vw',
      height: '50vh',
      data: nota
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.editarNota(nota.id, result)
      }
    });
  }

  onEnterKey(event: any) {
    if (event.key === 'Enter') {
      this.searchByCriteria(this.searchCriteria)
    }
  }

  eliminarNota(id:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Nota',
        message: '¿Seguro que quieres eliminar esta nota?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.spinner = true
        this.notasService.eliminaNota(this.pacienteId, id).subscribe(data=>{
          this.listarNotas()
          this.spinner = false
        },(error)=>{
          this.spinner = false
          this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
        })
      }
    });
    
  }

  creaNotaDialog(){
    const dialogRef = this.dialog.open(NewNotaEvolDialogComponent, {
      width: '40vw',
      height: '50vh',
      panelClass: 'custom-dialog-container' 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.createNota(result)
      }
    });
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
