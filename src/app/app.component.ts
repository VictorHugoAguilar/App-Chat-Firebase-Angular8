import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fireChat';

  items: Observable<any[]>;


  constructor(
    public db: AngularFirestore, public cs: ChatService
  ) {
    this.items = db.collection('Chat').valueChanges();
  }

  salir() {
    this.cs.logout();
  }
}
