import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any = [];
  constructor(private usersService: UserService) {
    this.usersService.getUsers().valueChanges().subscribe((result) => {
      this.users = result;
    });
  }

  ngOnInit() {
  }

}
