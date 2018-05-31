import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
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
    this.userService.signInWithEmailAndPassword(this.user).then((data: any) => {
      this.userService.getUser(data.user.uid).valueChanges().subscribe((u: any) => {
        u.details = data;
        localStorage.setItem('msn_user', JSON.stringify(u));
        this.router.navigate(['/home']);
      });
    });
  }
  go2() {
    this.userService.registerWithEmailAndPassword(this.user).then((data: any) => {
      data.created_at = Date.now();
      const thisUser: any = {uid: data.user.uid, email: this.user.email, nick: this.user.nick};
      this.userService.createUser(thisUser).then((user) => {
        localStorage.setItem('msn_user', JSON.stringify(user));
        this.router.navigate(['/home']);
      });
    });
  }
  ngOnInit() {
  }

}
