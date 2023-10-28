import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { interceptorProviders  } from '../services/utils/interceptor.service'
import { CrearPacientesComponent } from './crear-pacientes/crear-pacientes.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { NavBarComponent } from '../nav-bar/nav-bar/nav-bar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import {LOCALE_ID } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './shared/confirm.dialog/confirm.dialog.component';
import { ExpedientePacienteComponent } from './expediente-paciente/expediente-paciente.component';
import { NotasEvolucionComponent } from './notas-evolucion/notas-evolucion.component';
import { NewNotaEvolDialogComponent } from './shared/new.nota.evol.dialog/new.nota.evol.dialog.component';


registerLocaleData(localeEs, 'es');
const routes: Routes = [
  {   path: 'expediente',   component: ExpedientePacienteComponent   },
  {   path: 'crea-pacientes',   component: CrearPacientesComponent   },
  {   path: 'lista-pacientes',   component: ListaPacientesComponent   },
  {   path: 'notas-evolucion',   component: NotasEvolucionComponent   },
];

@NgModule({
  declarations: [CrearPacientesComponent, 
    ListaPacientesComponent, 
    NavBarComponent, 
    ConfirmDialogComponent, 
    ExpedientePacienteComponent, 
    NotasEvolucionComponent, NewNotaEvolDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [interceptorProviders, { provide: LOCALE_ID, useValue: 'es-MX' }],
  exports: []
})
export class PacientesModule { }
