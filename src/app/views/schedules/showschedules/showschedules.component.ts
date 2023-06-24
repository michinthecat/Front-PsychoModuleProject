import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/models/schedule/schedule.mode';
import { SchedulesService } from 'src/app/services/schedules/schedules.service';
import { CognitoService } from 'src/app/services/cognito.service';


@Component({
  selector: 'app-showschedules',
  templateUrl: './showschedules.component.html',
  styleUrls: ['./showschedules.component.css']
})
export class ShowschedulesComponent implements OnInit {
  selectedDate: string;
  selectedStatus: string;
  schedules: Schedule[];
  filteredSchedules: Schedule[] = [];
  psychologistId: string;
  modalOpen: boolean = false;
  newAppointment: Schedule = {
    date: '',
    time: '',
    psychologist: 0,
    state: 0
  };
  successModalOpen: boolean = false;
  errorModalOpen: boolean = false;

  constructor(
    private schedulesService: SchedulesService,
    private cognitoService: CognitoService
  ) {}

  ngOnInit() {
    this.getPsychologistId();
    this.selectedDate = this.getTodayDate(); // Set today's date as the default selected date
    this.selectedStatus = ""; // Set empty string as the default selected status (show all)
  }

  getPsychologistId() {
    this.cognitoService.getAttributes().subscribe(
      attributes => {
        const psychologistIdAttribute = attributes.find(attr => attr.Name === 'nickname');
        if (psychologistIdAttribute) {
          this.psychologistId = psychologistIdAttribute.Value;
          this.getFilteredSchedules();
        } else {
          console.log('No se encontró el psychologistId en Cognito');
        }
      },
      error => {
        console.log('Error obteniendo atributos de Cognito:', error);
      }
    );
  }

  filterSchedules() {
    this.getFilteredSchedules();
  }

  private getFilteredSchedules() {
    this.schedulesService.getScheduleByPsychologistAndDate(this.psychologistId, this.selectedDate).subscribe(
      (schedules: Schedule[]) => {
        if (schedules) {
          this.schedules = schedules;
          this.filteredSchedules = schedules.filter(schedule =>
            !this.selectedStatus || schedule.state.toString() === this.selectedStatus
          );
        } else {
          this.schedules = [];
          this.filteredSchedules = [];
        }
      },
      error => {
        console.error('Error fetching schedules:', error);
        this.schedules = [];
        this.filteredSchedules = [];
      }
    );
  }

  getStatusColor(status: number): string {
    if (status === 1) {
      return 'text-success';
    } else if (status === 2) {
      return 'text-warning';
    } else if (status === 3) {
      return 'text-danger';
    } else {
      return '';
    }
  }

  getStatusText(status: number): string {
    if (status === 4) {
      return 'Disponible';
    } else if (status === 5) {
      return 'Reservado';
    } else {
      return '';
    }
  }

  private getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = this.addLeadingZero(today.getMonth() + 1);
    const day = this.addLeadingZero(today.getDate());
    return `${year}-${month}-${day}`;
  }

  private addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  createSchedule() {
    const psychologist = this.psychologistId;
    this.newAppointment.psychologist = parseInt(psychologist, 10);
    this.schedulesService.createSchedule(this.newAppointment).subscribe(
      (createdSchedule: Schedule) => {
        console.log('Schedule created:', createdSchedule);
        this.successModalOpen = true;
        this.closeModal();
        this.getFilteredSchedules();
      },
      error => {
        console.error('Error creating schedule:', error);
        this.errorModalOpen = true;
        // Aquí puedes manejar el error y mostrar un mensaje al usuario
      }
    );
  }

  closeSuccessModal() {
    this.successModalOpen = false;
  }

  closeErrorModal() {
    this.errorModalOpen = false;
  }

  deleteSchedule(scheduleId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      this.schedulesService.deleteSchedule(scheduleId).subscribe(
        () => {
          this.getFilteredSchedules(); // Vuelve a obtener los horarios actualizados
        },
        error => {
          console.error('Error deleting schedule:', error);
          // Manejar el error y mostrar un mensaje al usuario si es necesario
        }
      );
    }
  }
}
