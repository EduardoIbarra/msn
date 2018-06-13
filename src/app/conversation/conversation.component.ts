import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friend: any = {};
  form: any = {message: ''};
  friendId: any = null;
  me: any = {};
  conversation: any = [];
  ids: any = [];
  shake = false;
  picture: any;
  friendPicture: any;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
              private messagingService: MessagingService,
              private conversationService: ConversationService) {
    this.me = JSON.parse(localStorage.getItem('msn_user'));
    this.picture = (this.me.downloaded_picture) ? this.me.profile_picture
      : 'https://wir.skyrock.net/wir/v1/profilcrop/?c=mog&w=301&h=301&im=%2Fart%2FPRIP.85914100.3.0.png';
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.ids = [this.me.uid, this.friendId].sort();
    this.userService.getUser(this.friendId).valueChanges().subscribe((user) => {
      this.friend = user;
      this.friendPicture = (this.friend.downloaded_picture) ? this.friend.profile_picture
        : 'https://wir.skyrock.net/wir/v1/profilcrop/?c=mog&w=301&h=301&im=%2Fart%2FPRIP.85914100.3.0.png';
      this.conversationService.getConversation(this.ids.join('||')).valueChanges()
        .subscribe((result) => {
          if (!result) {
            return;
          }
          this.conversation = Object.keys(result).map(function (key) { return result[key]; });
          this.conversation.forEach((m: any) => {
            if (!m.seen && m.sender !== this.me.uid) {
              m.seen = true;
              if (m.type === 'zumbido') {
                this.doZumbido();
              } else if (m.type === 'text') {
                const audio = new Audio('assets/sound/new_message.m4a');
                audio.play();
              }
              this.conversationService.updateMessage(this.ids.join('||'), m);
            }
          });
          window.setTimeout(() => {
            const objDiv = document.getElementById('messageArea');
            if(objDiv) {
              objDiv.scrollTop = objDiv.scrollHeight;
            }
          }, 1);
        });
    });
  }
  getUserNickById(id) {
    if (id === this.friendId) {
      return this.friend.nick;
    } else if (id === this.me.uid) {
      return this.me.nick;
    }
  }

  ngOnInit() {
  }
  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 800);
  }
  sendZumbido() {
    this.doZumbido();
    const messageObject: any = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.me.uid,
      receiver: this.friendId,
      type: 'zumbido',
    };
    this.conversationService.createConversation(messageObject);
  }
  sendMessage() {
    const messageObject: any = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.me.uid,
      receiver: this.friendId,
      type: 'text',
      content: this.form.message.replace(/\n$/, '')
    };
    this.conversationService.createConversation(messageObject).then(() => {
      const notificationMessage = {
        type: 'text',
        friend_uid: this.friendId,
        friend_name: this.friend.nick,
        picture: this.friendPicture,
        message: messageObject.content,
        timestamp: Date.now()
      };
      this.messagingService.sendMessage(this.me.uid, notificationMessage);
    });
    this.form.message = '';
  }
}
