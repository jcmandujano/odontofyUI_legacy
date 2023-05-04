import {SelectionModel} from '@angular/cdk/collections';
import {Component, ElementRef, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
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
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private elementRef: ElementRef) {
      this.matIconRegistry.addSvgIcon(
        "pacientes",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/dashboard_user.svg")
      );
    }
    displayedColumns: string[] = ['select', 'id', 'nombre', 'ingreso', 'adeudo', 'prox_cita'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit(): void {
  }

}
