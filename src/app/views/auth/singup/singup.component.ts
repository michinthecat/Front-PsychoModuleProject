import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Iuser } from '../../../models/iuser';
import { Router } from '@angular/router';
import { PsychologistService } from 'src/app/services/api-consume/psychologist/psychologist.service';
import { Psychologist } from 'src/app/models/psychologist/psychologist.model';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  email: string;
  name: string;
  lastName: string;
  nickName: string; // Lo usaremos como id de Psychologist
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private psychologistService: PsychologistService) {}

  ngOnInit(): void {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, verifica.');
      return;
    }

      var psychologist: Psychologist = {
      id: parseInt(this.nickName),
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      specialty: {
        id: 1,
        specialty: 'Default'
      },
      role: {
        id: 1,
        role: 'Psicólogo'
      },
      services: []
    };

    this.psychologistService.createPsychologist(psychologist).subscribe(
      (createdPsychologist: Psychologist) => {

        console.log('Registro exitoso en la API:', createdPsychologist);

        // Registro en Cognito
        var poolData = {
          UserPoolId: environment.UserPoolId,
          ClientId: environment.ClientId
        };

        var userPool = new CognitoUserPool(poolData);

        var attributeList = [];

        var isuer: Iuser = {
          email: this.email,
          given_name: `${this.name} ${this.lastName}`,
          nickname: this.nickName
        };

        for (let key in isuer) {
          var data = {
            Name: key,
            Value: isuer[key]
          };
          var attribute = new CognitoUserAttribute(data);
          attributeList.push(attribute);
        }

        userPool.signUp(this.email, this.password, attributeList, [], (err, result) => {
          if (err) {

            this.psychologistService.deletePsychologist(createdPsychologist.id).subscribe(
              () => {
                console.log('Registro eliminado en la API debido a un error en Cognito');
              },
              error => {
                console.error('Error al eliminar el registro en la API:', error);
              }
            );

            alert(err.message || JSON.stringify(err));
            return;
          }

          var cognitoUser = result.user;
          console.log(JSON.stringify(cognitoUser));
          alert('Hemos enviado un correo de confirmación a ' + cognitoUser.getUsername());
          this.router.navigate(['/login']);
        });
      },
      error => {
        console.error('Error al registrar en la API:', error);
      }
    );
  }
}
