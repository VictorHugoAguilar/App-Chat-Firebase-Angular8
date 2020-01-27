import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  private mensaje: string = '';
  private elemento: any;

  constructor(private _cs: ChatService) {
    this._cs.cargarMensajes()
      .subscribe(() => {
        // Metemos un timeout para que carga despues de que angular ha renderizado los elementos
        setTimeout(() => {
          // con el scrollTop lo ubicamos a la altura de último elemento que metemos
          this.elemento.scrollTop = this.elemento.scrollHeight;
        });
      });
  }

  ngOnInit() {
    // configuramos la referencia del elemento con el identificador que hemos puesto en el html
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    // Validamos que tengamos mensajes
    if (this.mensaje.length === 0) {
      return;
    }

    // console.log('Mensaje enviado', this.mensaje);
    this._cs.agregarMensaje(this.mensaje).then(() => {
      console.log('Todo OK, añadido');
      this.mensaje = '';
    }
    ).catch(e => {
      {
        console.error('KO, no se ha podido añadir', e);
      }
    });


  }



}
