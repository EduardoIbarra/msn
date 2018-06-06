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
  operation = 'login';
  constructor(private userService: UserService, private router: Router) { }
  go() {
    this.userService.signInWithEmailAndPassword(this.user).then((data: any) => {
      this.userService.getUser(data.user.uid).valueChanges().subscribe((u: any) => {
        u.details = data;
        localStorage.setItem('msn_user', JSON.stringify(u));
        this.userService.setUserProperty('status', 'online', data.user.uid);
        this.router.navigate(['/home']);
      });
    }).catch((e) => {
      console.log(e);
      alert('Error: ' + e.message);
    });
  }
  go2() {
    this.userService.registerWithEmailAndPassword(this.user).then((data: any) => {
      data.created_at = Date.now();
      const thisUser: any = {uid: data.user.uid, email: this.user.email, nick: this.user.nick, status: 'offline'};
      this.userService.createUser(thisUser).then((user) => {
        this.operation = 'login';
        alert('Registrado con éxito, ya puedes hacer Login.');
      });
    }).catch((e) => {
      console.log(e);
      alert('Error: ' + e.message);
    });
  }
  ngOnInit() {
  }

}
