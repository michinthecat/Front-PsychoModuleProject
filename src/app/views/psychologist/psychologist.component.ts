import { Component, OnInit } from '@angular/core';
import { Psychologist } from 'src/app/models/psychologist/psychologist.model';
import { PsychologistService } from 'src/app/services/api-consume/psychologist/psychologist.service';
import { Specialty } from 'src/app/models/specialty/specialty.model';
import { SpecialtyService } from 'src/app/services/api-consume/specialty/specialty.service';
import { ServicesPsycho } from 'src/app/models/servicespsycho/servicespsycho.model';
import { ServicespsychoService } from 'src/app/services/api-consume/servicespsycho/servicespsycho.service';

@Component({
  selector: 'app-psychologist',
  templateUrl: './psychologist.component.html',
  styleUrls: ['./psychologist.component.css']
})
export class PsychologistComponent implements OnInit {
  psychologists: Psychologist[];
  newPsychologist: Psychologist = {
    id: 0,
    name: '',
    lastName: '',
    email: '',
    specialty: { id: 0, specialty: '' },
    role: { id: 0, role: '' },
    services: []
  };
  modalOpen: boolean = false;
  editModalOpen: boolean = false;
  successModalOpen: boolean = false;
  errorModalOpen: boolean = false;
  deleteErrorModalOpen: boolean = false;
  selectedPsychologist: Psychologist = {
    id: 0,
    name: '',
    lastName: '',
    email: '',
    specialty: { id: 0, specialty: '' },
    role: { id: 0, role: '' },
    services: []
  };
  specialties: Specialty[];
  services: ServicesPsycho[];

  constructor(
    private psychologistService: PsychologistService,
    private specialtyService: SpecialtyService,
    private servicesPsychoService: ServicespsychoService
  ) {}

  ngOnInit() {
    this.getAllPsychologists();
    this.getAllSpecialties();
    this.getAllServices();
  }

  getAllPsychologists() {
    this.psychologistService.getAllPsychologists().subscribe(
      (psychologists: Psychologist[]) => {
        this.psychologists = psychologists;
      },
      error => {
        console.error('Error fetching psychologists:', error);
      }
    );
  }

  getAllSpecialties() {
    this.specialtyService.getAllSpecialties().subscribe(
      (specialties: Specialty[]) => {
        this.specialties = specialties;
      },
      error => {
        console.error('Error fetching specialties:', error);
      }
    );
  }

  getAllServices() {
    this.servicesPsychoService.getAllServicesPsycho().subscribe(
      (services: ServicesPsycho[]) => {
        this.services = services;
      },
      error => {
        console.error('Error fetching services:', error);
      }
    );
  }

  createPsychologist() {
    this.psychologistService.createPsychologist(this.newPsychologist).subscribe(
      (createdPsychologist: Psychologist) => {
        console.log('Psychologist created:', createdPsychologist);
        this.successModalOpen = true;
        this.closeModal();
        this.getAllPsychologists();
      },
      error => {
        console.error('Error creating psychologist:', error);
        this.errorModalOpen = true;
      }
    );
  }

  updatePsychologist() {
    this.psychologistService.updatePsychologist(this.selectedPsychologist.id, this.selectedPsychologist).subscribe(
      (updatedPsychologist: Psychologist) => {
        console.log('Psychologist updated:', updatedPsychologist);
        this.successModalOpen = true;
        this.closeEditModal();
        this.getAllPsychologists();
      },
      error => {
        console.error('Error updating psychologist:', error);
        this.errorModalOpen = true;
      }
    );
  }

  deletePsychologist(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar a este psicólogo?')) {
      this.psychologistService.deletePsychologist(id).subscribe(
        () => {
          this.getAllPsychologists();
        },
        error => {
          console.error('Error deleting psychologist:', error);
          this.deleteErrorModalOpen = true;
        }
      );
    }
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  openEditModal(psychologist: Psychologist) {
    this.selectedPsychologist = { ...psychologist };
    this.editModalOpen = true;
  }

  closeEditModal() {
    this.editModalOpen = false;
  }

  closeSuccessModal() {
    this.successModalOpen = false;
  }

  closeErrorModal() {
    this.errorModalOpen = false;
  }

  closeDeleteErrorModal() {
    this.deleteErrorModalOpen = false;
  }

  toggleService(service: ServicesPsycho) {
    const index = this.selectedPsychologist.services.findIndex(s => s.id === service.id);
    if (index > -1) {
      this.selectedPsychologist.services.splice(index, 1); // Remove service
    } else {
      this.selectedPsychologist.services.push(service); // Add service
    }
  }

  isServiceSelected(service: ServicesPsycho): boolean {
    return this.selectedPsychologist.services.some(s => s.id === service.id);
  }
}
