import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {
  constructor(private modalService: NgbModal) {}

  openModal(content: any): NgbModalRef {
    return this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
}
