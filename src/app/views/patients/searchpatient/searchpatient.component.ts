import { Component, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { PatientService } from '../../../services/patient/patient.service';
import { ModalService } from '../../../services/modal/modal.service';
import { DateFormatService } from '../../../services/date-format/date-format.service';


@Component({
  selector: 'app-searchpatient',
  templateUrl: './searchpatient.component.html',
  styleUrls: ['./searchpatient.component.css'],
  providers: [PatientService, ModalService, DateFormatService]
})
export class SearchpatientComponent {
  @ViewChild('content') content: any;
  patientId = '';
  patient: Patient;
  modalTitle: string;
  modalBody: string;
  searchComplete = false;

  constructor(
    private patientService: PatientService,
    private modalService: ModalService,
  ) {}

  searchPatient() {
    if (this.patientId) {
      this.patientService.getPatient(this.patientId).subscribe(
        (patient: Patient) => {
          this.handlePatientSuccess(patient);
        },
        (error) => {
          this.openModal(
            'Error al buscar el Paciente',
            `${error.error}`
          );
        }
      );
    }
  }

  getGenderEmoji(gender: string): string {
    if (gender === 'Femenino') {
      return '♀️';
    } else if (gender === 'Masculino') {
      return '♂️';
    } else {
      return '⚪️';
    }
  }

  handlePatientSuccess(patient: Patient) {
    this.patient = patient;
    this.searchComplete = true;
  }

  openModal(title: string, body: string) {
    this.modalService.openModal(this.content);
    this.modalTitle = title;
    this.modalBody = body;
  }

  clearSearch() {
    this.patientId = '';
    this.patient = null;
    this.searchComplete = false;
  }
}
