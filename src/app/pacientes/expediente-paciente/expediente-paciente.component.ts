import { Component, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/services/pacientes/pacientes.model';
import { PacientesService } from 'src/app/services/pacientes/pacientes.services';
import { SessionStorageService } from 'src/app/services/utils/session-storage.service';

@Component({
  selector: 'app-expediente-paciente',
  templateUrl: './expediente-paciente.component.html',
  styleUrls: ['./expediente-paciente.component.scss']
})
export class ExpedientePacienteComponent {
  pacienteId: any
  paciente: Paciente
  spinner= false
  constructor(private sessionService : SessionStorageService,
     private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private matIconRegistry: MatIconRegistry,
    private pacientesService: PacientesService,
    private snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        "settings",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/settings_dashboard.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "logout",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/logout_dashboard.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "agenda",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/dashboard_agenda.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "agendaDot",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/agenda_dot.svg")
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
      this.matIconRegistry.addSvgIcon(
        "finanzas",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/dashboard_finanzas.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "recetas",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/dashboard_recetas.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "pacientes",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/dashboard_user.svg")
      );
    }

    ngOnInit(): void {
      this.pacienteId = this.route.snapshot.paramMap.get('id');
      if(this.pacienteId){
        this.spinner = true
        this.pacientesService.buscarPaciente(this.pacienteId).subscribe(data=>{
          console.log('DATA', data.patient)
          this.paciente = data.patient
          //this.patchValuesToEdit(data.data.attributes)
          this.spinner = false
        },(error)=>{
          this.spinner = false
          console.log('ERROR', error.error.error.message)
          this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
        })
      }
    }

    goToExpediente(){
      this.router.navigate(['/crea-pacientes', { id: this.pacienteId  }])
    }

    goToNotasEvolucion(){
      this.router.navigate(['notas-evolucion', { id: this.pacienteId  }])
    }

    goToHistorialPagos(){
      this.router.navigate(['historial-pagos', { id: this.pacienteId  }])
    }

    goToConcentimientos(){
      console.log('No Implementado aun')
    }

    goToOdontograma(){
      this.router.navigate(['odontograma', { id: this.pacienteId }])
    }

    goToConsentimientos(){
      this.router.navigate(['consentimientos', { id: this.pacienteId }])
    }

    openSnackbar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000
      });
    }
}
