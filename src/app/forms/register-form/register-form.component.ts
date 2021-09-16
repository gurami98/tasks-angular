import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {UserDataManagerServiceService} from "../../user-data-manager-service.service";
import {Person} from "../../PersonInterface";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit, OnChanges {
  buttonStatus: string | undefined = 'buttonDisabled'
  form
  @Input() person: Person | null = null

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    if(pass?.touched || confirmPass?.touched) return null
    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(private fb: FormBuilder, private userDataManagerService: UserDataManagerServiceService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+$'), Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(7)]],
      nickname: ['', [Validators.required, Validators.pattern('[A-Za-z0-9-]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?380(\\d{9})$'), Validators.maxLength(13)]],
      website: ['', [Validators.required, Validators.pattern('^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$')]],
      agreement: [false, Validators.requiredTrue]
    }, {
      validators: this.checkPasswords
    })
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap( value => {
            if (value.password === value.confirmPassword && value.agreement) this.buttonStatus = 'buttonEnabled'
            else this.buttonStatus = 'buttonDisabled'
          }
        )
      ).subscribe()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.person.currentValue) {
      console.log(this.person, 'egaa')
      this.form.patchValue(this.person as unknown as any)
    }
  }

  submitForm(){
    if(this.form.valid) {
      this.userDataManagerService.addPerson(this.form.value)
      this.form.reset()
    }
  }
}
