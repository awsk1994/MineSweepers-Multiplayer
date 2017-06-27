import { Component } from '@angular/core';

@Component({
  selector: 'game-instruction',
  templateUrl: './game-instruction.component.html'
})
export class GameInstructionComponent {
  showInstr:boolean = true;
  
  toggleShowInstr(){
    this.showInstr = !this.showInstr;
  }
}
