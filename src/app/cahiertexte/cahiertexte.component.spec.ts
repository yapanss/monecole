import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CahiertexteComponent } from './cahiertexte.component';

describe('CahiertexteComponent', () => {
  let component: CahiertexteComponent;
  let fixture: ComponentFixture<CahiertexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CahiertexteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CahiertexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
