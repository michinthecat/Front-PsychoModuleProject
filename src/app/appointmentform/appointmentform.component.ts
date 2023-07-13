import { Component, OnInit, ViewChild  } from '@angular/core';
import { DataService } from '../services/lambda/data.service';
import { Service } from '../models/lambda/service/service.model';
import { Program } from '../models/program/program.model';
import { PatientType } from '../models/lambda/patienttype/patienttype.model';
import { Semester } from '../models/semester/semester.model';
import { PsycologistByService } from '../models/psychologist/psycologist-by-service.model';
import { DatesByPsycologist } from '../models/schedule/dates-by-psycologist.model'
import { StudentAppointmentData } from '../models/lambda/appointment/student-appointment-data.model'
import { ExternalAppointmentData } from '../models/lambda/appointment/external-appointment-data.model'
import { Gender} from '../models/gender/gender.model'
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../services/lambda/validation.service';


@Component({
  selector: 'app-appointmentform',
  templateUrl: './appointmentform.component.html',
  styleUrls: ['./appointmentform.component.css']
})
export class AppointmentformComponent implements OnInit{
  @ViewChild('content') content: any;
  @ViewChild('programSelect') programSelect: any;
  @ViewChild('semesterSelect') semesterSelect: any;
  @ViewChild('genderSelect') genderSelect: any;
  @ViewChild('dateInput') dateInput: any;

  selectedTime: string | null = null;
  time: DatesByPsycologist[];
  userType: PatientType[];
  services: Service[];
  genders: Gender[];
  selectedService: string;
  psychologistsByService: PsycologistByService [];
  academics: Program[];
  semesters: Semester[];
  selectedDate: string;
  selectedPsychologistId: string;
  selectedLinkage: string;
  showFields: boolean = false;
  modalTitle = '';
  modalBody = '';
  inputControl: FormControl = new FormControl();
  appointmentForm: FormGroup;
  termsAccepted: boolean = false;


  constructor(private modalService: NgbModal, private dataService: DataService, private validationService: ValidationService){}
  ngOnInit(): void {

    this.dataService.getGenders().subscribe((gender: Gender[]) => {
      this.genders = gender;
    });
     this.dataService.getServices().subscribe((service: Service[]) => {
       this.services = service; // Asignar el arreglo de objetos Service
     });
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

  onLinkageSelected(selectedLinkage: string): void {
    this.showFields = selectedLinkage === '1';
  }
  
  onServiceSelected(selectedService: string): void {
    if (selectedService) {
      console.log('Servicio: ' + selectedService);
      this.dataService.getPsychologistsByService(selectedService).subscribe((psychologistsByService: PsycologistByService[]) => {
        this.psychologistsByService = psychologistsByService;
      });
    } else {
      console.log('Error: selectedService is null or undefined');
    }
  }
  
  onDateSelected(event: any): void {
    if (event.target && event.target.value) {
      const selectedDate: string = event.target.value;
      this.selectedDate = selectedDate;
      this.retrieveData();
    }
  }

  onPsychologistSelected(event: any): void {
    if (event && event.target && event.target.value) {
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

  selectTime(time: string): void {
    if (this.selectedTime === time) {
      this.selectedTime = null; 
    } else {
      this.selectedTime = time; 
    }
  }


  formatHour(hour: string): string {
    if (/^\d{2}:\d{2}:\d{2}$/.test(hour)) {
      return hour.substr(0, 5);
    } else {
      return hour; 
    }
  }

  validateInput(event: Event, fieldName: string): void {
    this.validationService.validateInput(event, fieldName);
  }

  validateEmail(event: Event): void {
  this.validationService.validateEmail(event);
  }

  validateAge(event: Event): void {
    this.validationService.validateAge(event);
  }

  validatePhone(event: Event): void {
    this.validationService.validatePhone(event);
  }

  validateIdentification(event: Event): void {
    this.validationService.validateIdentification(event);
  }

  createAppointment(): void{
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const last_name = (document.getElementById('lastname') as HTMLInputElement).value;
    const identification = (document.getElementById('identification') as HTMLInputElement).value;
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
      const studentAppointmentData:  StudentAppointmentData= {name, last_name, identification, email, linkage, program, semester, gender, age, phone,
        service, psychologist, date, time
      };
       this.dataService.createStudentAppointment(studentAppointmentData)
       .subscribe(
         (response) => {
          console.log('Cita creada exitosamente:', response);
          this.modalTitle = 'Cita creada exitosamente';
          this.modalBody = `Hemos enviado un mensaje de texto al ${phone} con los pasos necesarios para confirmar tu cita, Gracias por elegirnos, ¡te esperamos en la Universidad de Ibagué!`;
          this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
         },
         (error) => {
          console.error('Error al crear la cita:', error);
           this.modalTitle = 'Hubo un error al crear la cita';
           this.modalBody = `Hemos tenido problemas para agendar tu cita, por favor intenta de nuevo o comunícate a las líneas de atención de la Universidad de Ibagué!`;
           this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
           console.error('Error al crear la cita:', error);
         }
       );
    }
    else{
      const externalAppointmentData: ExternalAppointmentData = { name, last_name, identification, email, linkage, gender, age, phone, service, psychologist,
        date, time
      };
      this.dataService.createExternalAppointment(externalAppointmentData)
      .subscribe(
        (response) => {
          console.log('Cita creada exitosamente:', response);
          this.modalTitle = 'Cita creada exitosamente';
          this.modalBody = `Hemos enviado un mensaje de texto al ${phone} con los pasos necesarios para confirmar tu cita, Gracias por elegirnos, ¡te esperamos en la Universidad de Ibagué!`;
          this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
        },
        (error) => {
          console.error('Error al crear la cita:', error);
           this.modalTitle = 'Hubo un error al crear la cita';
           this.modalBody = `Hemos tenido problemas para agendar tu cita, por favor intenta de nuevo o comunícate a las líneas de atención de la Universidad de Ibagué`;
           this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
        }
      );
    }


  }
  resetForm(): void {
    this.inputControl.setValue('');
    this.selectedLinkage = null;
    this.genderSelect.nativeElement.value = null;
    this.selectedService = null;
    this.selectedPsychologistId = null;
    this.dateInput.nativeElement.value = '';
    this.time = [];
    if (this.showFields) {
      this.programSelect.nativeElement.value = null;
      this.programSelect.nativeElement.value = null;
      this.semesterSelect.nativeElement.value = null;
    }
    this.termsAccepted = false;
  }
}
