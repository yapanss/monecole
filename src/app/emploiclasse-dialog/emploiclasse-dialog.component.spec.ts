import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiclasseDialogComponent } from './emploiclasse-dialog.component';

describe('EmploiclasseDialogComponent', () => {
  let component: EmploiclasseDialogComponent;
  let fixture: ComponentFixture<EmploiclasseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploiclasseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiclasseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
