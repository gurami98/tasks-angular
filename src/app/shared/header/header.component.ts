import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  logout(){
    localStorage.clear()
    this.authService.loggedIn$.next(false);
    this.router.navigateByUrl('/').then()
  }

  ngOnInit(): void {
  }

}
