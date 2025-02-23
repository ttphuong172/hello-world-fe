import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

// import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    username: new FormControl(''),
    password: new FormControl()
  });

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.formLogin.value).subscribe(
      (data: any) => {
        if (data.jwtToken == null) {
          alert("Sai tên đăng nhập hoặc mật khẩu")
        } else {
          this.authService.setToken(data.jwtToken)
          this.router.navigateByUrl("tkn")
        }
      }
    )
  }
}
