import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PasswordMatchValidatorServiceService {

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    if(pass?.touched || confirmPass?.touched) return null
    return pass === confirmPass ? null : { notSame: true }
  }

  constructor() { }
}
