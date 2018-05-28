import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) { }
  registerWithEmailAndPassword (user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  createUser(user) {
    console.log(user);
    return this.afDb.object('users/' + user.uid).set(user);
  }
  getUsers() {
    return this.afDb.list('users/');
  }
}
