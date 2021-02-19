import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveDialogComponent } from './eleve-dialog.component';

describe('EleveDialogComponent', () => {
  let component: EleveDialogComponent;
  let fixture: ComponentFixture<EleveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
