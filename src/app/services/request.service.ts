import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) { }
  createRequest(request) {
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.afDb.object('requests/' + cleanEmail + '/' + request.sender.uid).set(request);
  }
  setRequestStatus(request, status){
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.afDb.object('requests/' + cleanEmail + '/' + request.sender.uid + '/status').set(status);
  }
  getRequests() {
    return this.afDb.list('requests/');
  }
  getRequestsForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    return this.afDb.list('requests/' + cleanEmail);
  }
  getRequest(uid) {
    return this.afDb.object('requests/' + uid);
  }
  updateMessage(request, message) {
    return this.afDb.object('requests/' + request + '/' + message.timestamp).set(message);
  }
}
