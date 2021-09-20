import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {UserDataManagerServiceService} from "./services/user-data-manager-service.service";
import {Person} from "./PersonInterface";
import {PasswordMatchValidatorServiceService} from "./services/password-match-validator-service.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  buttonStatus: string | undefined = 'buttonDisabled'
  form
  currentPerson: Person | null = null

  constructor(private fb: FormBuilder, private userDataManagerService: UserDataManagerServiceService, private passwordMatchService: PasswordMatchValidatorServiceService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+$'), Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(7)]],
      nickname: ['', [Validators.required, Validators.pattern('[A-Za-z0-9-]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?380(\\d{9})$'), Validators.maxLength(13)]],
      website: ['', [Validators.required, Validators.pattern('^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$')]],
      agreement: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchService.checkPasswords
    })
  }

  handleCurrentPersonChange(person: Person | null) {
    this.currentPerson = person
    this.form.patchValue(person as unknown as any)
    this.currentPerson && this.form.get('agreement')?.disable();
    this.buttonStatus = 'buttonEnabled'
  }

  submitForm(){
    if(this.form.valid) {
      if(!this.currentPerson) {
        this.userDataManagerService.addPerson(this.form.value)
      }else{
        this.userDataManagerService.updatePerson({...this.form.value, id: this.currentPerson.id})
      }
      this.form.reset()
      this.currentPerson = null
      this.form.get('agreement')?.enable();
    }else{
      // show errors in case form is invalid on submit
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

  resetForm(){
    this.form.reset()
    this.currentPerson = null
    this.form.get('agreement')?.enable();
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap( ({agreement, confirmPassword, password}) => {
            if (password === confirmPassword && (agreement || agreement === undefined)) {
              this.buttonStatus = 'buttonEnabled'
            }
            else this.buttonStatus = 'buttonDisabled'
          }
        )
      ).subscribe()
  }
}
