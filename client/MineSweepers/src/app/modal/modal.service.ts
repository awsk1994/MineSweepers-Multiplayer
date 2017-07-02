import { Injectable, EventEmitter } from '@angular/core';
import { ModalContent } from './modalContent.model';

@Injectable()
export class ModalService {
    triggerModal = new EventEmitter<ModalContent>();

    handleModal(modalContent: any) {
        const modalData = new ModalContent(modalContent.title, modalContent.message);
        this.triggerModal.emit(modalData);
    }
}