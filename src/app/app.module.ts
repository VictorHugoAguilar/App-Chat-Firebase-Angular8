import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';

// Importamos el fontasowe para utilizarlo en cualquier sitio
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Importamos el fireModule para acceder a la bd firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FormsModule } from '@angular/forms';

// importamos el entorno
import { environment } from '../environments/environment';

// componentes
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';

// services
import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    ChatComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
