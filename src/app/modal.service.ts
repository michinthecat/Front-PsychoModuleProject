import { Injectable } from '@angular/core';

declare var $: any; // Declaramos la variable $ para acceder a jQuery

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  openModal(): void {
    $('#myModal').modal('show'); // Abre el modal con el id "myModal"
  }

  closeModal(): void {
    $('#myModal').modal('hide'); // Cierra el modal con el id "myModal"
  }
}
