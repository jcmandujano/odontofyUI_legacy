import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from './services/utils/session-storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  title = 'odontofyUI';
  constructor(private tokenStorageService: SessionStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    }else{
      this.router.navigate([''])
    }
  }


}
