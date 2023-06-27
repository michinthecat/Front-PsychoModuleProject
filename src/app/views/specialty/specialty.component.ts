import { Component, OnInit } from '@angular/core';
import { Specialty } from 'src/app/models/specialty/specialty.model';
import { SpecialtyService } from 'src/app/services/api-consume/specialty/specialty.service';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css'],
})
export class SpecialtyComponent implements OnInit {
  specialties: Specialty[];
  newSpecialty: Specialty = {
    id: 0,
    specialty: '',
  };
  modalOpen: boolean = false;
  editModalOpen: boolean = false;
  successModalOpen: boolean = false;
  errorModalOpen: boolean = false;
  deleteErrorModalOpen: boolean = false;
  selectedSpecialty: Specialty = {
    id: 0,
    specialty: '',
  };

  constructor(private specialtyService: SpecialtyService) {}

  ngOnInit() {
    this.getAllSpecialties();
  }

  getAllSpecialties() {
    this.specialtyService.getAllSpecialties().subscribe(
      (specialties: Specialty[]) => {
        this.specialties = specialties;
      },
      (error) => {
        console.error('Error fetching specialties:', error);
      }
    );
  }

  createSpecialty() {
    this.specialtyService.createSpecialty(this.newSpecialty).subscribe(
      (createdSpecialty: Specialty) => {
        console.log('Specialty created:', createdSpecialty);
        this.successModalOpen = true;
        this.closeModal();
        this.getAllSpecialties();
      },
      (error) => {
        console.error('Error creating specialty:', error);
        this.errorModalOpen = true;
      }
    );
  }

  updateSpecialty() {
    this.specialtyService
      .updateSpecialty(this.selectedSpecialty.id, this.selectedSpecialty)
      .subscribe(
        (updatedSpecialty: Specialty) => {
          console.log('Specialty updated:', updatedSpecialty);
          this.successModalOpen = true;
          this.closeEditModal();
          this.getAllSpecialties();
        },
        (error) => {
          console.error('Error updating specialty:', error);
          this.errorModalOpen = true;
        }
      );
  }

  deleteSpecialty(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta especialidad?')) {
      this.specialtyService.deleteSpecialty(id).subscribe(
        () => {
          this.getAllSpecialties();
        },
        (error) => {
          console.error('Error deleting specialty:', error);
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

  openEditModal(specialty: Specialty) {
    this.selectedSpecialty = { ...specialty };
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
}
