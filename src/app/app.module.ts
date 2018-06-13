import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConversationComponent } from './conversation/conversation.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FriendRequestModalComponent } from './modals/friend-request/friend-request.modal';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ImageCropperModule } from 'ngx-image-cropper';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'conversation/:uid', component: ConversationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ConversationComponent,
    FriendRequestModalComponent,
    AboutComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFontAwesomeModule,
    AngularFireStorageModule,
    NgbModule.forRoot(),
    BootstrapModalModule.forRoot({container: document.body}),
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    FriendRequestModalComponent
  ]
})
export class AppModule { }
