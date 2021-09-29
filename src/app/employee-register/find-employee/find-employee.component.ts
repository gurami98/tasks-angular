import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {EmployeeDataManagerServiceService} from "../services/employee-data-manager-service.service";
import {Employee} from "../EmployeeInterface";

@Component({
  selector: 'app-find-employee',
  templateUrl: './find-employee.component.html',
  styleUrls: ['./find-employee.component.scss']
})
export class FindEmployeeComponent implements OnInit {
  buttonStatus: string | undefined = 'buttonDisabled'
  personFound: Employee | null = null
  search: FormControl = new FormControl('', Validators.required);

  constructor(private employeeDataManagerService: EmployeeDataManagerServiceService) {
  }

  searchEmployee(id: number) {
    this.employeeDataManagerService.findById(id)?.subscribe(resp => {
        this.personFound = <Employee>resp
      }, err => {
        this.personFound = null
      }
    )
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        tap(() => {
            if (this.search.valid) {
              this.buttonStatus = 'buttonEnabled'
            } else this.buttonStatus = 'buttonDisabled'
          }
        )
      ).subscribe()
  }
}
