import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { ModalContent }from './modalContent.model';
import { GameService }from '../game.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
    modalContent:ModalContent;
    display = 'none';

    constructor(private modalService: ModalService, 
                private gameService:GameService,
                private router:Router,
                private route: ActivatedRoute){}

    onClose(){
        this.display = 'none';
    }
    
    ngOnInit(){
        this.modalService.triggerModal.subscribe(
            (modalContent: ModalContent) => {
                this.modalContent = modalContent;
                this.display = 'block';
            }
        );
    }

    submitScore(){
        //todo...
        //this.gameService.submitScore();
    }

    returnToMultiplayer() {
        this.router.navigate(["../"], {relativeTo: this.route});
        window.location.reload();
    }
}
