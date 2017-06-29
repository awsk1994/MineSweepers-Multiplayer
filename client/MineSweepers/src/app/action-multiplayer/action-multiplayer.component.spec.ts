import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMultiplayerComponent } from './action-multiplayer.component';

describe('ActionMultiplayerComponent', () => {
  let component: ActionMultiplayerComponent;
  let fixture: ComponentFixture<ActionMultiplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionMultiplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMultiplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
