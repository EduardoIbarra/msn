import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from './services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  me: any = {};
  requests:any = [];
  constructor(private usersService: UserService,
              private modalService: NgbModal,
              private requestService: RequestService) {
    this.me = JSON.parse(localStorage.getItem('msn_user'));
    this.usersService.getUser(this.me.details.user.uid).valueChanges().subscribe((result) => {
      this.me = result;
      this.requestService.getRequestsForEmail(this.me.email).valueChanges().subscribe( (requests) => {
        console.log(requests);
      });
    });
  }
}
