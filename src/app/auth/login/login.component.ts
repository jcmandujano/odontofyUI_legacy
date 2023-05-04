import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../services/auth/auth.service'
import { SessionStorageService } from '../../services/utils/session-storage.service'
import { User } from '../../services/user/user.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true
  faEnvelope = faEnvelope;
  fakey = faKeyboard
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  userdata = new User;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])),
    password: new FormControl('', Validators.required),
  });
  constructor( private router: Router,
    public authService: AuthService, 
    private snackBar: MatSnackBar,
    private sessionService : SessionStorageService) { }

  ngOnInit(): void {
  }

  gotoHome(){
    this.router.navigate([''])
  }

  gotoSignup(){
    this.router.navigate(['/register'])
  }

  doLogin(){
    this.router.navigate(['/dashboard'])
    /* this.loginForm.markAllAsTouched()
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe(data=>{
        this.userdata = data;
        this.storeSession(data)
        this.router.navigate(['/dashboard'])
      },(error)=>{
        console.log('ERROR', error.error.error.message)
        this.openSnackbar(`Ocurrio un error: ${error.error.error.message}`, 'Ok')
      })
    }else{
      this.validateForm()
    } */
  }

  validateForm(){
    console.log('FORM', this.loginForm.controls.username)
    if(this.loginForm.controls.username.errors?.['pattern']){
      this.openSnackbar('Por favor ingresa un correo valido','Ok')
      return
    }
    if(this.loginForm.controls.username.status === 'INVALID'){
      this.openSnackbar('Por favor ingresa tu correo','Ok')
      return
    }
    else if(this.loginForm.controls.password.status === 'INVALID'){
      this.openSnackbar('Por favor ingresa tu contraseña','Ok')
      return
    }
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  storeSession(userData:User){
    this.sessionService.saveToken(userData.jwt)
    this.sessionService.saveUser(userData.profile)
  }

}
