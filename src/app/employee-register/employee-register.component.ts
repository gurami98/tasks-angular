import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {Employee} from "./EmployeeInterface";
import {EmployeeDataManagerServiceService} from "./services/employee-data-manager-service.service";

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {

  buttonStatus: string | undefined = 'buttonDisabled'
  form
  currentEmployee: Employee | null = null

  constructor(private fb: FormBuilder, private employeeDataManagerService: EmployeeDataManagerServiceService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    })
  }

  handleCurrentEmployeeChange(employee: Employee | null) {
    this.currentEmployee = employee
    this.form.patchValue(employee as unknown as any)
    this.buttonStatus = 'buttonEnabled'
  }

  submitForm(){
    if(this.form.valid) {
      if(!this.currentEmployee) {
        this.employeeDataManagerService.addEmployee(this.form.value)
      }else{
        this.employeeDataManagerService.updateEmployee(this.form.value, this.currentEmployee.id)
      }
      this.form.reset()
      this.currentEmployee = null
    }
  }

  resetForm(){
    this.form.reset()
    this.currentEmployee = null
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap( () => {
            if (this.form.valid) {
              this.buttonStatus = 'buttonEnabled'
            }
            else this.buttonStatus = 'buttonDisabled'
          }
        )
      ).subscribe()
  }
}
