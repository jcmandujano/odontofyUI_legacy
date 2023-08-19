import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faKeyboard, faContactBook } from '@fortawesome/free-regular-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/app/services/utils/session-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../services/user/user.model'
import { MatSnackBar } from '@angular/material/snack-bar';

export interface signUpUserData{
  nombre?: string
  apellido_paterno?: string
  apellido_materno?: string
  fecha_nacimiento?: Date
  genero?: string
  email?: string 
  username?:string
  password?:string
  telefono?: string
  biografia?: string
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
  userdata = new User;
  spinner= false
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  userData = new User;
  signupData: signUpUserData | undefined
  signupForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido_pat: new FormControl('', Validators.required),
    apellido_mat: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])),
    password: new FormControl('', Validators.required),
    fechaNac: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
  });
  constructor( private router: Router,
    public authService: AuthService, 
    private snackBar: MatSnackBar,
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
    this.signupForm.markAllAsTouched()
    if(this.signupForm.valid){
      this.spinner = true
      this.authService.register(this.buildSignupData(this.signupForm.value)).subscribe(data=>{
        this.userdata = data;
        const pass = this.signupForm.value.password || ''
        console.log('DATA', data)
        this.doLogin(data.user.email, pass)
        this.spinner = false
      })
    }else{
      this.validateForm()
    }
  }

  doLogin(username: string, password: string){
    this.authService.login(username, password).subscribe(data=>{
      this.userdata = data;
      console.log('USERDATA', data)
      this.storeSession(data)
      this.router.navigate(['/dashboard'])
    },(error)=>{
      console.log('ERRORRRRR', error.error.error.message)
      this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
    })
  }

  storeSession(userData:any){
    this.sessionService.saveToken(userData.jwt)
    this.sessionService.saveUser(userData.user)
  }

  validateForm(){
    if(this.signupForm.controls.email.errors?.['pattern']){
      this.openSnackbar('Por favor ingresa un correo valido','Ok')
      return
    }
    if(this.signupForm.controls.nombre.status === 'INVALID' ){
      this.openSnackbar('Por favor ingresa un tu nombre','Ok')
      return
    }else if(this.signupForm.controls.apellido_pat.status === 'INVALID'){
      this.openSnackbar('Por favor ingresa tu apellido paterno','Ok')
      return
    }else if(this.signupForm.controls.apellido_mat.status === 'INVALID'){
      this.openSnackbar('Por favor ingresa tu apellido materno','Ok')
      return
    }else if(this.signupForm.controls.fechaNac.status === 'INVALID'){
      this.openSnackbar('Por favor ingresa tu fecha de nacimiento','Ok')
      return
    }else if(this.signupForm.controls.telefono.status === 'INVALID'){
      this.openSnackbar('Por favor ingresa tu numero de teléfono','Ok')
      return
    }else if(this.signupForm.controls.email.status === 'INVALID'){
      this.openSnackbar('Por favor ingresa tu correo','Ok')
      return
    }else if(this.signupForm.controls.password.status === 'INVALID'){
      this.openSnackbar('Por favor ingresa tu password','Ok')
      return
    }
  }

  buildSignupData(formData: any): signUpUserData{
    const data: signUpUserData = {
      nombre: formData.nombre,
      apellido_paterno: formData.apellido_pat,
      apellido_materno: formData.apellido_mat,
      fecha_nacimiento: formData.fechaNac,
      email: formData.email,
      username: formData.email,
      password: formData.password,
      telefono: formData.telefono,
    }
    return data;
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}

