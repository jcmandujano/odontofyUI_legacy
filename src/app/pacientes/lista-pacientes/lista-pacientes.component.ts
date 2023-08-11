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

export interface PeriodicElement {
  position: string;
  name: string;
  registro: string;
  adeudo: number;
  proximaCita: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: '00001', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
  {position: '00002', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
  {position: '00003', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
  {position: '00004', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
  {position: '00005', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
  {position: '00006', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
  {position: '00007', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
  {position: '00008', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
  {position: '00009', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
  {position: '00010', name: 'Nombre del Paciente', registro: '00/00/0000', adeudo: 200, proximaCita: '00/00/0000'},
];
@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'ingreso', 'adeudo', 'prox_cita', 'actions'];
  dataSource = new MatTableDataSource<Paciente>();
  selection = new SelectionModel<Paciente>(true, []);
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
      console.log('List pacientes', this.pacientesList)
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Paciente): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  //send to create new patient
  crearPaciente(){
    this.router.navigate(['/crea-pacientes'])
  }

  editarPaciente(pacienteId: any){
    this.router.navigate(['/crea-pacientes', { id: pacienteId  }])
  }

  eliminaPaciente(pacienteId: any){
    console.log('ELIMINA PACIENTE')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
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
