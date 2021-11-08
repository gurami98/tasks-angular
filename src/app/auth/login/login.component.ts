import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();

  constructor(private authService: AuthService) { }

  login(){
    this.authService.auth(this.email.value, this.password.value)
  }

  ngOnInit(): void {
  }

}
