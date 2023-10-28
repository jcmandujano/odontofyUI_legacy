import {SelectionModel} from '@angular/cdk/collections';
import {Component, ElementRef, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/services/pacientes/pacientes.model';
import { PacientesService } from 'src/app/services/pacientes/pacientes.services';
import { ConfirmDialogComponent } from '../shared/confirm.dialog/confirm.dialog.component';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'ingreso', 'adeudo', 'prox_cita', 'actions'];
  dataSource = new MatTableDataSource<Paciente>();
  spinner= false
  pacientesList: Paciente[] = []
  paginator: any
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, 
    private pacientesService: PacientesService, 
    private snackBar: MatSnackBar,
    private router: Router,
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

  ngOnInit(): void {
    this.recuperaPacientes()
  }

  recuperaPacientes(){
    this.spinner = true
    this.pacientesService.listarPacientes().subscribe(data=>{
      this.pacientesList = data.data
      this.paginator = data.meta
      this.dataSource.data = this.pacientesList
      this.spinner = false
    },(error)=>{
      this.spinner = false
      console.log('ERROR', error.error.error.message)
      this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
    })
  }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#ffffff';
}

  //send to create new patient
  crearPaciente(){
    this.router.navigate(['/crea-pacientes'])
  }

  editarPaciente(pacienteId: any){
    this.router.navigate(['/crea-pacientes', { id: pacienteId  }])
  }

  goToExpediente(pacienteId: any){
    this.router.navigate(['/expediente', { id: pacienteId  }])
  }

  eliminaPaciente(pacienteId: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Paciente',
        message: '¿Seguro que quieres eliminar a este paciente?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.pacientesService.eliminaPaciente(pacienteId).subscribe(data=>{
          this.openSnackbar('Se elimino la informacion correctamente', 'Ok')
          this.recuperaPacientes()
          this.spinner = false
        },(error)=>{
          this.spinner = false
          console.log('ERROR', error.error.error.message)
          this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
        })
      }
    });
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
