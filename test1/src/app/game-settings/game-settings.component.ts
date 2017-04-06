import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'game-settings',
  templateUrl: './game-settings.component.html'
})
export class GameSettingsComponent {
  @Input() sizes:number[];
  @Input() selectedSize:number = 2;
  @Output() selectSize = new EventEmitter<number>();

  constructor() {
    
  }

  onChange(size){
    console.log("onChange: " + size);
    this.selectSize.emit(size);
  }


}
