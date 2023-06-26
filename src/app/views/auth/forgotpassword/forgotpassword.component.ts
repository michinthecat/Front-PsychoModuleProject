import { Component, ViewChild } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito/cognito.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers: [ModalService]
})
export class ForgotpasswordComponent {
  @ViewChild('emailSentModal') content: any;
  email: string;
  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
  isCodeSent: boolean = false;
  isResetCompleted: boolean = false;
  errorMessage: string;
  modalTitle: string;
  modalBody: string;

  constructor(private cognitoService: CognitoService, private modalService: ModalService) {}

  sendVerificationCode(): void {
    this.errorMessage = null;

    this.cognitoService.recoverPassword(this.email).subscribe(
      () => {
        this.isCodeSent = true;
        this.openModal(
          'Revisar tu email',
          `Se ha enviado un código de seguridad a tu email para que puedas cambiar tu contraseña.`
        );
      },
      error => {
        this.openModal(
          'Error',
          `Ocurrió un error al enviar el correo de verificación: ${error}`
        );
      }
    );
  }

  openModal(title: string, body: string) {
    this.modalTitle = title;
    this.modalBody = body;
    this.modalService.openModal(this.content);
  }

  resetPassword(): void {
    this.errorMessage = null;

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden. Por favor, verifica.';
      return;
    }

    this.cognitoService.confirmNewPassword(this.email, this.verificationCode, this.newPassword).subscribe(
      () => {
        this.isResetCompleted = true;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }
}
