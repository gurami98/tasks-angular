import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from "../EmployeeInterface";
import {EmployeeDataManagerServiceService} from "../services/employee-data-manager-service.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input() currentEmployee: Employee | null = null;
  @Input() scrollEl: any;
  @Output() currentEmployeeChange: EventEmitter<Employee | null> = new EventEmitter<Employee | null>();

  get employeesList(): Employee[] {
    return this.employeeDataManagerServiceService.data;
  }

  constructor(private employeeDataManagerServiceService: EmployeeDataManagerServiceService) { }

  deleteUser(id: number | undefined) {
    if(confirm('Are you sure you want to delete this user ?')) {
      this.employeeDataManagerServiceService.deleteEmployee(id);
    }
  }

  editUser(id: number | undefined) {
    this.scrollEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.currentEmployeeChange.emit(this.employeeDataManagerServiceService.getOneById(id));
  }

  ngOnInit(): void {

  }
}
