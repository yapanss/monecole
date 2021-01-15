import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceDialogComponent } from './ressource-dialog.component';

describe('RessourceDialogComponent', () => {
  let component: RessourceDialogComponent;
  let fixture: ComponentFixture<RessourceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
