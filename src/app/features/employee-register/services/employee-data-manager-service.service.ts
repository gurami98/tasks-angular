import { Injectable } from '@angular/core';
import {Employee} from "../models/Employee.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataManagerServiceService {

  data: Employee[] | any = null
  arrayLength: number | undefined = undefined
  pageCount: number | null = 1
  itemsToShowCount = 4
  activePage: number | null = 1
  startIndex: number | null = 0
  endIndex: number | null = 4

  constructor(private http: HttpClient) {
    try {
      this.http.get(`${environment.api}/employees`).subscribe(resp => {
        this.data = resp
        this.updatePaginationInfo()
      })
    }catch (e){
      alert(e.message)
    }
  }

  updatePaginationInfo(){
    this.arrayLength = this.data.length
    this.pageCount = <number>this.arrayLength % this.itemsToShowCount === 0 ? <number>this.arrayLength / this.itemsToShowCount :
      Math.ceil(<number>this.arrayLength / this.itemsToShowCount)
  }

  changeActivePage(pageNum: number){
    this.activePage = pageNum
    this.startIndex = pageNum * this.itemsToShowCount - 4
    this.endIndex = pageNum * this.itemsToShowCount
  }

  addEmployee(employee: Employee) {
    try {
      this.http.post(`${environment.api}/employees`, employee).subscribe(resp => {
        this.data.push(resp)
        this.updatePaginationInfo()
        this.changeActivePage(<number>this.pageCount)
      })
    }catch (e){
      alert(e.message)
    }
  }

  getOneById(id: number | undefined): Employee | null {
    return this.data.filter((p: Employee) => p.id == id)[0]
  }

  findById(id: number | undefined){
    try {
      return this.http.get(`${environment.api}/employees/${id}`)
    }catch (e){
      alert(e.message)
      return null
    }
  }

  deleteEmployee(id: number | undefined) {
    try {
      this.http.delete(`${environment.api}/employees/${id}`).subscribe()
      this.data = this.data.filter((d: Employee) => d.id != id);
      this.arrayLength = this.data.length
      this.pageCount = <number>this.arrayLength % this.itemsToShowCount === 0 ? <number>this.arrayLength / this.itemsToShowCount :
        Math.ceil(<number>this.arrayLength / this.itemsToShowCount)
      this.changeActivePage(this.pageCount)
    }catch (e){
      alert(e.message)
    }
  }

  updateEmployee(person: Employee, id: number | undefined){
    try {
      this.http.put(`${environment.api}/employees/${id}`, person).subscribe(resp => {
        this.data = this.data.map((p: Employee) => {
          return p.id === id ? resp : p
        })
      })
    }catch (e){
      alert(e.message)
    }
  }
}
