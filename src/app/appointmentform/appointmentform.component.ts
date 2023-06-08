import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Service } from '../models/service.model';
import { Program } from '../models/program.model';
import { UserType } from '../models/user-type.model';
import { Psychologist } from '../models/psychologist.model';
import { Semester } from '../models/semester.model';
import { PsycologistByService } from '../models/psycologist-by-service.model';
import { DatesByPsycologist } from '../models/dates-by-psycologist.model'


@Component({
  selector: 'app-appointmentform',
  templateUrl: './appointmentform.component.html',
  styleUrls: ['./appointmentform.component.css']
})
export class AppointmentformComponent implements OnInit{
  time: DatesByPsycologist[];
  userType: string[];
  services: Service[];
  selectedService: string;
  psychologists: Psychologist[]; 
  psychologistsByService: PsycologistByService [];
  academics: string[];
  semesters: string[];
  selectedDate: string;
  selectedPsychologistCedula: string;
  selectedTipoVinculacion: string;
  showFields: boolean = false; // Agrega esta línea


  constructor(private dataService: DataService){}

  ngOnInit(): void {

    this.dataService.getServices().subscribe((servicios: Service[]) => {
      this.services = servicios; // Asignar el arreglo de objetos Service
    });
  

    this.dataService.getPrograms().subscribe((programas: Program[]) =>{
      this.academics = programas.map(programa => programa.programa);
    });


    this.dataService.getUserType().subscribe((tipoUsuarios: UserType[]) =>{
      this.userType = tipoUsuarios.map(tipoUsuario => tipoUsuario.tipo_paciente);
    });

    this.dataService.getSemesters().subscribe((semestres: Semester[]) =>{
      this.semesters = semestres.map(semestre => semestre.semestre);
    });
  }

  onTipoVinculacionSelected(event: any): void { // Agrega este método
    const selectedTipoVinculacion: string = event.target.value;
    this.showFields = selectedTipoVinculacion === 'Estudiante';
  }

  onServiceSelected(event: EventTarget): void {
    const selectElement = event as HTMLSelectElement;
    const selectedServiceId = selectElement.value; // Obtener el ID del servicio seleccionado
    
    console.log(selectedServiceId + "Hola");

    this.dataService.getPsychologistsByService(selectedServiceId).subscribe((psychologistsByService: PsycologistByService[]) => {
      this.psychologistsByService = psychologistsByService;
    });

    console.log(this.psychologists);
  }

  onDateSelected(event: any): void {
    const selectedDate: string = event.target.value;
    this.selectedDate = selectedDate;
    this.retrieveData();
    
  }
  
  onPsychologistSelected(event: any): void {
    const selectedPsychologistCedula: string = event.target.value;
    this.selectedPsychologistCedula = selectedPsychologistCedula;
    this.retrieveData();
  }
  
  retrieveData(): void {
    if (this.selectedDate && this.selectedPsychologistCedula) {
      console.log('fecha: ' + this.selectedDate);
      console.log('psicologo: ' + this.selectedPsychologistCedula);

      this.dataService.getDatesByPsycologist(this.selectedPsychologistCedula, this.selectedDate).subscribe((datesByPsycologist: DatesByPsycologist[]) =>{
        this.time = datesByPsycologist;
        console.log(this.time)
      });
    }
  }

  formatHour(hour: string): string {
    // Verificar si la cadena tiene el formato esperado
    if (/^\d{2}:\d{2}:\d{2}$/.test(hour)) {
      // Extraer solo las horas y los minutos
      return hour.substr(0, 5);
    } else {
      return hour; // Retornar la cadena sin cambios si no tiene el formato esperado
    }
  }
  
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
  

  validateCorreo(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const correo = inputElement.value.trim();

  if (correo === '') {
    // Si el campo está vacío, mostrar un mensaje de error
    inputElement.classList.add('is-invalid');
    const errorElement = document.querySelector('.correo.text-danger');
    if (errorElement) {
      errorElement.textContent = 'Por favor, ingresa un correo electrónico';
    }
  } else if (!inputElement.validity.valid) {
    // Si el formato del correo electrónico no es válido, mostrar un mensaje de error
    inputElement.classList.add('is-invalid');
    const errorElement = document.querySelector('.correo.text-danger');
    if (errorElement) {
      errorElement.textContent = 'El correo electrónico ingresado no es válido';
    }
  } else {
    // Si el correo electrónico es válido, eliminar cualquier mensaje de error y la clase de inválido
    inputElement.classList.remove('is-invalid');
    const errorElement = document.querySelector('.correo.text-danger');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }
}

validateEdad(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const edad = inputElement.value.trim();

  if (/^\d{0,2}$/.test(edad)) {
    // Si la edad contiene solo números y tiene máximo 2 caracteres, es válida
    inputElement.classList.remove('is-invalid');
    const errorElement = document.querySelector('.edad.text-danger');
    if (errorElement) {
      errorElement.textContent = '';
    }
  } else {
    // Si la edad no cumple con el formato o tiene más de 2 caracteres, mostrar un mensaje de error
    inputElement.classList.add('is-invalid');
    const errorElement = document.querySelector('.edad.text-danger');
    if (errorElement) {
      errorElement.textContent = 'La edad debe ser un número de máximo 2 caracteres';
    }
  }
}

validateTelefono(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const telefono = inputElement.value.trim();

  if (/^\d{0,10}$/.test(telefono)) {
    // Si el teléfono contiene solo números y tiene máximo 10 caracteres, es válido
    inputElement.classList.remove('is-invalid');
    const errorElement = document.querySelector('.telefono.text-danger');
    if (errorElement) {
      errorElement.textContent = '';
    }
  } else {
    // Si el teléfono no cumple con el formato o tiene más de 10 caracteres, mostrar un mensaje de error
    inputElement.classList.add('is-invalid');
    const errorElement = document.querySelector('.telefono.text-danger');
    if (errorElement) {
      errorElement.textContent = 'El teléfono debe ser un número de máximo 10 caracteres';
    }
  }
}



}
