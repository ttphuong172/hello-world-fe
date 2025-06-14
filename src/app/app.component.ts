import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})

export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // let jwt = this.authService.getToken();
    // if (this.jwtHelperService.isTokenExpired(jwt)){
    //   this.router.navigateByUrl('');
    // }
  }
}
