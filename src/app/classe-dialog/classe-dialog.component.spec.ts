import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseDialogComponent } from './classe-dialog.component';

describe('ClasseDialogComponent', () => {
  let component: ClasseDialogComponent;
  let fixture: ComponentFixture<ClasseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
