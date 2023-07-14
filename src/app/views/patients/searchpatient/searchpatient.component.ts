import { Component, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { PatientService } from '../../../services/api-consume/patient/patient.service';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-searchpatient',
  templateUrl: './searchpatient.component.html',
  styleUrls: ['./searchpatient.component.css'],
  providers: [PatientService, ModalService],
})
export class SearchpatientComponent {
  @ViewChild('content') content: any;
  patientId = '';
  patient: Patient;
  modalTitle: string;
  modalBody: string;
  searchComplete = false;
  editingNotes = false;
  editedNotes: string;
  statusText = false;

  constructor(
    private patientService: PatientService,
    private modalService: ModalService
  ) {}

  searchPatient() {
    if (this.patientId) {
      this.patientService.getPatient(this.patientId).subscribe(
        (patient: Patient) => {
          this.handlePatientSuccess(patient);
        },
        (error) => {
          this.openModal('Error al buscar el Paciente', `${error.error}`);
        }
      );
    }
  }

  editNotes() {
    this.editingNotes = true;
    this.editedNotes = this.patient.notes;
  }

  saveNotes() {
    this.patientService
      .updatePatientNotes(this.patient.id.toString(), this.editedNotes)
      .subscribe(
        (response) => {
          this.openModal(
            'Actualización Exitosa',
            `Datos Actualizados Exitosamente`
          );
          this.statusText = false;
          this.patient.notes = response.notes;
        },
        (error) => {
          this.openModal(
            'Error al Actualizar los Datos Del Paciente',
            `${error.error}`
          );
        }
      );
    this.editingNotes = false;
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
    this.modalTitle = title;
    this.modalBody = body;
    this.modalService.openModal(this.content);
  }

  clearSearch() {
    this.patientId = '';
    this.patient = null;
    this.searchComplete = false;
    this.editingNotes = false;
  }

  setCursorPosition(event: any): void {


    if(this.statusText == false){
    const textarea = event.target as HTMLTextAreaElement;
    textarea.selectionStart = textarea.value.length;
    textarea.selectionEnd = textarea.value.length;
    this.statusText =  true;
  }
}
}
