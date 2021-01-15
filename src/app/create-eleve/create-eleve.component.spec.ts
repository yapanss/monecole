import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEleveComponent } from './create-eleve.component';

describe('CreateEleveComponent', () => {
  let component: CreateEleveComponent;
  let fixture: ComponentFixture<CreateEleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
