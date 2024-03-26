import { Component, ElementRef } from '@angular/core';
export interface Payment {
  id: string;
  fechaPago: string;
  total: number;
  ingreso: number;
  adeudo: number
}

const ELEMENT_DATA: Payment[] = [
  {id: '1', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
  {id: '2', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
  {id: '3', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
  {id: '4', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
  {id: '5', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
  {id: '6', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
  {id: '7', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
  {id: '8', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
  {id: '9', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
  {id: '10', fechaPago: '21 oct 2023', total: 0, ingreso: 0, adeudo: 0},
];

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.scss']
})
export class HistorialPagosComponent {
  displayedColumns: string[] = ['id', 'fecha', 'total', 'ingreso', 'adeudo', 'actions'];
  dataSource = ELEMENT_DATA;
  constructor(private elementRef: ElementRef){}
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
  }

}
