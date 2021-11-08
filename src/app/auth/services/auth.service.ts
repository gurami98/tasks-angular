import { Injectable } from '@angular/core';
import {UserDataManagerServiceService} from "../../features/register-form/services/user-data-manager-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {User} from "../models/user.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserDataManagerServiceService, private router: Router, private http: HttpClient) {
    localStorage.getItem('id') && this.loggedIn$.next(true);
  }

  auth(email: string, password: string){
    this.http.post<User>(`${environment.api}/login`, {
      email,
      password
    })
    .subscribe((res:any) => {
        localStorage.setItem('token', res.accessToken)
        localStorage.setItem('id', res.user.id)
        this.loggedIn$.next(true);
        this.router.navigate(['users']).then()
      },
      (err) => {
        alert("email or password isn't correct");
      }
    )
    // .pipe(
    //   tap( (res: any )=> {
    //     localStorage.setItem('token', res.accessToken)
    //     localStorage.setItem('id', res.user.id)
    //     this.router.navigate(['/users']).then()
    //     },
    //   )
    // )
  }
}
