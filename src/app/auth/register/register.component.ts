import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {UserDataManagerServiceService} from "../../features/register-form/services/user-data-manager-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  nickname: FormControl = new FormControl()
  email: FormControl = new FormControl()
  password: FormControl = new FormControl()
  constructor(private userDataService: UserDataManagerServiceService) { }

  ngOnInit(): void {
  }

  register(){
    this.userDataService.addPerson({email: this.email.value, password: this.password.value, nickname: this.nickname.value})
  }

}
