import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {UserDataManagerServiceService} from "../user-data-manager-service.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  buttonStatus: string | undefined = 'buttonEnabled'
  form
  // should be deleted
  userData = this.userDataManagerService.data

  constructor(private fb: FormBuilder, private userDataManagerService: UserDataManagerServiceService) {
    this.form = this.fb.group({ // basically need validation for every input, or just 1 validation function for the whole group
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+$'), Validators.minLength(7)]], // need password validator
      confirmPassword: ['', [Validators.required, Validators.minLength(7)]], // need password validator
      nickname: ['', [Validators.required, Validators.pattern('[A-Za-z0-9-]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?380(\\d{9})$')]],
      website: ['', [Validators.required, Validators.pattern('^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$')]],
      agreement: [false, Validators.required]
    })
  }

  ngOnInit(): void {
    // this.form.valueChanges
    //   .pipe(
    //     tap(console.log)
    //   ).subscribe()
  }

  submitForm(){
    console.log('test')
    this.form.valid && this.userDataManagerService.addPerson(this.form.value)
  }
}
