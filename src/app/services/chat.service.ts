import { Injectable } from '@angular/core';

// importamos los modulos para firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollections: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  private usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(
      user => {
        console.log('Estado del usuario', user);
        if (!user) {
          return;
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.usuario.foto = user.photoURL;
      }
    );


  }

  login(proveedor: string) {

    if (proveedor.trim() === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    // por ref podemos pasar las query para ordenar y limitar la cantidad de registros a traer
    this.itemsCollections = this.afs.collection<Mensaje>('Chat', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollections.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      console.log(mensajes);
      this.chats = [];
      for (const mensaje of mensajes) {
        this.chats.unshift(mensaje);
      }
      return this.chats;
    }));
  }

  agregarMensaje(texto: string) {
    // TODO falta uid
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
      photoURL: this.usuario.foto
    };

    return this.itemsCollections.add(mensaje);
  }

}
