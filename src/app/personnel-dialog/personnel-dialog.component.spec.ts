import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelDialogComponent } from './personnel-dialog.component';

describe('PersonnelDialogComponent', () => {
  let component: PersonnelDialogComponent;
  let fixture: ComponentFixture<PersonnelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
