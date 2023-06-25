import { Component, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Appointment, Patient, Psychologist, Service, State } from 'src/app/models/appointment/appointment.model';
import { AppointmentService } from '../../../services/api-consume/appointment/appointment.service';
import { ModalService } from '../../../services/modal/modal.service';
import { DateFormatService } from '../../../services/date-format/date-format.service';

@Component({
  selector: 'app-searchappointment',
  templateUrl: './searchappointment.component.html',
  styleUrls: ['./searchappointment.component.css'],
  providers: [AppointmentService, ModalService, DateFormatService]
})
export class SearchappointmentComponent {
  @ViewChild('content') content: any;
  @ViewChild('rescheduleModal') rescheduleModal: any;
  appointmentId = '';
  appointment: Appointment;
  patient: Patient;
  psychologist: Psychologist;
  service: Service;
  state: State;
  modalTitle: string;
  modalBody: string;
  newAppointmentDate: string;
  rescheduleModalRef: NgbModalRef;
  searchComplete = false;

  constructor(
    private appointmentService: AppointmentService,
    private modalService: ModalService,
    private dateFormatService: DateFormatService
  ) {}


  searchAppointment() {
    if (this.appointmentId) {
      this.appointmentService.searchAppointment(this.appointmentId).subscribe(
        (appointment: Appointment) => {
          this.handleAppointmentSuccess(appointment);
        },
        (error) => {
          this.openModal(
            'Error al buscar la cita',
            `Error: ${error.error}`
          );
        }
      );
    }
  }

  handleAppointmentSuccess(appointment: Appointment) {
    this.appointment = appointment;
    this.patient = appointment.patient;
    this.psychologist = appointment.psychologist;
    this.service = appointment.service;
    this.state = appointment.state;
    this.searchComplete = true;
  }


  rescheduleAppointment() {
    if (this.appointmentId && this.newAppointmentDate) {
      this.appointmentService.rescheduleAppointment(this.appointmentId, this.newAppointmentDate).subscribe(
        () => {
          this.newAppointmentDate = this.newAppointmentDate;
          this.rescheduleModalRef.close('reprogramadoExitosamente');
          this.openModal(
            'Cita Reprogramada ✅',
            `La cita con ID ${this.appointmentId} ha sido reprogramada exitosamente.`
          );
        },
        (error) => {
          this.openModal(
            'Error al Reprogramar la Cita',
            `Hubo un error al intentar reprogramar la cita con ID ${this.appointmentId}. Codigo: ${error.error}`
          );
        }
      );
    }
  }

  cancelAppointment() {
    if (this.appointmentId) {
      this.appointmentService.cancelAppointment(this.appointmentId).subscribe(
        () => {
          this.openModal(
            'Cita Cancelada',
            `La cita con ID ${this.appointmentId} ha sido cancelada exitosamente.`
          );
          this.searchAppointment();
        },
        (error) => {
          this.openModal(
            'Error al Cancelar la Cita',
            `Hubo un error al intentar cancelar la cita con ID ${this.appointmentId}. Codigo: ${error.error}`
          );
        }
      );
    }
  }

  openModal(title: string, body: string) {
    this.modalService.openModal(this.content);
    this.modalTitle = title;
    this.modalBody = body;
  }

  openRescheduleModal() {
    this.rescheduleModalRef = this.modalService.openModal(this.rescheduleModal);
    if (this.rescheduleModalRef) {
      this.rescheduleModalRef.result.then(
        (result) => {
          if (result === 'reprogramadoExitosamente') {
            this.searchAppointment();
          }
        },
        (reason) => {
          if (reason === 'reprogramadoExitosamente') {
            this.searchAppointment();
          }
        }
      );
    }
  }

  formatDate(dateString: string): string {
    return this.dateFormatService.formatDate(dateString);
  }

  clearSearch() {
    this.appointmentId = '';
    this.appointment = null;
    this.patient = null;
    this.psychologist = null;
    this.service = null;
    this.state = null;
    this.searchComplete = false;
  }
}
