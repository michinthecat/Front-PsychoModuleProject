import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Iuser } from '../models/iuser';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  email: string;
  givenName: string;
  nickName: string;
  password: string;


  constructor(private router : Router, private modalService: ModalService) {  }

  ngOnInit(): void {

  }

  onRegister(): void{

    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };

    var userPool = new CognitoUserPool(poolData);

    var attributeList = [];

    var isuer : Iuser = {
      email: this.email,
      given_name: this.givenName,
      nickname: this.nickName
    };

    for(let key in isuer)
    {
      var data = {
        Name : key,
        Value : isuer[key]
      };
      var attribute = new CognitoUserAttribute(data);
      attributeList.push(attribute);
    }


    userPool.signUp(this.email, this.password, attributeList, [], (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
      console.log(JSON.stringify(cognitoUser));
      alert('Hemos Enviado un correo de confirmacion a ' + cognitoUser.getUsername());
      this.router.navigate(['/login']);
  }
  );
  }
}
