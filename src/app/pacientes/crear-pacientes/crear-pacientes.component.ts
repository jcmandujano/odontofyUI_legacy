import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { PacientesService } from 'src/app/services/pacientes/pacientes.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/services/pacientes/pacientes.model';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-crear-pacientes',
  templateUrl: './crear-pacientes.component.html',
  styleUrls: ['./crear-pacientes.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class CrearPacientesComponent implements OnInit {
  crearPacientesForm: FormGroup
  paciente: any //crear modelo de paciente y tipear esto
  spinner= false
  pacienteId: any //if this value exist, we enable update mode
  constructor(private elementRef: ElementRef, 
    private pacientesService: PacientesService, 
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { 
    this.crearPacientesForm = this.buildPacientesForm()
  }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('id');
    if(this.pacienteId){
      this.spinner = true
      this.pacientesService.buscarPaciente(this.pacienteId).subscribe(data=>{
        this.patchValuesToEdit(data.data.attributes)
        this.spinner = false
      },(error)=>{
        this.spinner = false
        console.log('ERROR', error.error.error.message)
        this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
      })
    }
  }

  //this changes background on load
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
  }

  patchValuesToEdit(paciente: Paciente){
    console.log('QUE FECHA TRAES', this.calculaEdad(new Date(paciente.fecha_nacimiento).toISOString()))
     this.crearPacientesForm.patchValue({
      nombre: paciente.nombre,
      apellido_paterno: paciente.apellido_paterno,
      apellido_materno: paciente.apellido_materno,
      fecha_nacimiento: paciente.fecha_nacimiento,
      edad:  this.calculaEdad(new Date(paciente.fecha_nacimiento).toISOString()),
      genero: paciente.genero,
      ocupacion: paciente.ocupacion,
      estado_civil: paciente.estado_civil,
      email: paciente.email,
      telefono: paciente.telefono,
      domicilio: paciente.domicilio,
      rfc: paciente.rfc,
      motivo_de_consulta: paciente.motivo_de_consulta,
      nombre_contacto_emergencia: paciente.nombre_contacto_emergencia,
      relacion_contacto_emergencia: paciente.relacion_contacto_emergencia,
      telefono_contacto_emergencia: paciente.telefono_contacto_emergencia,
      antecedentes_heredofamiliares: paciente.antecedentes_heredofamiliares,
      antecedentes_personales_patologicos: paciente.antecedentes_personales_patologicos,
     })
  }

  //guarda la informacion del paciente
  crearPaciente(){
    if(this.crearPacientesForm.valid){
      this.spinner = true
      this.paciente = this.crearPacientesForm.value
      this.pacientesService.creaPaciente(this.paciente).subscribe(data=>{
        this.openSnackbar('Se guardo la informacion correctamente', 'Ok')
        this.router.navigate(['/lista-pacientes'])
        this.spinner = false
      },(error)=>{
        this.spinner = false
        console.log('ERROR', error.error.error.message)
        this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
      })
    }
  }

  actualizarPaciente(){
    if(this.crearPacientesForm.valid){
      this.spinner = true
      this.paciente = this.crearPacientesForm.value
      this.pacientesService.actualizaPaciente(this.pacienteId, this.paciente).subscribe(data=>{
        this.openSnackbar('Se actualizó la informacion correctamente', 'Ok')
        this.router.navigate(['/lista-pacientes'])
        this.spinner = false
      },(error)=>{
        this.spinner = false
        console.log('ERROR', error.error.error.message)
        this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
      })
    }
  }

  //hook al cambiar el valor de la fecha de nacimiento
  onDateChange(eventChange: MatDatepickerInputEvent<Date>){
    const edad = this.calculaEdad(moment(eventChange.value).format())
    if(edad){
      this.crearPacientesForm.patchValue({edad: edad})
    }
  }

  //calcula la edad en funcion de la decha de nacimiento
  calculaEdad(dateString: string): number {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
  }

  //mostramos el error de email por valido o por formato
  getEmailErrorMessage() {
    if (this.crearPacientesForm.controls['email'].hasError('required')) {
      return 'Debes ingresar el email';
    }

    return this.crearPacientesForm.controls['email'].hasError('email') ? 'No es un email valido' : '';
  }

  //mostramos el error de telefono por valido o por formato
  getPhoneErrorMessage() {
    if (this.crearPacientesForm.controls['telefono'].hasError('required')) {
      return 'Debes ingresar el email';
    }

    return this.crearPacientesForm.controls['telefono'].hasError('pattern') ? 'No es un telefono valido' : '';
  }

  buildPacientesForm(): FormGroup{
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido_paterno: new FormControl('', Validators.required),
      apellido_materno: new FormControl('', Validators.required),
      edad: new FormControl({ value: '', disabled: true }),
      fecha_nacimiento: new FormControl('', Validators.required),
      genero: new FormControl(''),
      ocupacion: new FormControl(''),
      estado_civil: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      domicilio: new FormControl(''),
      rfc: new FormControl(''),
      motivo_de_consulta: new FormControl(''),
      nombre_contacto_emergencia: new FormControl(''),
      relacion_contacto_emergencia: new FormControl(''),
      telefono_contacto_emergencia: new FormControl(''),
      antecedentes_heredofamiliares: new FormControl(''),
      antecedentes_personales_patologicos: new FormGroup({
        bajoTratamientoMedico: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        intervencionQuirurgica: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        consumeDrogas: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        problemasPresion: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        hepatitis: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        vih: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        ets: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        problemaCorazon: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        fiebreReumatica: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        asma: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        diabetes: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        ulceraGastrica: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        tiroides: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        alergias: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        epilepsia: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        gastritis: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        }),
        embarazo: new FormGroup({
          respuesta: new FormControl(''),
          comentarios: new FormControl('')
        })

      })
    })
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
