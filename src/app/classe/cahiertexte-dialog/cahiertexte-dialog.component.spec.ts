import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CahiertexteDialogComponent } from './cahiertexte-dialog.component';

describe('CahiertexteDialogComponent', () => {
  let component: CahiertexteDialogComponent;
  let fixture: ComponentFixture<CahiertexteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CahiertexteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CahiertexteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
