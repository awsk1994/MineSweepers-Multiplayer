import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagbombComponent } from './flagbomb.component';

describe('FlagbombComponent', () => {
  let component: FlagbombComponent;
  let fixture: ComponentFixture<FlagbombComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagbombComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagbombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
