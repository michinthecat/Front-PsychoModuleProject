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
      const url = `http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com/appointment/${this.appointmentId}`;
      this.http.get<Appointment>(url).subscribe(
        (appointment: Appointment) => {
          this.handleAppointmentSuccess(appointment);
        },
        (error) => {
          this.handleAppointmentError(error);
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

  handleAppointmentError(error: any) {
    this.openModal('Error al buscar la cita', `Hubo un error al buscar la cita con ID ${this.appointmentId}. Error: ${error.message}`);
  }

  rescheduleAppointment() {
    if (this.appointmentId && this.newAppointmentDate) {
      const rescheduleUrl = `http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com/appointment/${this.appointmentId}/reschedule?newDate=${this.newAppointmentDate}`;
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

  cancelAppointment() {
    if (this.appointmentId) {
      const cancelUrl = `http://apirest-aws-psyco-env.eba-bpusjxfs.us-east-1.elasticbeanstalk.com/appointment/${this.appointmentId}/cancel`;
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

  formatDate(dateString: string): string {
    const day = dateString.slice(8, 10);
    const month = dateString.slice(5, 7);
    const year = dateString.slice(0, 4);
    const hourMinute = dateString.slice(11, 16);

    return `${day}/${month}/${year} ${hourMinute}`;
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
