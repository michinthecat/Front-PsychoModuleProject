import { Component } from '@angular/core';

@Component({
  selector: 'app-appointmentform',
  templateUrl: './appointmentform.component.html',
  styleUrls: ['./appointmentform.component.css']
})
export class AppointmentformComponent {
  time = ['2:30', '4:30', '5:30', '6:30'];
  pacientType = ['Estudiante', 'Externo']
  services = ['Consultoría', 'Formación', 'Prevención/Promoción']
  psychologists = ['Edison Casas', 'Laura Paramo']
  academics = ['Ingenieria de Sistemas','Ingenieria Civil']
  semesters= ['Semestre 1', 'Semestre 2']
}
