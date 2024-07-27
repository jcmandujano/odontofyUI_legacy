import { Component } from '@angular/core';

export interface PeriodicElement {
  id: number;
  createdAt: string;
  consent: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, createdAt: '15/06/2024', consent: 'Consentimiento de cirugua menor' }
];

@Component({
  selector: 'app-consentimientos',
  templateUrl: './consentimientos.component.html',
  styleUrls: ['./consentimientos.component.scss']
})
export class ConsentimientosComponent {
  displayedColumns: string[] = ['id', 'consent', 'date', 'actions'];
  spinner= false
  dataSource = ELEMENT_DATA;
  constructor(){}

  createConsentDialog(){}
}
