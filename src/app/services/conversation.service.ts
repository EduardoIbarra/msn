import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) { }
  createConversation(conversation) {
    return this.afDb.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }
  getConversations() {
    return this.afDb.list('conversations/');
  }
  getConversation(uid) {
    return this.afDb.object('conversations/' + uid);
  }
  updateMessage(conversation, message) {
    return this.afDb.object('conversations/' + conversation + '/' + message.timestamp).set(message);
  }
}
