import { Component, OnInit, ViewChild  } from '@angular/core';
import { DataService } from '../services/data.service';
import { ServicesPsycho } from '../models/servicespsycho/servicespsycho.model';
import { Program } from '../models/program/program.model';
import { PatientType } from '../models/patienttype/patienttype.model';
import { Semester } from '../models/semester/semester.model';
import { PsycologistByService } from '../models/psychologist/psycologist-by-service.model';
import { DatesByPsycologist } from '../models/schedule/dates-by-psycologist.model'
import { StudentAppointmentData } from '../models/appointment/student-appointment-data.model'
import { ExternalAppointmentData } from '../models/appointment/external-appointment-data.model'
import { Gender} from '../models/gender/gender.model'
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointmentform',
  templateUrl: './appointmentform.component.html',
  styleUrls: ['./appointmentform.component.css']
})
export class AppointmentformComponent implements OnInit{
  @ViewChild('content') content: any;
  time: DatesByPsycologist[];
  userType: PatientType[];
  services: ServicesPsycho[];
  genders: Gender[];
  selectedService: string;
  psychologistsByService: PsycologistByService [];
  academics: Program[];
  semesters: Semester[];
  selectedDate: string;
  selectedPsychologistId: string;
  selectedLinkage: string;
  showFields: boolean = false;
  selectedTime: string;
  closeButton: HTMLElement = document.getElementById('close-button');

  modalTitle = '';
  modalBody = '';



  constructor(private modalService: NgbModal, private dataService: DataService){}


  ngOnInit(): void {

    this.dataService.getGenders().subscribe((gender: Gender[]) => {
      this.genders = gender;
    });

    // this.dataService.getServices().subscribe((service: Service[]) => {
    //   this.services = service; // Asignar el arreglo de objetos Service
    // });


    this.dataService.getPrograms().subscribe((program: Program[]) =>{
      this.academics = program;
    });


    this.dataService.getUserType().subscribe((userType: PatientType[]) =>{
      this.userType = userType;
    });

    this.dataService.getSemesters().subscribe((semester: Semester[]) =>{
      this.semesters = semester;
    });

  }




  onLinkageSelected(event: any): void { // Agrega este método
    const selectedLinkage: string = event.target.value;
    this.showFields = selectedLinkage === '1';
  }


  onServiceSelected(selectedService: string): void {
    console.log(selectedService);

    this.dataService.getPsychologistsByService(selectedService).subscribe((psychologistsByService: PsycologistByService[]) => {
      this.psychologistsByService = psychologistsByService;
    });
  }



  onDateSelected(event: any): void {
    if (event.target && event.target.value) {
      const selectedDate: string = event.target.value;
      this.selectedDate = selectedDate;
      this.retrieveData();
    }
  }

  onPsychologistSelected(event: any): void {
    if (event.target && event.target.value) {
      const selectedPsychologistId: string = event.target.value;
      this.selectedPsychologistId = selectedPsychologistId;
      this.retrieveData();
    }
  }

  retrieveData(): void {
    if (this.selectedDate && this.selectedPsychologistId) {
      console.log('fecha: ' + this.selectedDate);
      console.log('psicologo: ' + this.selectedPsychologistId);

      this.dataService.getDatesByPsycologist(this.selectedPsychologistId, this.selectedDate).subscribe((datesByPsycologist: DatesByPsycologist[]) => {
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




  createAppointment(): void{

    console.log('Hola desde createAppointment')

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const last_name = (document.getElementById('lastname') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const linkage = (document.getElementById('linkage') as HTMLSelectElement).value;
    const program = (document.getElementById('program') as HTMLInputElement)?.value;
    const semester = (document.getElementById('semester') as HTMLInputElement)?.value;
    const gender =   (document.getElementById('gender') as HTMLInputElement)?.value;
    const age = (document.getElementById('age') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const service = (document.getElementById('service') as HTMLInputElement).value;
    const psychologist = (document.getElementById('psychologist') as HTMLInputElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const time = this.selectedTime;


    if(linkage === '1'){

      const studentAppointmentData:  StudentAppointmentData= {
        name,
        last_name,
        email,
        linkage,
        program,
        semester,
        gender,
        age,
        phone,
        service,
        psychologist,
        date,
        time
      };

      console.log(studentAppointmentData);
       this.dataService.createStudentAppointment(studentAppointmentData)
       .subscribe(
         (response) => {

          this.modalTitle = 'Cita Creada Exitosamente';
          this.modalBody = `Su Cita Fue Creada Exitosamente, por favor espere la confirmación de su cita al telefono ${phone}`;
          this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
          console.log('Cita creada exitosamente:', response);
          this.resetFormulario();

         },
         (error) => {

           this.modalTitle = 'Hubo un error al crear la cita';
           this.modalBody = `Hemos tenido problemas para agendar tu cita, por favor intenta de nuevo o comunícate a las líneas de atención de la Universidad de Ibagué`;
           this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
           console.error('Error al crear la cita:', error);
           // Manejar el error de creación de cita
           this.resetFormulario;
         }
       );

    }
    else{
      const externalAppointmentData: ExternalAppointmentData = {
        name,
        last_name,
        email,
        linkage,
        gender,
        age,
        phone,
        service,
        psychologist,
        date,
        time
      };

      console.log(externalAppointmentData);
      this.dataService.createExternalAppointment(externalAppointmentData)
      .subscribe(
        (response) => {
          console.log('Cita creada exitosamente:', response);
          this.modalTitle = 'Cita creada exitosamente';
          this.modalBody = `Hemos enviado un mensaje de texto al ${phone} con los pasos necesarios para confirmar tu cita, Gracias por elegirnos, ¡te esperamos en la Universidad de Ibagué!`;
          this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al crear la cita:', error);
           this.modalTitle = 'Hubo un error al crear la cita';
           this.modalBody = `Hemos tenido problemas para agendar tu cita, por favor intenta de nuevo o comunícate a las líneas de atención de la Universidad de Ibagué`;
           this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
          // Manejar el error de creación de cita
          this.resetFormulario;

        }
      );
    }


  }



  resetFormulario(): void {
    // Restablece los valores del formulario
    const formulario: HTMLFormElement = document.getElementById('contacto') as HTMLFormElement;
    formulario.reset;
  }

}
