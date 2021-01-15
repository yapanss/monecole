import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiClasseComponent } from './emploi-classe.component';

describe('EmploiClasseComponent', () => {
  let component: EmploiClasseComponent;
  let fixture: ComponentFixture<EmploiClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploiClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
