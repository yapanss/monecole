import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivretscolaireComponent } from './livretscolaire.component';

describe('LivretscolaireComponent', () => {
  let component: LivretscolaireComponent;
  let fixture: ComponentFixture<LivretscolaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivretscolaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivretscolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
