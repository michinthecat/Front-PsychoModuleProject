import { Component, OnInit } from '@angular/core';
import { ServicesPsycho } from 'src/app/models/servicespsycho/servicespsycho.model';
import { ServicespsychoService } from 'src/app/services/api-consume/servicespsycho/servicespsycho.service';

@Component({
  selector: 'app-servicespsycho',
  templateUrl: './servicespsycho.component.html',
  styleUrls: ['./servicespsycho.component.css'],
})
export class ServicespsychoComponent implements OnInit {
  services: ServicesPsycho[];
  newService: ServicesPsycho = {
    id: 0,
    serviceName: '',
    description: '',
    cost: 0,
  };
  modalOpen: boolean = false;
  editModalOpen: boolean = false;
  successModalOpen: boolean = false;
  errorModalOpen: boolean = false;
  deleteErrorModalOpen: boolean = false;
  selectedService: ServicesPsycho = {
    id: 0,
    serviceName: '',
    description: '',
    cost: 0,
  };

  constructor(private servicespsychoService: ServicespsychoService) {}

  ngOnInit() {
    this.getAllServicesPsycho();
  }

  getAllServicesPsycho() {
    this.servicespsychoService.getAllServicesPsycho().subscribe(
      (services: ServicesPsycho[]) => {
        this.services = services;
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  createService() {
    this.servicespsychoService.createServicesPsycho(this.newService).subscribe(
      (createdService: ServicesPsycho) => {
        console.log('Service created:', createdService);
        this.successModalOpen = true;
        this.closeModal();
        this.getAllServicesPsycho();
      },
      (error) => {
        console.error('Error creating service:', error);
        this.errorModalOpen = true;
      }
    );
  }

  updateService() {
    this.servicespsychoService
      .updateServicesPsycho(this.selectedService.id, this.selectedService)
      .subscribe(
        (updatedService: ServicesPsycho) => {
          console.log('Service updated:', updatedService);
          this.successModalOpen = true;
          this.closeEditModal();
          this.getAllServicesPsycho();
        },
        (error) => {
          console.error('Error updating service:', error);
          this.errorModalOpen = true;
        }
      );
  }

  deleteService(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.servicespsychoService.deleteServicesPsycho(id).subscribe(
        () => {
          this.getAllServicesPsycho();
        },
        (error) => {
          console.error('Error deleting service:', error);
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

  openEditModal(service: ServicesPsycho) {
    this.selectedService = { ...service };
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
