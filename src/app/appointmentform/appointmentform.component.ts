import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Service } from '../models/service.model';
import { Program } from '../models/program.model';
import { UserType } from '../models/user-type.model';
import { Psychologist } from '../models/psychologist.model';
import { Semester } from '../models/semester.model';


@Component({
  selector: 'app-appointmentform',
  templateUrl: './appointmentform.component.html',
  styleUrls: ['./appointmentform.component.css']
})
export class AppointmentformComponent implements OnInit{
  time = ['2:30', '4:30', '5:30', '6:30'];
  userType: string[];
  services: string[];
  psychologists: string[];
  academics: string[];
  semesters: string[];

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.getServices().subscribe((servicios: Service[]) => {
      // Extraer solo los nombres de los servicios
      this.services = servicios.map(servicio => servicio.nombre_servicio);
    });

    this.dataService.getPrograms().subscribe((programas: Program[]) =>{
      this.academics = programas.map(programa => programa.programa);
    });

    this.dataService.getPshicologists().subscribe((psicologas: Psychologist[]) =>{
      this.psychologists = psicologas.map(psicologa => (psicologa.nombre + " "+ psicologa.apellido));
    });

    this.dataService.getUserType().subscribe((tipoUsuarios: UserType[]) =>{
      this.userType = tipoUsuarios.map(tipoUsuario => tipoUsuario.tipo_paciente);
    });

    this.dataService.getSemesters().subscribe((semestres: Semester[]) =>{
      this.semesters = semestres.map(semestre => semestre.semestre);
    });
  }

}
