import { Injectable } from '@angular/core';
import {UserDataManagerServiceService} from "../../register-form/services/user-data-manager-service.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserDataManagerServiceService, private router: Router) { }

  auth(email: string, password: string){
      const user = this.userService.data.filter(u => u.email == email && u.password == password)[0];
      if (user) {
        localStorage.setItem('token', 'dflwjhel;jwq3lkj312312')
        localStorage.setItem('id', `${user.id}`)
        this.router.navigate(['users'])
          .then()
      } else {
        alert('invalid username or password')
      }
  }
}
