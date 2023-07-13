import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateInput(event: Event, fieldName: string): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
  
    if (/\d/.test(value)) {
      // Si el valor contiene algún carácter numérico, mostrar un mensaje de error
      inputElement.classList.add('is-invalid');
      const errorElement = document.querySelector(`.${fieldName}.text-danger`);
      if (errorElement) {
        errorElement.textContent = `El ${fieldName} no puede contener números`;
      }
    } else {
      // Si el valor es válido, eliminar cualquier mensaje de error y la clase de inválido
      inputElement.classList.remove('is-invalid');
      const errorElement = document.querySelector(`.${fieldName}.text-danger`);
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  }


  validateEmail(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const email = inputElement.value.trim();
  
    if (email === '') {
      // Si el campo está vacío, mostrar un mensaje de error
      inputElement.classList.add('is-invalid');
      const errorElement = document.querySelector('.email.text-danger');
      if (errorElement) {
        errorElement.textContent = 'Por favor, ingresa un correo electrónico';
      }
    } else if (!inputElement.validity.valid) {
      // Si el formato del correo electrónico no es válido, mostrar un mensaje de error
      inputElement.classList.add('is-invalid');
      const errorElement = document.querySelector('.email.text-danger');
      if (errorElement) {
        errorElement.textContent = 'El correo electrónico ingresado no es válido';
      }
    } else {
      // Si el correo electrónico es válido, eliminar cualquier mensaje de error y la clase de inválido
      inputElement.classList.remove('is-invalid');
      const errorElement = document.querySelector('.email.text-danger');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  }

  validateAge(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const age = inputElement.value.trim();
  
    if (/^\d{0,2}$/.test(age)) {
      // Si la edad contiene solo números y tiene máximo 2 caracteres, es válida
      inputElement.classList.remove('is-invalid');
      const errorElement = document.querySelector('.age.text-danger');
      if (errorElement) {
        errorElement.textContent = '';
      }
    } else {
      // Si la edad no cumple con el formato o tiene más de 2 caracteres, mostrar un mensaje de error
      inputElement.classList.add('is-invalid');
      const errorElement = document.querySelector('.age.text-danger');
      if (errorElement) {
        errorElement.textContent = 'La edad debe ser un número de máximo 2 caracteres';
      }
    }
  }

    
  validatePhone(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const phone = inputElement.value.trim();

    if (/^\d{0,10}$/.test(phone)) {
      // Si el teléfono contiene solo números y tiene máximo 10 caracteres, es válido
      inputElement.classList.remove('is-invalid');
      const errorElement = document.querySelector('.phone.text-danger');
      if (errorElement) {
        errorElement.textContent = '';
      }
    } else {
      // Si el teléfono no cumple con el formato o tiene más de 10 caracteres, mostrar un mensaje de error
      inputElement.classList.add('is-invalid');
      const errorElement = document.querySelector('.phone.text-danger');
      if (errorElement) {
        errorElement.textContent = 'El teléfono debe ser un número de máximo 10 caracteres';
      }
    }
  }

  validateIdentification(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const identification = inputElement.value.trim();
  
    if (/^\d{1,}$/.test(identification)) {
      // Si el número de identificación contiene solo números y tiene al menos 1 carácter, es válido
      inputElement.classList.remove('is-invalid');
      const errorElement = document.querySelector('.identification.text-danger');
      if (errorElement) {
        errorElement.textContent = '';
      }
    } else {
      // Si el número de identificación no cumple con el formato, mostrar un mensaje de error
      inputElement.classList.add('is-invalid');
      const errorElement = document.querySelector('.identification.text-danger');
      if (errorElement) {
        errorElement.textContent = 'El número de identificación debe ser un número';
      }
    }
  }

  
}
