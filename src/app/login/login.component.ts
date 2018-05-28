import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  constructor(private userService: UserService, private router: Router) { }
  go() {
    this.userService.registerWithEmailAndPassword(this.user).then((data: any) => {
      data.created_at = Date.now();
      const thisUser: any = {uid: data.user.uid, email: this.user.email, nick: this.user.nick};
      this.userService.createUser(thisUser).then((user) => {
        console.log(user);
        this.router.navigate(['/home']);
      });
    });
  }
  ngOnInit() {
  }

}
