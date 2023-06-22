import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Appointment, Psychologist, Patient, Service, State } from 'src/app/models/appointment/appointment.model';

@Component({
  selector: 'app-searchappointment',
  templateUrl: './searchappointment.component.html',
  styleUrls: ['./searchappointment.component.css']
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
  searchComplete: boolean = false;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  searchAppointment() {
    if (this.appointmentId) {
      const url = `http://localhost:5000/appointment/${this.appointmentId}`;
      this.http.get<Appointment>(url).subscribe(
        (appointment: Appointment) => {
          this.appointment = appointment;
          this.patient = appointment.patient;
          this.psychologist = appointment.psychologist;
          this.service = appointment.service;
          this.state = appointment.state;
          this.searchComplete = true;
        },
        (error) => {
          this.openModal('Error al buscar la cita', `Hubo un error al buscar la cita con ID ${this.appointmentId}. Error: ${error.message}`);
        }
      );
    }
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

  cancelAppointment() {
    if (this.appointmentId) {
      const cancelUrl = `http://localhost:5000/appointment/${this.appointmentId}/cancel`;
      this.http.put(cancelUrl, {}, { responseType: 'text' }).subscribe(
        () => {
          this.searchAppointment();
          this.openModal('Cita Cancelada', `La cita con ID ${this.appointmentId} ha sido cancelada exitosamente.`);
        },
        (error) => {
          this.openModal('Error al Cancelar la Cita', `Hubo un error al intentar cancelar la cita con ID ${this.appointmentId}. Error: ${error}`);
        }
      );
    }
  }

  openModal(title: string, body: string) {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
    this.modalTitle = title;
    this.modalBody = body;
  }

  openRescheduleModal() {
    this.rescheduleModalRef = this.modalService.open(this.rescheduleModal, { ariaLabelledBy: 'modal-basic-title' });
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


  rescheduleAppointment() {
    if (this.appointmentId && this.newAppointmentDate) {
      const rescheduleUrl = `http://localhost:5000/appointment/${this.appointmentId}/reschedule?newDate=${this.newAppointmentDate}`;
      this.http.put(rescheduleUrl, {}).subscribe(
        () => {
          this.newAppointmentDate = this.newAppointmentDate;
          this.rescheduleModalRef.close('reprogramadoExitosamente');
          this.openModal('Cita Reprogramada', `La cita con ID ${this.appointmentId} ha sido reprogramada exitosamente.`);
        },
        (error) => {
          this.openModal('Error al Reprogramar la Cita', `Hubo un error al intentar reprogramar la cita con ID ${this.appointmentId}. Error: ${error}`);
        }
      );
    }
  }

}
