import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentPictureId: any;
  me: any = {};
  user: any = {};
  picture: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(public userService: UserService,
              public router: Router,
              private fbStorage: AngularFireStorage,) {
    this.me = JSON.parse(localStorage.getItem('msn_user'));
    this.user = this.me;
    this.userService.getUser(this.me.uid).valueChanges().subscribe((result: any) => {
      this.me = result;
      this.picture = (this.me.downloaded_picture) ? this.me.profile_picture :
        'https://wir.skyrock.net/wir/v1/profilcrop/?c=mog&w=301&h=301&im=%2Fart%2FPRIP.85914100.3.0.png';
    });
  }

  ngOnInit() {
  }

  saveSettings() {
    if(this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.fbStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.fbStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.userService.setProfilePicture(p, this.me.uid).then( () => {
            this.userService.updateProfilePicture(this.user, this.me.uid).then( () => {
              alert('Configuración Guardada!');
              this.router.navigateByUrl('/home');
            });
          });
        });
      });
    } else {
      this.userService.updateProfilePicture(this.user, this.me.uid).then( () => {
        alert('Configuración Guardada!');
      });
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
    console.log(this.croppedImage);
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

}
