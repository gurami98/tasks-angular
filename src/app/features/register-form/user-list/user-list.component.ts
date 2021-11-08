import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from "../models/Person.model";
import {UserDataManagerServiceService} from "../services/user-data-manager-service.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() currentPerson: Person | null = null;
  @Input() scrollEl: any;
  @Output() currentPersonChange: EventEmitter<Person | null> = new EventEmitter<Person | null>();

  loggedPersonID: number | string | null = null;
  get usersList(): Person[] {
    return this.userDataManagerService.data;
  }

  constructor(private userDataManagerService: UserDataManagerServiceService) {
    this.loggedPersonID = localStorage.getItem('id')
  }

  deleteUser(id: number) {
    let person = this.usersList.filter(user => user.id === id)[0];
    if(confirm('This action will remove a user with this email: ' +  person.email + '\nAre you sure ?')) {
      this.userDataManagerService.deletePerson(id);
    }
  }

  editUser(id: number) {
    this.scrollEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.currentPersonChange.emit(this.userDataManagerService.getCurrentById(id));
  }

  ngOnInit(): void {

  }
}
