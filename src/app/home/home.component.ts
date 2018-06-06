import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RequestService } from '../services/request.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any = [];
  me: any = {};
  editingSubnick = false;
  subnick = '';
  closeResult: string;
  requestEmail: string;
  constructor(private usersService: UserService,
              private modalService: NgbModal,
              private requestService: RequestService) {
    this.usersService.getUsers().valueChanges().subscribe((result) => {
      this.users = result;
    });
    this.me = JSON.parse(localStorage.getItem('msn_user'));
    this.usersService.getUser(this.me.details.user.uid).valueChanges().subscribe((result) => {
      this.me = result;
    });
    const audio = new Audio('assets/sound/online.m4a');
    audio.play();
  }

  ngOnInit() {
  }
  setUserProperty(key, value) {
    return this.usersService.setUserProperty(key, value, this.me.uid);
  }
  startEditingSubnick() {
    this.editingSubnick = true;
  }
  setSubnick() {
    this.setUserProperty('subnick', this.me.subnick).then(() => {
      this.editingSubnick = false;
    });
    document.getElementById('subnickTxt').focus();
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.requestEmail,
      sender: this.me,
      status: 'pending'
    };
    this.requestService.createRequest(request).then(() => {
      alert('Solicitud Enviada!');
    });
  }
}
