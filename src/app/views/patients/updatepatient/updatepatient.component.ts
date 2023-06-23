import { Component, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient/patient.model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Gender } from 'src/app/models/gender.model';
import { GenderService } from 'src/app/services/gender/gender.service';
import { PatientType } from 'src/app/models/patienttype/patienttype.model';
import { PatienttypesService } from 'src/app/services/patienttypes/patienttypes.service';


@Component({
  selector: 'app-updatepatient',
  templateUrl: './updatepatient.component.html',
  styleUrls: ['./updatepatient.component.css'],
  providers: [PatientService, ModalService, GenderService, PatienttypesService]
})
export class UpdatepatientComponent {
  @ViewChild('content') content: any;
  patientId = '';
  patient: Patient;
  genders: Gender[] = [];
  patientTypes: PatientType[] = [];
  modalTitle: string;
  modalBody: string;
  searchComplete = false;
  editingNotes = false;

  constructor(
    private patientService: PatientService,
    private modalService: ModalService,
    private genderService: GenderService,
    private patientTypeService: PatienttypesService
  ) {}

  ngOnInit() {
    this.loadGenders();
    this.loadPatientTypes();
  }

  loadGenders() {
    this.genderService.getGenders().subscribe(
      (genders: Gender[]) => {
        this.genders = genders;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadPatientTypes() {
    this.patientTypeService.getPatientTypes().subscribe(
      (patientTypes: PatientType[]) => {
        this.patientTypes = patientTypes;
      },
      (error) => {
        console.log(error);
      }
    );
  }

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

  updatePatient() {
    if (this.patient) {
      this.patientService.updatePatient(this.patient).subscribe(
        (updatedPatient: Patient) => {
          this.openModal(
            'Paciente actualizado',
            'Los datos del paciente han sido actualizados correctamente.'
          );
        },
        (error) => {
          this.openModal(
            'Error al actualizar el Paciente',
            `${error.error}`
          );
        }
      );
    }
  }
}
