import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-cancelappointment',
  templateUrl: './cancelappointment.component.html',
  styleUrls: ['./cancelappointment.component.css']
})
export class CancelappointmentComponent implements  OnInit {

  @ViewChild('content') content: any;
  appointmentId = '';
  modalTitle = '';
  modalBody = '';

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router) {}


  // Añade una nueva variable de instancia para almacenar el correo electrónico
  userEmail: string;

  // Resto del código de tu componente...

  ngOnInit(): void {
    this.getEmail().then(email => {
      this.userEmail = email;
    }).catch(error => {
      console.error(error);  // Aquí puedes manejar cualquier error que pueda ocurrir
    });
  }

  attributes: CognitoUserAttribute[];
  poolData = {
    UserPoolId: environment.UserPoolId,
    ClientId: environment.ClientId,
  };

  onCancel() {
    const url = `http://localhost:5000/appointment/${this.appointmentId}/cancel`;

    this.http.put(url, {}, {responseType: 'text'}).subscribe(
      res => {
        this.modalTitle = 'Cita Cancelada';
        this.modalBody = `La cita con ID ${this.appointmentId} ha sido cancelada exitosamente.`;
        this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
      },
      err => {
        this.modalTitle = 'Error al Cancelar la Cita';
        this.modalBody = `Hubo un error al intentar cancelar la cita con ID ${this.appointmentId}.  Mensaje de error: ${err.error}`;
        this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
      }
    );
  }

  getEmail(): Promise<string> {
    return new Promise((resolve, reject) => {
      var userPool = new CognitoUserPool(this.poolData);
      var currentUser = userPool.getCurrentUser();

      currentUser.getSession((err: any, session: any) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
          return;
        }

        currentUser.getUserAttributes((err, result) => {
          if (err) {
            reject(err.message || JSON.stringify(err));
            return;
          }

          for (let attribute of result) {
            if (attribute.getName() === 'email') {
              resolve(attribute.getValue());
              return;
            }
          }

          reject("Email attribute not found");
        });
      });
    });
  }



}
