import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment/appointment.model';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatService } from 'src/app/services/date-format/date-format.service';

@Component({
  selector: 'app-showappointment',
  templateUrl: './showappointment.component.html',
  styleUrls: ['./showappointment.component.css'],
  providers: [AppointmentService, DateFormatService]
})
export class ShowAppointmentComponent {
  selectedDate: string;
  appointments: Appointment[];
  selectedAppointment: Appointment;
  modalRef: NgbModalRef;


  constructor(
    private appointmentService: AppointmentService,
    private modalService: NgbModal,
    private dateFormatService: DateFormatService
  ) {}

  searchAppointmentsByDateAndPsychologist() {
    if (this.selectedDate) {
      const psychologistId = '1110585229';

      this.appointmentService
        .getAllAppointmentsByDateAndPsychologistId(this.selectedDate, psychologistId)
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
