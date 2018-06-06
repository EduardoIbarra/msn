import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { UserService } from '../../services/user.service';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}
@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.modal.html'
})
export class FriendRequestModalComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  currentRequest: any;
  shouldAdd = 'yes';
  constructor(dialogService: DialogService,
              private userService: UserService
  ) {
    super(dialogService);
  }
  apply() {
    this.close();
  }
  accept() {
    if (this.shouldAdd === 'yes') {
      this.scope.requestService.setRequestStatus(this.currentRequest, 'accepted').then(() => {
        this.userService.addFriend(this.scope.me.uid, this.currentRequest.sender.uid);
        this.close();
      });
    } else {
      this.scope.requestService.setRequestStatus(this.currentRequest, 'rejected').then(() => {
        alert('Gracias!');
        this.close();
      });
    }
  }
  decline() {
    this.scope.requestService.setRequestStatus(this.currentRequest, 'decide_later');
    this.close();
  }
}
