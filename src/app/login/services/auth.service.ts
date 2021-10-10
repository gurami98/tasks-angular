import { Injectable } from '@angular/core';
import {UserDataManagerServiceService} from "../../register-form/services/user-data-manager-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserDataManagerServiceService, private router: Router, private http: HttpClient) { }

  auth(email: string, password: string){
    this.http.post(`${environment.api}/login`, {
      "email": email,
      "password": password
    })
      .pipe(
        tap( (res: any )=> {
          localStorage.setItem('token', res.accessToken)
          localStorage.setItem('id', res.user.id)
          this.router.navigate(['users']).then()
          },
        )
      )
      .subscribe(()=> {
        }, () => {
          alert("email or password isn't correct");
        }
      )
  }
}
