import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelperService: JwtHelperService
  ) { }
  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    return localStorage.getItem('jwtToken');
  }

  // isLogin(): boolean{
  //   return !!localStorage.getItem('jwtToken')
  // }

  // Kiểm tra nếu có token trong LocalStorage và token có hợp lệ hay không
  isLogin(): boolean {
    const token = localStorage.getItem('jwtToken');  // Lấy token từ LocalStorage
    // console.log(token)

    if (!token) {
      return false;  // Nếu không có token, không đăng nhập
    }

    try {
      // Kiểm tra xem token có hết hạn hay không
      const isExpired = this.jwtHelperService.isTokenExpired(token);
      // console.log(isExpired)
      if (isExpired) {
        return false;
      }
      return true;  // Nếu token hợp lệ và chưa hết hạn
    } catch (error) {
      // console.error('Token không hợp lệ: ', error);
      return false;
    }
  }


}
