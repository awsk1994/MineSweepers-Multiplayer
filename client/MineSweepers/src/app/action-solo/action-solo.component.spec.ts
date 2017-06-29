import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSoloComponent } from './action-solo.component';

describe('ActionSoloComponent', () => {
  let component: ActionSoloComponent;
  let fixture: ComponentFixture<ActionSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionSoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
