import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment/appointment.model';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatService } from 'src/app/services/date-format/date-format.service';
import { CognitoService } from 'src/app/services/cognito.service';


@Component({
  selector: 'app-showappointment',
  templateUrl: './showappointment.component.html',
  styleUrls: ['./showappointment.component.css'],
  providers: [AppointmentService, DateFormatService, CognitoService]
})
export class ShowAppointmentComponent implements OnInit {
  selectedDate: string;
  appointments: Appointment[];
  selectedAppointment: Appointment;
  modalRef: NgbModalRef;
  psychologistId: string;

  constructor(
    private appointmentService: AppointmentService,
    private modalService: NgbModal,
    private dateFormatService: DateFormatService,
    private cognitoService: CognitoService
  ) {}

  ngOnInit() {
    this.cognitoService.getAttributes().subscribe(
      attributes => {
        const nicknameAttribute = attributes.find(attr => attr.Name === 'nickname');
        if (nicknameAttribute) {
          this.psychologistId = nicknameAttribute.Value;
        } else {
          console.log('No se encontro la cedula del psicologo en Cognito');
        }
      },
      error => {
        console.log('Error de Obtencion: ', error);
      }
    );
  }

  searchAppointmentsByDateAndPsychologist() {
    if (this.selectedDate && this.psychologistId) {
      this.appointmentService
        .getAllAppointmentsByDateAndPsychologistId(this.selectedDate, this.psychologistId)
        .subscribe(
          (appointments: Appointment[]) => {
            this.appointments = appointments;
          },
          (error) => {
            console.log('Error:', error);
          }
        );
    }
  }

  formatDate(dateString: string): string {
    return this.dateFormatService.formatDate(dateString);
  }

  getStatusColor(status: string): string {
    if (status === 'Pendiente') {
      return 'text-warning';
    } else if (status === 'Confirmado') {
      return 'text-success';
    } else if (status === 'Cancelado') {
      return 'text-danger';
    }
    return '';
  }

  openModal(content: any, appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-title', centered: true });
  }

  closeModal() {
    this.modalRef.close();
  }
}
