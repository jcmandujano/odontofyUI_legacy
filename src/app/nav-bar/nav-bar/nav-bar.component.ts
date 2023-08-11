import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/utils/session-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,  
    private domSanitizer: DomSanitizer,
    private sessionService : SessionStorageService,
    private router: Router
    ) {
    this.matIconRegistry.addSvgIcon(
      "logout",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/logout_dashboard.svg")
    );
   }

  ngOnInit(): void {
  }

  doLogout(){
    this.sessionService.signOut();
    this.router.navigate([''])
  }

}
