import {Component, OnInit} from '@angular/core';
import {EmployeeDataManagerServiceService} from "../../services/employee-data-manager-service.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  get getPageCount(): number | null {
    return <number>this.employeeDataManagerServiceService.pageCount;
  }

  constructor(private employeeDataManagerServiceService: EmployeeDataManagerServiceService) { }

  get getActivePage(){
    return this.employeeDataManagerServiceService.activePage
  }

  changePage(page: number){
    this.employeeDataManagerServiceService.changeActivePage(page)
  }

  ngOnInit(): void {
  }
}
