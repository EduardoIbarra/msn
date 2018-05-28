import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  sendZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
  }
}
