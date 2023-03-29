import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faKeyboard, faContactBook } from '@fortawesome/free-regular-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionStorageService } from 'src/app/services/utils/session-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../services/user/user.model'

export interface signUpUserData{
  nombre: string
  apellido_paterno: string
  apellido_materno: string
  fecha_nacimiento: Date
  genero: string
  email: string 
  username:string
  password:string
  telefono: string
  biografia: string
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true
  faEnvelope = faEnvelope;
  fakey = faKeyboard
  faContactBook = faContactBook
  genderList: string[] = ['Masculino', 'Femenino', 'No binario'];
  userData = new User;
  signupData: signUpUserData | undefined
  signupForm = new FormGroup({
    nombre: new FormControl(''),
    apellido_pat: new FormControl(''),
    apellido_mat: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    fechaNac: new FormControl(''),
    genero: new FormControl(''),
    ocupacion: new FormControl(''),
    telefono: new FormControl(''),
    domicilio: new FormControl(''),
    biografia: new FormControl(''),
  });
  constructor( private router: Router,
    public authService: AuthService, 
    private sessionService : SessionStorageService ) { }

  ngOnInit(): void {
  }

  gotoHome(){
    this.router.navigate([''])
  }

  gotoLogin(){
    this.router.navigate(['/login'])
  }

  doSignUp(){
    console.log('FORM PARA REGISTRO', this.buildSignupData(this.signupForm.value))
    this.authService.register(this.buildSignupData(this.signupForm.value)).subscribe(data=>{
      console.log('Se registro correctamente', data)
    })
  }

  buildSignupData(formData: any): signUpUserData{
    const data: signUpUserData = {
      nombre: formData.nombre,
      apellido_paterno: formData.apellido_pat,
      apellido_materno: formData.apellido_mat,
      fecha_nacimiento: formData.fechaNac,
      genero: formData.genero,
      email: formData.email,
      username: formData.email,
      password: formData.password,
      telefono: formData.telefono,
      biografia: formData.biografia
    }
    return data;
  }

}

