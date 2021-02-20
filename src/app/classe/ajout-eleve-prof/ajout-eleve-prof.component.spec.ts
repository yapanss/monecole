import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEleveProfComponent } from './ajout-eleve-prof.component';

describe('AjoutEleveProfComponent', () => {
  let component: AjoutEleveProfComponent;
  let fixture: ComponentFixture<AjoutEleveProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutEleveProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEleveProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
